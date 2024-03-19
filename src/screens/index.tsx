import { Text, View } from "react-native";
import { styles } from "./styles";
import { Header } from "../components/Header";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  )
}