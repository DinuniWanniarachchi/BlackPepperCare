// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { View, StyleSheet, SafeAreaView } from 'react-native';
// Footer moved to root layout to avoid duplication across app

export default function TabLayout() {
  return (
    <SafeAreaView style={styles.wrap}>
      <View style={styles.content}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}
        >
          <Tabs.Screen name="index" options={{ title: 'Home' }} />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: 'transparent' },
  content: { flex: 1 },
});