// src/hooks/useSfx.ts
import { Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";

type SfxOpts = {
  addAsset?: number;    // require("../assets/sounds/tac.mp3")
  removeAsset?: number; // require("../assets/sounds/tss.mp3")
  volume?: number;      // 0..1
};

async function warmUpOnce(snd: Audio.Sound, vol: number) {
  await snd.setVolumeAsync(0);
  try {
    await snd.playFromPositionAsync(0);
    await snd.stopAsync();
  } catch { }
  await snd.setVolumeAsync(vol);
}

async function replayFromStart(snd: Audio.Sound, vol: number) {
  await snd.setVolumeAsync(vol);
  await snd.playFromPositionAsync(0);
}

export default function useSfx({
  addAsset = require("../assets/sounds/tac.mp3"),
  removeAsset = require("../assets/sounds/tss.mp3"),
  volume = 0.9,
}: SfxOpts = {}) {
  const addRef = useRef<Audio.Sound | null>(null);
  const remRef = useRef<Audio.Sound | null>(null);
  const [ready, setReady] = useState(false);

  // para detectar alternancia
  const lastPlayed = useRef<"add" | "rem" | null>(null);
  const primed = useRef<{ add: boolean; rem: boolean }>({ add: false, rem: false });

  useEffect(() => {
    let mounted = true;
    (async () => {
      // Modo audio que permite mezclar/alternar sin perder el siguiente disparo
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        interruptionModeIOS: 1,   // MIX_WITH_OTHERS
        interruptionModeAndroid: 2, // DUCK_OTHERS
      });

      const s1 = new Audio.Sound();
      const s2 = new Audio.Sound();
      await s1.loadAsync(addAsset, { shouldPlay: false, volume }, false);
      await s2.loadAsync(removeAsset, { shouldPlay: false, volume }, false);

      // Warm-up inicial para que el primer toque de cada uno suene
      await warmUpOnce(s1, volume);
      await warmUpOnce(s2, volume);
      primed.current = { add: true, rem: true };

      if (!mounted) {
        await s1.unloadAsync();
        await s2.unloadAsync();
        return;
      }
      addRef.current = s1;
      remRef.current = s2;
      setReady(true);
    })();

    return () => {
      mounted = false;
      addRef.current?.unloadAsync();
      remRef.current?.unloadAsync();
    };
  }, [addAsset, removeAsset, volume]);

  // Warm-switch: si alternás de un sonido al otro y ES la primera vez tras el cambio, lo pre-disparamos silencioso
  const ensurePrimedOnSwitch = useCallback(
    async (kind: "add" | "rem") => {
      const snd = kind === "add" ? addRef.current : remRef.current;
      if (!snd) return;

      const switched = lastPlayed.current && lastPlayed.current !== kind;
      const alreadyPrimed = primed.current[kind];

      if (switched && !alreadyPrimed) {
        await warmUpOnce(snd, volume); // 1 frame en 0 de volumen + stop
        primed.current[kind] = true;
      }
      lastPlayed.current = kind;
    },
    [volume]
  );

  const playAdd = useCallback(async () => {
    if (!ready || !addRef.current) return;
    // Si venís de "rem", primá "add" antes de reproducir por 1ª vez
    await ensurePrimedOnSwitch("add");
    await replayFromStart(addRef.current, volume);
    // marcá el otro como "no primado" para forzar warm-switch la próxima alternancia
    primed.current.rem = false;
  }, [ready, ensurePrimedOnSwitch, volume]);

  const playRemove = useCallback(async () => {
    if (!ready || !remRef.current) return;
    await ensurePrimedOnSwitch("rem");
    await replayFromStart(remRef.current, volume);
    primed.current.add = false;
  }, [ready, ensurePrimedOnSwitch, volume]);

  return { ready, playAdd, playRemove };
}
