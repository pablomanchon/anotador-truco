import { s } from "@/styles/styles";
import { View } from "react-native";

export function TallyPartial({ n }: { n: number }) {
  return (
    <View style={s.fiveWrap}>
      {Array.from({ length: n }).map((_, i) => (
        <View key={i} style={s.stick} />
      ))}
    </View>
  );
}