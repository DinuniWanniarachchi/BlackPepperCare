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
  warning: '#FF9800',
};

export default function TreatmentScreen() {
  const router = useRouter();
  const { diseaseName, severity, confidence, advice } = useLocalSearchParams<{
    diseaseName: string;
    severity: string;
    confidence: string;
    advice: string;
  }>();

  const handleSaveResult = () => {
    Alert.alert('Saved', 'Treatment guidance saved successfully.');
  };

  const handleUploadNew = () => {
    router.push('/');
  };

  const showLeafBlight = diseaseName === 'Leaf blight';
  const showSlowWilt = diseaseName === 'Slow wilt';
  const showHealthy = diseaseName === 'Healthy';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Treatment & Management</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{diseaseName || 'Result'}</Text>
          {!!severity && <Text style={styles.summaryText}>Severity: {severity}</Text>}
          {!!confidence && <Text style={styles.summaryText}>Confidence: {confidence}%</Text>}
        </View>

        {showSlowWilt && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended Management for Slow Wilt</Text>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Improve drainage immediately and prevent standing water around the vine basin.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Prune ground runners and lower lateral branches near the collar region to reduce infection spread and improve air movement.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Remove severely affected plant parts and keep the basin clean and weed-free.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Apply Trichoderma-enriched neem cake or organic manure around the basin as a preventive biological support measure.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Protective treatments commonly used in black pepper include Bordeaux mixture, copper oxychloride, or potassium phosphonate, following local agricultural advice and label directions.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preventive Measures</Text>

              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>
                  Use disease-free planting material from healthy gardens.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>
                  Avoid injury to roots during field operations and avoid deep digging in affected gardens.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>
                  Keep runner shoots from trailing on wet soil by tying them back or pruning them.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>
                  Strengthen protection before and during rainy periods when Phytophthora problems become more severe.
                </Text>
              </View>
            </View>
          </>
        )}

        {showLeafBlight && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended Management for Leaf Blight</Text>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Remove heavily infected leaves and destroy plant debris to reduce disease spread.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Improve air circulation by pruning dense growth and reducing prolonged humidity around the canopy.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Avoid prolonged leaf wetness and water stagnation near the plants.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Copper-based fungicides such as Bordeaux mixture or copper oxychloride are commonly recommended in pepper disease management programs.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preventive Measures</Text>

              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>
                  Inspect vines regularly and remove infected leaves early.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>
                  Keep the field clean and avoid dense shade or overcrowded vine growth.
                </Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.listText}>
                  Follow local product labels and agricultural officer guidance before using fungicides.
                </Text>
              </View>
            </View>
          </>
        )}

        {showHealthy && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plant Status: Healthy</Text>

            <View style={styles.listItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.listText}>
                Maintain good drainage, balanced nutrition, and regular watering.
              </Text>
            </View>

            <View style={styles.listItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.listText}>
                Monitor regularly for early symptoms such as leaf lesions, yellowing, and wilting.
              </Text>
            </View>

            <View style={styles.listItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.listText}>
                Keep the field clean and use preventive sanitation and biocontrol practices during rainy periods.
              </Text>
            </View>
          </View>
        )}

        {!showHealthy && !showLeafBlight && !showSlowWilt && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General Guidance</Text>
            <Text style={styles.listText}>
              {advice ||
                'Consult a local agricultural extension officer for field-specific diagnosis and treatment recommendations.'}
            </Text>
          </View>
        )}

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Important Note</Text>
          <Text style={styles.noticeText}>
            Fungicide choice, dose, and timing should follow local agricultural recommendations and the product label.
            Product availability and approvals may vary by location.
          </Text>
        </View>

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
  summaryCard: {
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
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
  noticeCard: {
    backgroundColor: '#FFF7E8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1D59A',
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.warning,
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 21,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 24,
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