// app/preview.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { predictDisease, mapDiseaseName, mapSeverity } from './utils/apiService';

const colors = {
  primary        : '#2D5016',
  background     : '#F8F9F5',
  white          : '#FFFFFF',
  textPrimary    : '#333333',
  lightGray      : '#E0E0E0',
  gray           : '#666666',
};

export default function PreviewScreen() {
  const router                    = useRouter();
  const { imageUri }              = useLocalSearchParams<{ imageUri: string }>();
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!imageUri) return;
    setAnalyzing(true);

    try {
      // ── Call real backend ─────────────────────────────────────────────────
      const result = await predictDisease(imageUri);

      // ── Image rejected (not a pepper leaf) ───────────────────────────────
      if (result.rejected) {
        Alert.alert(
          '❌ Not a Black Pepper Leaf',
          result.reject_reason ?? 'Please upload a clear image of a black pepper leaf.',
          [{ text: 'OK', onPress: () => router.back() }]
        );
        return;
      }

      // ── Accepted — navigate to result screen ──────────────────────────────
      router.push({
        pathname: '/result',
        params  : {
          imageUri,
          diseaseName: mapDiseaseName(result.predicted_class),
          severity   : mapSeverity(result.predicted_class, result.confidence),
          confidence : result.confidence.toString(),
          description: result.description ?? '',
          advice     : result.advice ?? '',
          recordId   : result.id,
        },
      });

    } catch (error: any) {
      Alert.alert(
        '⚠️ Connection Error',
        'Could not connect to the server.\n\nMake sure:\n• Colab is running\n• ngrok is active\n• BASE_URL is updated in apiService.ts',
        [{ text: 'OK' }]
      );
      console.error('Predict error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleRetake = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview Image</Text>
      </View>

      <View style={styles.content}>
        {/* Image Preview */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={handleRetake}
            disabled={analyzing}
          >
            <Text style={styles.retakeText}>Retake Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.analyzeButton, analyzing && styles.analyzeButtonDisabled]}
            onPress={handleAnalyze}
            disabled={analyzing}
          >
            {analyzing ? (
              <View style={styles.analyzingContainer}>
                <ActivityIndicator color={colors.white} size="small" />
                <Text style={styles.analyzeText}>  Analyzing...</Text>
              </View>
            ) : (
              <Text style={styles.analyzeText}>Analyze Disease</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor        : colors.primary,
    height                 : 60,
    flexDirection          : 'row',
    alignItems             : 'center',
    paddingHorizontal      : 16,
    elevation              : 4,
    shadowColor            : '#000',
    shadowOffset           : { width: 0, height: 2 },
    shadowOpacity          : 0.2,
    shadowRadius           : 4,
  },
  backButton : { marginRight: 16, padding: 4 },
  backText   : { color: colors.white, fontSize: 24, fontWeight: 'bold' },
  headerTitle: { color: colors.white, fontSize: 18, fontWeight: '600' },
  content    : { flex: 1, padding: 24 },
  imageContainer: {
    flex             : 1,
    backgroundColor  : colors.white,
    borderRadius     : 12,
    overflow         : 'hidden',
    marginBottom     : 24,
    elevation        : 3,
    shadowColor      : '#000',
    shadowOffset     : { width: 0, height: 2 },
    shadowOpacity    : 0.2,
    shadowRadius     : 4,
  },
  image     : { width: '100%', height: '100%' },
  buttonContainer: { flexDirection: 'row', gap: 12 },
  retakeButton: {
    flex           : 1,
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius   : 8,
    borderWidth    : 1,
    borderColor    : colors.lightGray,
    alignItems     : 'center',
  },
  retakeText: { color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  analyzeButton: {
    flex            : 1,
    backgroundColor : colors.primary,
    paddingVertical : 16,
    borderRadius    : 8,
    alignItems      : 'center',
    justifyContent  : 'center',
    elevation       : 3,
    shadowColor     : '#000',
    shadowOffset    : { width: 0, height: 2 },
    shadowOpacity   : 0.2,
    shadowRadius    : 4,
  },
  analyzeButtonDisabled: { backgroundColor: colors.gray },
  analyzingContainer   : { flexDirection: 'row', alignItems: 'center' },
  analyzeText          : { color: colors.white, fontSize: 15, fontWeight: '600' },
});

