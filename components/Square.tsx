// components/Square.tsx
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const SRC = require("@/assets/images/fosforo.png");

// Tamaños y caja del cuadrado (ajustá a gusto)
const BOX = 80;          // tamaño del contenedor
const MARGIN = 0;        // margen interno
const SIDE = BOX - MARGIN * 2;

// Tamaño que usaremos para cada fósforo “lado”
const MATCH_LONG = SIDE;  // largo visible de cada lado
const MATCH_THICK = 35;   // “grosor” (alto del image) al rotar

export default function Square({ count }: { count: number }) {
    const n = Math.min(Math.max(count, 0), 5);

    return (
        <View style={[styles.box, { width: BOX, height: BOX }]}>
            {/* 1) LADO IZQUIERDO (vertical) */}
            {n >= 1 && (
                <Image
                    source={SRC}
                    style={[
                        styles.match,
                        {
                            width: MATCH_THICK,
                            height: MATCH_LONG,
                            left: MARGIN,
                            top: MARGIN,
                            transform: [{ rotate: "0deg" }],
                        },
                    ]}
                />
            )}

            {/* 2) LADO SUPERIOR (horizontal) */}
            {n >= 2 && (
                <Image
                    source={SRC}
                    style={[
                        styles.match,
                        {
                            width: MATCH_LONG,
                            height: MATCH_THICK + 20,
                            left: MARGIN,
                            top: MARGIN - 15,
                            transform: [{ rotate: "90deg" }],
                        },
                    ]}
                />
            )}

            {/* 3) LADO DERECHO (vertical) */}
            {n >= 3 && (
                <Image
                    source={SRC}
                    style={[
                        styles.match,
                        {
                            width: MATCH_THICK,
                            height: MATCH_LONG,
                            left: MARGIN + SIDE - MATCH_THICK, // pegado a la derecha
                            top: MARGIN,
                            transform: [{ rotate: "180deg" }],
                        },
                    ]}
                />
            )}

            {/* 4) LADO INFERIOR (horizontal) */}
            {n >= 4 && (
                <Image
                    source={SRC}
                    style={[
                        styles.match,
                        {
                            width: MATCH_LONG,
                            height: MATCH_THICK + 20,
                            left: MARGIN,
                            top: MARGIN + SIDE - MATCH_THICK - 6, // pegado abajo
                            transform: [{ rotate: '270deg' }],
                        },
                    ]}
                />
            )}

            {/* 5) DIAGONAL ↘ */}
            {n >= 5 && (
                <Image
                    source={SRC}
                    style={[
                        styles.match,
                        {
                            // un poco más largo para cubrir bien las esquinas
                            width: MATCH_LONG,
                            height: MATCH_THICK +20,
                            // centramos y luego rotamos -45°
                            left: MARGIN + SIDE * 0,
                            top: MARGIN + SIDE * 0.18,
                            transform: [{ rotate: "225deg" }], // si tu imagen apunta al otro lado, usa -45deg
                        },
                    ]}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        position: "relative",
        alignSelf: "center",
    },
    match: {
        position: "absolute",
        resizeMode: "contain",
    },
});
