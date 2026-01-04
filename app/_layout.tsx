
import { Stack, usePathname, useSegments } from 'expo-router';
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
  const pathname = usePathname() || '/';
  const segments = useSegments();
  const allowed = ['/', '/upload', '/history', '/account'];
  const showFooter =
    allowed.some((p) => pathname === p || pathname.startsWith(p + '/')) && !segments.includes('preview');

  return (
    <AppThemeProvider>
      <SafeAreaProvider>
        <View style={styles.appWrap}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </View>
        {showFooter && <Footer />}
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  appWrap: { flex: 1, paddingBottom: 0 },
});
