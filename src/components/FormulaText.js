import React from "react";

import AppText from "./AppText";

import colors from "../config/colors";
import text from "../config/text";

const FormulaText = ({ isFinalMode, isPreviewMode, task, userInput }) => {
  const isCorrect = task.isCorrect;
  const sign = task.sign;
  const solve = task.solve;
  const valueA = task.values["A"];
  const valueB = task.values["B"];
  const valueC = task.values["C"];

  const getTextStyle = () => [
    { marginHorizontal: 5 },
    isFinalMode || isPreviewMode ? text.formulaSmall : text.formulaLarge,
  ];

  const getResultStyle = () => [
    ...getTextStyle(),
    text.bold,
    isFinalMode
      ? {
          color: isCorrect ? colors.CORRECT : colors.WRONG,
        }
      : { color: colors.VIOLET },
  ];

  const getFormulaFor = (key, value) =>
    solve === key ? (
      <AppText style={getResultStyle()}>{userInput}</AppText>
    ) : (
      <AppText style={getTextStyle()}>{value}</AppText>
    );

  return (
    <>
      {getFormulaFor("A", valueA)}
      <AppText style={getTextStyle()}>{sign}</AppText>
      {getFormulaFor("B", valueB)}
      <AppText style={getTextStyle()}>=</AppText>
      {getFormulaFor("C", valueC)}
    </>
  );
};

export default FormulaText;
