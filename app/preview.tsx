import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet as StyleSheet2,
  SafeAreaView as SafeAreaView2,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter as useRouter2, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

const colors2 = {
  primary: '#2D5016',
  background: '#F8F9F5',
  white: '#FFFFFF',
  textPrimary: '#333333',
  lightGray: '#E0E0E0',
  gray: '#666666',
};

export default function PreviewScreen() {
  const router = useRouter2();
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);

    // Simulate API call for disease detection
    setTimeout(() => {
      setAnalyzing(false);
      // Limit possible results to Slow wilt, Leaf blight, or Healthy
      const choices = [
        { diseaseName: 'Slow wilt', severity: 'Moderate', confidence: '82' },
        { diseaseName: 'Leaf blight', severity: 'Moderate', confidence: '88' },
        { diseaseName: 'Healthy', severity: 'None', confidence: '98' },
      ];
      // For now pick the highest-confidence mock (or choose deterministically/randomly)
      const result = choices[Math.floor(Math.random() * choices.length)];
      router.push({
        pathname: '/result',
        params: {
          imageUri,
          diseaseName: result.diseaseName,
          severity: result.severity,
          confidence: result.confidence,
        },
      });
    }, 2000);
  };

  const handleRetake = () => {
    router.back();
  };

  return (
    <SafeAreaView2 style={styles2.container}>
      {/* Header */}
      <View style={styles2.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles2.backButton}>
          <Text style={styles2.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles2.headerTitle}>Preview Image</Text>
      </View>

      <View style={styles2.content}>
        {/* Image Preview */}
        <View style={styles2.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles2.image} resizeMode="cover" />
        </View>

        {/* Action Buttons */}
        <View style={styles2.buttonContainer}>
          <TouchableOpacity
            style={styles2.retakeButton}
            onPress={handleRetake}
            disabled={analyzing}
          >
            <Text style={styles2.retakeText}>Retake Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles2.analyzeButton, analyzing && styles2.analyzeButtonDisabled]}
            onPress={handleAnalyze}
            disabled={analyzing}
          >
            {analyzing ? (
              <View style={styles2.analyzingContainer}>
                <ActivityIndicator color={colors2.white} size="small" />
                <Text style={styles2.analyzeText}> Analyzing...</Text>
              </View>
            ) : (
              <Text style={styles2.analyzeText}>Analyze Disease</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView2>
  );
}

const styles2 = StyleSheet2.create({
  container: {
    flex: 1,
    backgroundColor: colors2.background,
  },
  header: {
    backgroundColor: colors2.primary,
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
    color: colors2.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: colors2.white,
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: colors2.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    backgroundColor: colors2.white,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors2.lightGray,
    alignItems: 'center',
  },
  retakeText: {
    color: colors2.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  analyzeButton: {
    flex: 1,
    backgroundColor: colors2.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  analyzeButtonDisabled: {
    backgroundColor: colors2.gray,
  },
  analyzingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  analyzeText: {
    color: colors2.white,
    fontSize: 15,
    fontWeight: '600',
  },
});