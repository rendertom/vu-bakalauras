import React from "react";
import { Text } from "react-native";

import colors from "../config/colors";
import text from "../config/text";

const AppText = ({ children, style, ...otherProps }) => (
  <Text style={[text.default, { color: colors.DARK }, style]} {...otherProps}>
    {children}
  </Text>
);

export default AppText;
