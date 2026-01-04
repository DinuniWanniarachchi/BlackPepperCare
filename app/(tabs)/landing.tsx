// app/tabs/landing.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

const colors = {
  primary: '#2D5016',
  background: '#F8F9F5',
  white: '#FFFFFF',
  textPrimary: '#333333',
};

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        {/* App Title */}
        <View style={styles.logoContainer}>
          <Text style={styles.appTitle}>Welcome to Black Pepper Care</Text>
        </View>

        {/* Navigate to Upload Page */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/upload')}
        >
          <Text style={styles.startButtonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Description */}
        <Text style={styles.description}>
          Identify black pepper diseases using a photo of the leaf.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 24,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
