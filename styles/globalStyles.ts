import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const globalStyles = StyleSheet.create({
  // CONTAINERS
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.textDark,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  // PRIMARY BUTTON
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.textDark,
    fontFamily: 'Jost_500Medium',
    fontSize: 16,
  },

  // SECONDARY BUTTON
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.border,
    fontFamily: 'Jost_500Medium',
    fontSize: 16,
  },

  // LINKS
  link: {
    color: Colors.link,
    fontFamily: 'Inter_600SemiBold',
  },

  // HEADERS
  h1: {
    fontSize: 32,
    color: Colors.textPrimary,
    fontFamily: 'Jost_700Bold',
  },
  h2: {
    fontSize: 28,
    color: Colors.textPrimary,
    fontFamily: 'Jost_700Bold',
  },
  h3: {
    fontSize: 24,
    color: Colors.textPrimary,
    fontFamily: 'Jost_700Bold',
  },
  h4: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontFamily: 'Jost_700Bold',
  },

  // TEXT SIZES
  textXs: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  textSm: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  textBase: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  textLg: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },
  textXl: {
    fontSize: 20,
    color: Colors.textSecondary,
    fontFamily: 'Inter_400Regular',
  },

   socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16
  },

   socialButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8
  },

  label: {
    color: '#FFD700',
    alignSelf: 'flex-start',
    marginBottom: 4,
    fontFamily: 'Inter'
  },

   input: {
    backgroundColor: '#1F1F1F',
    color: '#FFFFFF',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333'
  },

});
