import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAppTheme } from './providers/ThemeProvider';
import { useTranslation, setStoredLang } from './i18n';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { fetchBackendHistory, mapDiseaseName } from './utils/apiService';

const colors = {
  primary: '#2D5016',
  lightGreen: '#53920cff',
  background: '#2D5016',
  white: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#E8F5E9',
  darkGray: '#424242',
  cardBackground: '#F5F5F5',
};

type RecentDiagnosis = {
  id: string;
  diseaseName: string;
  confidence: string;
};

export default function UploadScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, lang, setLang } = useTranslation();

  const theme = (() => {
    try {
      return useAppTheme();
    } catch {
      return null;
    }
  })();

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [recentDiagnoses, setRecentDiagnoses] = useState<RecentDiagnosis[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const loadRecentHistory = async () => {
    try {
      setHistoryLoading(true);

      const data = await fetchBackendHistory();

      const formatted: RecentDiagnosis[] = data
        .slice(-5)
        .reverse()
        .map((item, index) => ({
          id: `${index}-${item.image_filename}`,
          diseaseName: mapDiseaseName(item.prediction),
          confidence: `${item.confidence}%`,
        }));

      setRecentDiagnoses(formatted);
    } catch (error) {
      console.warn('Failed to load backend history:', error);
      setRecentDiagnoses([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadRecentHistory();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadRecentHistory();
    }, [])
  );

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets?.length > 0 && result.assets[0].uri) {
      router.push({
        pathname: '/preview',
        params: { imageUri: result.assets[0].uri },
      });
    }
  };

  const handleChooseFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need gallery permissions to select photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.canceled) {
      return;
    }

    if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      const selectedImageUri = result.assets[0].uri;

      router.push({
        pathname: '/preview',
        params: { imageUri: selectedImageUri },
      });
    } else {
      Alert.alert('No image selected', 'Please select an image and try again.');
    }
  };

  const handleSettings = () => {
    setSettingsVisible(true);
  };

  const setThemeMode = (mode: 'system' | 'light' | 'dark') => {
    try {
      theme?.setMode(mode as any);
    } catch {
      // provider not ready
    }
    setSettingsVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/pepper 4.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PEPPER DOCTOR</Text>
          <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={settingsVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('settings') || 'Settings'}</Text>

              <Text style={[styles.modalTitle, { marginTop: 8 }]}>
                {t('theme') || 'Theme'}
              </Text>

              <TouchableOpacity style={styles.optionRow} onPress={() => setThemeMode('system')}>
                <Text style={styles.optionText}>{t('system') || 'System'}</Text>
                {theme?.mode === 'system' && <Text style={styles.optionSelected}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionRow} onPress={() => setThemeMode('light')}>
                <Text style={styles.optionText}>{t('light') || 'Light'}</Text>
                {theme?.mode === 'light' && <Text style={styles.optionSelected}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionRow} onPress={() => setThemeMode('dark')}>
                <Text style={styles.optionText}>{t('dark') || 'Dark'}</Text>
                {theme?.mode === 'dark' && <Text style={styles.optionSelected}>✓</Text>}
              </TouchableOpacity>

              <Text style={[styles.modalTitle, { marginTop: 8 }]}>
                {t('language') || 'Language'}
              </Text>

              <TouchableOpacity
                style={styles.optionRow}
                onPress={async () => {
                  setLang('en');
                  await setStoredLang('en');
                }}
              >
                <Text style={styles.optionText}>English</Text>
                {lang === 'en' && <Text style={styles.optionSelected}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionRow}
                onPress={async () => {
                  setLang('si');
                  await setStoredLang('si');
                }}
              >
                <Text style={styles.optionText}>සිංහල</Text>
                {lang === 'si' && <Text style={styles.optionSelected}>✓</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSettingsVisible(false)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: (insets?.bottom ?? 0) + 88 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scanButtonContainer}>
            <TouchableOpacity style={styles.scanButton} onPress={handleTakePhoto}>
              <Text style={styles.cameraIcon}>📷</Text>
              <Text style={styles.scanButtonText}>Scan Leaf</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.galleryButton} onPress={handleChooseFromGallery}>
            <Text style={styles.galleryIcon}>📁</Text>
            <Text style={styles.galleryText}>Upload from Gallery</Text>
          </TouchableOpacity>

          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recent Diagnoses</Text>

            <View style={styles.diagnosesContainer}>
              {historyLoading ? (
                <View style={styles.loadingCard}>
                  <ActivityIndicator color={colors.primary} size="small" />
                  <Text style={styles.loadingText}>Loading history...</Text>
                </View>
              ) : recentDiagnoses.length > 0 ? (
                recentDiagnoses.map((diagnosis) => (
                  <View key={diagnosis.id} style={styles.diagnosisCard}>
                    <Text style={styles.diagnosisName} numberOfLines={1}>
                      {diagnosis.diseaseName}
                    </Text>
                    <Text style={styles.diagnosisConfidence}>
                      {diagnosis.confidence}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.diagnosisCard}>
                  <Text style={styles.diagnosisName}>No recent diagnoses</Text>
                  <Text style={styles.diagnosisConfidence}>—</Text>
                </View>
              )}
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
  loadingCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  loadingText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '86%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  optionText: {
    fontSize: 16,
    color: '#222',
  },
  optionSelected: {
    fontSize: 16,
    color: '#2D5016',
    fontWeight: '700',
  },
  closeButton: {
    marginTop: 8,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  closeText: {
    color: '#2D5016',
    fontWeight: '700',
  },
});