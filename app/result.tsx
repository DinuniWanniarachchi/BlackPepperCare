import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { addHistory } from './utils/history';

const colors = {
  primary: '#2D5016',
  background: '#F8F9F5',
  white: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#666666',
  moderateOrange: '#FF9800',
  gray: '#666666',
  green: '#2E7D32',
  red: '#F44336',
  mildGreen: '#4CAF50',
};

export default function ResultScreen() {
  const router = useRouter();

  const {
    diseaseName,
    severity,
    confidence,
    imageUri,
    description,
    advice,
  } = useLocalSearchParams<{
    diseaseName: string;
    severity: string;
    confidence: string;
    imageUri: string;
    description: string;
    advice: string;
  }>();

  useEffect(() => {
    if (diseaseName) {
      (async () => {
        try {
          await addHistory({
            diseaseName,
            severity,
            confidence,
            imageUri,
            note: `Confidence: ${confidence}%`,
          });
        } catch (e) {
          console.warn('Failed to save history', e);
        }
      })();
    }
  }, [diseaseName, severity, confidence, imageUri]);

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'Mild':
        return colors.mildGreen;
      case 'Moderate':
        return colors.moderateOrange;
      case 'Severe':
        return colors.red;
      case 'None':
        return colors.green;
      default:
        return colors.gray;
    }
  };

  const handleViewTreatment = () => {
    router.push({
      pathname: '/treatment',
      params: {
        diseaseName,
        severity,
        confidence,
        advice,
      },
    });
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoHome} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Disease Identification Result</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : null}

        <View style={styles.resultCard}>
          <Text style={styles.label}>Disease:</Text>
          <Text style={styles.diseaseName}>{diseaseName || 'Unknown'}</Text>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.label}>Severity:</Text>
          <View
            style={[
              styles.severityBadge,
              { backgroundColor: getSeverityColor(severity || '') },
            ]}
          >
            <Text style={styles.severityText}>{severity || 'Unknown'}</Text>
          </View>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.label}>Confidence:</Text>
          <Text style={styles.confidenceText}>
            {confidence ? `${confidence}%` : 'N/A'}
          </Text>
        </View>

        {!!description && (
          <View style={styles.resultCard}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.bodyText}>{description}</Text>
          </View>
        )}

        {!!advice && (
          <View style={styles.resultCard}>
            <Text style={styles.label}>Advice:</Text>
            <Text style={styles.bodyText}>{advice}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.treatmentButton} onPress={handleViewTreatment}>
          <Text style={styles.treatmentButtonText}>View Treatment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
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
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#ddd',
  },
  resultCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  diseaseName: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  severityText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  confidenceText: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  treatmentButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  treatmentButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DADADA',
  },
  homeButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});