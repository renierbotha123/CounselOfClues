import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const utl = StyleSheet.create({
  // FLEX
  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  flexCol: { flexDirection: 'column' },
  flexWrap: { flexWrap: 'wrap' },
  itemsCenter: { alignItems: 'center' },
  itemsStart: { alignItems: 'flex-start' },
  itemsEnd: { alignItems: 'flex-end' },
  justifyCenter: { justifyContent: 'center' },
  justifyStart: { justifyContent: 'flex-start' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },

  // BACKGROUNDS
  bgPrimary: { backgroundColor: Colors.primary },
  bgDark: { backgroundColor: Colors.background },
  bgSurface: { backgroundColor: Colors.surface },
  bgTransparent: { backgroundColor: 'transparent' },
  bgWhite: { backgroundColor: '#FFFFFF' },

  
  // TEXT COLORS
  textPrimary: { color: Colors.textPrimary },
  textSecondary: { color: Colors.textSecondary },
  textDark: { color: Colors.textDark },
  textLight: { color: Colors.textLight },
  textGold: { color: Colors.primary },
  textError: { color: Colors.error },

  // FONT FAMILY
  fontJost: { fontFamily: 'Jost_400Regular' },
  fontJostMedium: { fontFamily: 'Jost_500Medium' },
  fontJostSemiBold: {fontFamily: 'Jost_600SemiBold'},
  fontJostBold: { fontFamily: 'Jost_700Bold' },
  fontInter: { fontFamily: 'Inter_400Regular' },
  fontInterMedium: { fontFamily: 'Inter_500Medium' },
  fontInterSemiBold: { fontFamily: 'Inter_600SemiBold' },
  fontInterBold: { fontFamily: 'Inter_700Bold' },

  // TEXT ALIGN
  textCenter: { textAlign: 'center' },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },

  // TEXT SIZES
  textXs: { fontSize: 12 },
  textSm: { fontSize: 14 },
  textBase: { fontSize: 16 },
  textLg: { fontSize: 18 },
  textXl: { fontSize: 20 },
  text2xl: { fontSize: 24 },
  text3xl: { fontSize: 28 },
  text4xl: { fontSize: 32 },

  // PADDING
  p4: { padding: 4 },
  p8: { padding: 8 },
  p12: { padding: 12 },
  p16: { padding: 16 },
  p24: { padding: 24 },
  p32: { padding:32 },
  px8: { paddingHorizontal: 8 },
  px12: { paddingHorizontal: 12 },
  px16: { paddingHorizontal: 16 },
  px20: { paddingHorizontal:20},
  px24: { paddingHorizontal:24 },
  py8: { paddingVertical: 8 },
  py12: { paddingVertical: 12 },
  py16: { paddingVertical: 16 },
  py20: { paddingVertical:20},
  py24: { paddingVertical:24 },
  py28: { paddingVertical:28 },
  py32: { paddingVertical:32 },
  py64: { paddingVertical:64 },

  // Padding-Top
  pt4: { paddingTop: 4 },
  pt8: { paddingTop: 8},
  pt12: { paddingTop: 12 },
  pt16: { paddingTop: 16 },
  pt20: { paddingTop: 20 },
  pt24: { paddingTop: 24 },
  pt28: { paddingTop: 28 },
  pt32: { paddingTop: 32 },
  pt36: { paddingTop: 36 },

// MARGIN-RIGHT  
  mr8: {marginRight: 8},
  mr12: {marginRight: 12},

  // MARGIN-TOP  
  mt4: {marginTop: 4},
  mt8: {marginTop: 8},
  mt12: {marginTop: 12},
  mt16: {marginTop: 16},
  mt20: {marginTop: 20},
  mt24: {marginTop: 24},
  mt28: {marginTop: 28},
  mt32: {marginTop: 32},
  mt36: {marginTop: 36},
  
  // MARGIN-LEFT  
  ml4: {marginLeft: 4},
  ml8: {marginLeft: 8},
  ml12: {marginLeft: 12},
  ml16: {marginLeft: 16},

  // MARGIN-BOTTOM
  mb4: {marginBottom: 4},
  mb8: {marginBottom: 8},
  mb12: {marginBottom: 12},
  mb16: {marginBottom: 16},
  mb20: {marginBottom: 20},
  mb24: {marginBottom: 24},


  // MARGIN
  m4: { margin: 4 },
  m8: { margin: 8 },
  m12: { margin: 12 },
  m16: { margin: 16 },
  m24: { margin: 24 },
  mx8: { marginHorizontal: 8 },
  mx12: { marginHorizontal: 12 },
  mx16: { marginHorizontal: 16 },
  my8: { marginVertical: 8 },
  my12: { marginVertical: 12 },
  my16: { marginVertical: 16 },

  // BORDER
  border1: { borderWidth: 1, borderColor: Colors.border },
  border2: { borderWidth: 2, borderColor: Colors.border },
  borderPrimary: { borderColor: Colors.primary },
  roundedSm: { borderRadius: 4 },
  roundedMd: { borderRadius: 8 },
  roundedLg: { borderRadius: 12 },
  roundedFull: { borderRadius: 999 },

  // WIDTH/HEIGHT
  wFull: { width: '100%' },
  hFull: { height: '100%' },

  // SHADOW (basic)
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,

   
  },
});
