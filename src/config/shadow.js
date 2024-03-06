import { Platform } from "react-native";

export default {
  ...Platform.select({
    android: {
      elevation: 5,
    },
    ios: {
      // shadowColor: "red",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
    },
  }),
};