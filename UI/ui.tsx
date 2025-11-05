function DropZone({
  label,
  count,
  onLayout,
  onLongMinus,
  goal,
}: {
  label: string;
  count: number;
  goal: number;
  onLayout: (e: any) => void;
  onLongMinus: () => void;
}) {
  const tallies = useMemo(() => {
    // armamos líneas de 5
    const fullGroups = Math.floor(count / 5);
    const rest = count % 5;
    return { fullGroups, rest };
  }, [count]);

  return (
    <View style={s.zone} onLayout={onLayout}>
      <Text style={s.zoneLabel}>{label}</Text>
      <Text style={s.zoneScore}>
        {count} / {goal}
      </Text>

      <View style={s.tallyGrid}>
        {Array.from({ length: tallies.fullGroups }).map((_, i) => (
          <TallyFive key={`g${i}`} />
        ))}
        {tallies.rest > 0 && <TallyPartial n={tallies.rest} />}
      </View>

      <Pressable onLongPress={onLongMinus} style={s.minusHint}>
        <Text style={s.minusText}>Mantener para restar</Text>
      </Pressable>
    </View>
  );
}

function TallyFive() {
  // 4 palitos + diagonal
  return (
    <View style={s.fiveWrap}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={s.stick} />
      ))}
      <View style={s.diag} />
    </View>
  );
}

function TallyPartial({ n }: { n: number }) {
  return (
    <View style={s.fiveWrap}>
      {Array.from({ length: n }).map((_, i) => (
        <View key={i} style={s.stick} />
      ))}
    </View>
  );
}

function FosforoPool({ onDrop }: { onDrop: (x: number, y: number) => boolean }) {
  const [dragging, setDragging] = useState(false);
  const start = useRef({ x: 0, y: 0 });
  const trans = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const wrapRef = useRef<View | null>(null);
  const wrapLayout = useRef<LayoutRectangle | null>(null);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, g) => {
        setDragging(true);
        start.current = { x: g.x0, y: g.y0 };
      },
      onPanResponderMove: Animated.event([null, { dx: trans.x, dy: trans.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, g) => {
        setDragging(false);
        // posición absoluta en pantalla
        const absX = g.moveX;
        const absY = g.moveY;
        const dropped = onDrop(absX, absY);
        Animated.spring(trans, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        if (!dropped) {
          // feedback suave si volvió
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      },
    })
  ).current;

  return (
    <View
      ref={wrapRef}
      onLayout={(e) => (wrapLayout.current = e.nativeEvent.layout)}
      style={s.pool}
    >
      <View style={s.poolRow}>
        {/* “Infinitos” fósforos visuales */}
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={i} style={s.poolStick} />
        ))}
        {/* Draggable real */}
        <Animated.View style={[s.dragWrap, trans.getLayout()]} {...pan.panHandlers}>
          <View style={s.dragStick} />
        </Animated.View>
      </View>
      <Text style={s.poolHelp}>Arrastrá el fósforo flotante</Text>
    </View>
  );
}
