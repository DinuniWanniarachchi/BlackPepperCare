// app/treatment.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const colors = {
  primary: '#2D5016',
  background: '#F8F9F5',
  white: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#666666',
  success: '#4CAF50',
  lightGray: '#E0E0E0',
};

export default function TreatmentScreen() {
  const router = useRouter();
  const { diseaseName } = useLocalSearchParams<{ diseaseName: string }>();

  const handleSaveResult = () => {
    Alert.alert('Success', 'Result saved successfully!');
  };

  const handleUploadNew = () => {
    router.push('/upload');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Treatment & Management</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Disease-specific Recommendations */}
        {diseaseName === 'Slow wilt' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended Treatment for Slow wilt:</Text>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>To avoid nematodes add 03g of carbofuran into pots.</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>Alternatively add 30g of carbofuran into the planting hole.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preventive Measures:</Text>
              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>Use certified disease-free planting material.</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>Monitor soil health and practice crop rotation.</Text>
              </View>
            </View>
          </>
        )}

        {diseaseName === 'Leaf blight' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended Treatment for Leaf blight:</Text>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>Apply appropriate fungicide such as copper-based products.</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>Repeat applications as per product label.</Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preventive Measures:</Text>
              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>Plant resistant varieties when available.</Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>Maintain good field sanitation and avoid prolonged wetting.</Text>
              </View>
            </View>
          </>
        )}

        {diseaseName === 'Healthy' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plant Status: Healthy</Text>
            <View style={styles.listItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.listText}>Maintain good cultural practices: proper nutrition and watering.</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.listText}>Monitor regularly for early signs of disease.</Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveResult}>
            <Text style={styles.saveIcon}>💾</Text>
            <Text style={styles.saveButtonText}>Save Result</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadNew}>
            <Text style={styles.uploadIcon}>📷</Text>
            <Text style={styles.uploadButtonText}>Upload New Image</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  backText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    color: colors.textPrimary,
    marginRight: 12,
    marginTop: 2,
  },
  checkmark: {
    fontSize: 16,
    color: colors.success,
    marginRight: 12,
    marginTop: 2,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 12,
  },
  saveIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  saveButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  uploadIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});