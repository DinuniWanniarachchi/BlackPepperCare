// app/tabs/styles.ts

import { StyleSheet } from 'react-native';

const colors = {
  primary: '#2D5016',
  background: '#F8F9F5',
  white: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#666666',
  overlayColor: 'rgba(0, 0, 0, 0.5)',  // Dark overlay color to ensure visibility of content
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',      // Center the content horizontally
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,              // Circle size
    height: 120,             // Circle size
    borderRadius: 60,        // Make it a perfect circle
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leafImage: {
    width: 120,              // Match the size of the circle
    height: 120,             // Match the size of the circle
    borderRadius: 60,        // Make the image itself circular
    resizeMode: 'cover',     // Ensure the image fills the circle without stretching
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 24,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  // Full-screen background image style
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',  // Center content vertically and horizontally
    alignItems: 'center',
  },
  // Optional: Apply styles to the background image (e.g., resize or cover)
  backgroundImageStyle: {
    opacity: 1,  // Make sure the image is fully visible
    resizeMode: 'cover',  // This ensures the image fills the screen
  },
  // Optional: Add an overlay to darken the background image slightly
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayColor,  // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
