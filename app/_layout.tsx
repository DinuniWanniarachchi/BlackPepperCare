
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

import { AppThemeProvider } from './providers/ThemeProvider';
import Footer from '../components/footer';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <SafeAreaProvider>
        <View style={styles.appWrap}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </View>
        <Footer />
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  appWrap: { flex: 1, paddingBottom: 0 },
});
