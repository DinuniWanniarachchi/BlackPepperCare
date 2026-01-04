import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');  // Get screen dimensions

const colors = {
  primary: '#4ca412ff',  // Dark green background
  white: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#666666',
  overlayColor: 'rgba(0, 0, 0, 0.4)',  // Darker overlay for better text visibility
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Background color changed to green
  background: {
    flex: 1,
    backgroundColor: colors.primary,  // Green background color
    justifyContent: 'center',  // Center content vertically and horizontally
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoCircle: {
    width: 100,              // Reduced size of the circle for better balance
    height: 100,             
    borderRadius: 50,        
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,            // Added slight shadow to give depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,      // Reduced shadow opacity for a cleaner look
    shadowRadius: 6,
  },
  leafImage: {
    width: 100,             
    height: 100,            
    borderRadius: 50,       
    resizeMode: 'cover',    
  },
  appTitle: {
    fontSize: 22,           // Slightly reduced font size for balance
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 18,
    marginBottom: 24,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 14,
    marginHorizontal: 24,
  },
  card: {
    width: Math.min(width * 0.92, 820),
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingVertical: 36,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.48,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlayColor,
  },
});

export default styles;
