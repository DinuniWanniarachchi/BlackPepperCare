// app/result.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { addHistory } from './utils/history';

const colors = {
  primary: '#2D5016',
  background: '#F8F9F5',
  white: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#666666',
  moderateOrange: '#FF9800',
  gray: '#666666',
};

export default function ResultScreen() {
  const router = useRouter();
  const { diseaseName, severity, confidence, imageUri } = useLocalSearchParams<{
    diseaseName: string;
    severity: string;
    confidence: string;
    imageUri: string;
  }>();

  useEffect(() => {
    // Save to history when result is shown
    if (diseaseName) {
      (async () => {
        try {
          await addHistory({
            diseaseName,
            severity,
            confidence,
            imageUri,
            note: `Confidence: ${confidence}`,
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
        return '#4CAF50';
      case 'Moderate':
        return colors.moderateOrange;
      case 'Severe':
        return '#F44336';
      default:
        return colors.gray;
    }
  };

  const handleViewTreatment = () => {
    router.push({
      pathname: '/treatment',
      params: { diseaseName, severity, confidence },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity> 
        <Text style={styles.headerTitle}>Disease Identification Result</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Disease Name */}
        <View style={styles.resultCard}>
          <Text style={styles.label}>Disease:</Text>
          <Text style={styles.diseaseName}>{diseaseName}</Text>
        </View>

        {/* Severity */}
        <View style={styles.resultCard}>
          <Text style={styles.label}>Severity:</Text>
          <View
            style={[
              styles.severityBadge,
              { backgroundColor: getSeverityColor(severity) },
            ]}
          >
            <Text style={styles.severityText}>{severity}</Text>
          </View>
        </View>

        {/* Confidence */}
        <View style={styles.resultCard}>
          <Text style={styles.label}>Confidence:</Text>
          <Text style={styles.confidenceText}>{confidence}%</Text>
        </View>

        {/* View Treatment Button */}
        <TouchableOpacity style={styles.treatmentButton} onPress={handleViewTreatment}>
          <Text style={styles.treatmentButtonText}>View Treatment</Text>
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
  resultCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
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
    fontWeight: '600',
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
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
});