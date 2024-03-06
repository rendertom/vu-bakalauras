const font = {
  300: 'Roboto-Light',
  400: 'Roboto-Regular',
  500: 'Roboto-Medium',
  700: 'Roboto-Bold',
  900: 'Roboto-Black',
};

const figma = {
  h2: {
    fontFamily: font[700],
    fontSize: 60,
    letterSpacing: -1.5,
  },
  h3: {
    fontFamily: font[300],
    fontSize: 48,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: font[700],
    fontSize: 34,
    letterSpacing: 0.25,
  },
  h5: {
    fontFamily: font[900],
    fontSize: 28,
    letterSpacing: 0,
  },
  h6: {
    fontFamily: font[300],
    fontSize: 20,
    letterSpacing: 0.15,
  },
  body: {
    fontFamily: font[400],
    fontSize: 18,
    letterSpacing: 0.5,
  },
  button: {
    fontFamily: font[500],
    fontSize: 14,
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: font[400],
    fontSize: 14,
    letterSpacing: 0.2,
  },
};

export default {
  bold: { fontFamily: font[700] },
  button: figma.button,
  default: figma.body,
  finalGrade: figma.h2,
  formulaLarge: figma.h3,
  formulaSmall: { ...figma.h5, fontFamily: font[300] },
  keyboard: { ...figma.h6, fontFamily: font[400] },
  sectionTitle: figma.h6,
  subtitle: figma.caption,
  title: figma.h4,
  toggleButtonTitle: figma.h5,
};
