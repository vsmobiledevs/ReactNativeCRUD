import {StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#fff",
 },
 mapStyle: {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height / 2.4,
 },
});

export default styles;
