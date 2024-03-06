import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';
import FormulaText from './FormulaText';

import colors from '../config/colors';
import icons from '../config/icons';
import text from '../config/text';

const AnswerItem = ({ index, onPress, isEditMode, task }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.GRAY_LIGHT}>
      <View style={styles.resultContainer}>
        <View style={styles.digits}>
          <AppText style={text.subtitle}>{index + 1 + '.'}</AppText>

          {!isEditMode && (
            <AppIcon
              color={task.isCorrect ? colors.CORRECT : colors.WRONG}
              name={task.isCorrect ? icons.correct : icons.incorrect}
              style={styles.icon}
              size="small"
            />
          )}

          <FormulaText
            isFinalMode={!isEditMode}
            isPreviewMode={isEditMode}
            task={task}
            userInput={task.userInput}
          />
        </View>

        {isEditMode && <AppIcon color={colors.GRAY} name={icons.arrowRight} />}

        {!isEditMode && !task.isCorrect && (
          <AppText
            style={[text.formulaSmall, text.bold, { color: colors.CORRECT }]}>
            {task.correctAnswer}
          </AppText>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 5,
  },
  digits: {
    alignItems: 'baseline',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  rowFlex: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default AnswerItem;
