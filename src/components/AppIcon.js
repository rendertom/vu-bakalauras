import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const sizes = {
  small: 18,
  regular: 24,
  large: 38,
};

const AppIcon = ({ color, name, size = "regular", style }) => {
  const getSize = () => sizes[size] || sizes.regular;
  return (
    <MaterialCommunityIcons
      color={color}
      name={name}
      size={getSize()}
      style={style}
    />
  );
};

export default AppIcon;
