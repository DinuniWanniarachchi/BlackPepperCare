import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const colors = {
  primary: '#2D5016', // Dark green
  lightGreen: '#6ec10eff', // Light green for buttons
  background: '#2D5016', // Dark green background
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#E8F5E9',
  darkGray: '#424242', // For placeholders
  cardBackground: '#F5F5F5',
};

// Mock data for recent diagnoses (you can replace this with actual data from storage)
const recentDiagnoses = [
  {
    id: '1',
    diseaseName: 'Fom fed Start NRI)',
    confidence: '80%',
  },
  {
    id: '2',
    diseaseName: 'Prer led Back SOK)',
    confidence: '04%',
  },
  {
    id: '3',
    diseaseName: 'Pella Donsoce',
    confidence: '92%',
  },
];

export default function UploadScreen() {
  const router = useRouter();

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to take photos!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets[0].uri) {
      router.push({
        pathname: '/preview',
        params: { imageUri: result.assets[0].uri },
      });
    }
  };

  const handleChooseFromGallery = async () => {
    // Request gallery permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need gallery permissions to select photos!');
      return;
    }

    // Open the image picker with cropping enabled
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true, // Allow cropping option
      aspect: [4, 3],
    });

    // Ensure we have a valid result
    if (result.canceled) {
      alert('You didn’t select an image!');
      return;
    }

    if (result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;

      // Proceed to the preview screen with the selected image
      router.push({
        pathname: '/preview',
        params: { imageUri: selectedImageUri },
      });
    } else {
      alert('No image selected!');
    }
  };

  const handleSettings = () => {
    // Navigate to settings or show settings modal
    alert('Settings coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/pepper 4.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PEPPER DOCTOR</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Scan Button - Large Circular */}
        <View style={styles.scanButtonContainer}>
          <TouchableOpacity style={styles.scanButton} onPress={handleTakePhoto}>
            <Text style={styles.cameraIcon}>📷</Text>
            <Text style={styles.scanButtonText}>Scan Leaf</Text>
          </TouchableOpacity>
        </View>

        {/* Upload from Gallery Button */}
        <TouchableOpacity
          style={styles.galleryButton}
          onPress={handleChooseFromGallery}
        >
          <Text style={styles.galleryIcon}>📁</Text>
          <Text style={styles.galleryText}>Upload from Gallery</Text>
        </TouchableOpacity>

        {/* Recent Diagnoses Section - Centered */}
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>Recent Diagnoses</Text>
          <View style={styles.diagnosesContainer}>
            {recentDiagnoses.map((diagnosis) => (
              <View key={diagnosis.id} style={styles.diagnosisCard}>
                <Text style={styles.diagnosisName} numberOfLines={1}>
                  {diagnosis.diseaseName}
                </Text>
                <Text style={styles.diagnosisConfidence}>
                  {diagnosis.confidence}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  settingsButton: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 24,
    color: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scanButtonContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  scanButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cameraIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  scanButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  galleryButton: {
    backgroundColor: colors.lightGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  galleryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  galleryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  recentSection: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    paddingLeft: 4,
  },
  diagnosesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  diagnosisCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: 250,
    elevation: 2,
  },
  diagnosisName: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    paddingBottom: 4,
  },
  diagnosisConfidence: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
