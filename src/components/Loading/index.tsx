import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import { theme } from "../../assets/theme";

export function HomeLoading() {
  return <View style={styles.container}><ActivityIndicator  size={50} color={theme.colors.brand.blue}/></View>
}