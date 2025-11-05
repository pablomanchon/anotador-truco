import { s } from "@/styles/styles";
import { View } from "react-native";

export function TallyFive() {
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