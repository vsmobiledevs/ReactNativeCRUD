import {StyleSheet} from "react-native";
import {color} from "react-native-reanimated";
import {colors, HP, WP} from "../../utilities";

const styles = StyleSheet.create({
 main: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  //backgroundColor: colors.p1,
 },
 text: {
  fontSize: 55,
  color: "white",
 },
 imageStyles: {
  // resizeMode: "stretch",
  width: WP("100%"),
  height: HP("100%"),
  zIndex: 100,
  position: "absolute",
 },
});

export default styles;
