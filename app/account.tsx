import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.sub}>Account details and profile settings will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  sub: { marginTop: 8, fontSize: 14, color: '#666', textAlign: 'center' },
});
