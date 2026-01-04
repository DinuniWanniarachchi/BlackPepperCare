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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,  // Reduced padding for better mobile experience
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
    backgroundColor: colors.white,
    paddingVertical: 14,     // Adjusted padding for a more balanced button size
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 24,
  },
  startButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,           // Reduced font size for better readability
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 12,          // Added space above the description
    marginHorizontal: 24,   // Added margin for better horizontal padding
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayColor,  // Darker overlay for text visibility
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
