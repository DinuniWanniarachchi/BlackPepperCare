import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { useAppTheme } from '../app/providers/ThemeProvider';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const insets = useSafeAreaInsets();
  let theme = null;
  try {
    theme = useAppTheme();
  } catch (e) {
    theme = null;
  }

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const activeColor = theme?.effective === 'dark' ? '#a6f0a6' : '#2D5016';
  const inactiveColor = theme?.effective === 'dark' ? '#bbb' : '#666';
  const bg = theme?.effective === 'dark' ? '#0b0b0b' : '#fff';
  const baseHeight = 56;
  const bottomOffset = insets?.bottom ?? 0;
  const totalHeight = baseHeight + bottomOffset;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          height: totalHeight,
          paddingBottom: bottomOffset,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
      ]}
    >
      <TouchableOpacity style={styles.item} onPress={() => router.push('/')}>
        <View style={[styles.rect, { backgroundColor: isActive('/') ? (theme?.effective === 'dark' ? 'rgba(166,240,166,0.12)' : 'rgba(45,80,22,0.08)') : (theme?.effective === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)') }]}>
          <Text style={[styles.icon, { color: isActive('/') ? activeColor : inactiveColor }]}>🏠</Text>
        </View>
        <Text style={[styles.label, { color: isActive('/') ? activeColor : inactiveColor }]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/upload')}>
        <View style={[styles.rect, { backgroundColor: isActive('/upload') ? (theme?.effective === 'dark' ? 'rgba(166,240,166,0.12)' : 'rgba(45,80,22,0.08)') : (theme?.effective === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)') }]}>
          <Text style={[styles.icon, { color: isActive('/upload') ? activeColor : inactiveColor }]}>📤</Text>
        </View>
        <Text style={[styles.label, { color: isActive('/upload') ? activeColor : inactiveColor }]}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/history')}>
        <View style={[styles.rect, { backgroundColor: isActive('/history') ? (theme?.effective === 'dark' ? 'rgba(166,240,166,0.12)' : 'rgba(45,80,22,0.08)') : (theme?.effective === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)') }]}>
          <Text style={[styles.icon, { color: isActive('/history') ? activeColor : inactiveColor }]}>📜</Text>
        </View>
        <Text style={[styles.label, { color: isActive('/history') ? activeColor : inactiveColor }]}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => router.push('/account')}>
        <View style={[styles.rect, { backgroundColor: isActive('/account') ? (theme?.effective === 'dark' ? 'rgba(166,240,166,0.12)' : 'rgba(45,80,22,0.08)') : (theme?.effective === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)') }]}>
          <Text style={[styles.icon, { color: isActive('/account') ? activeColor : inactiveColor }]}>👤</Text>
        </View>
        <Text style={[styles.label, { color: isActive('/account') ? activeColor : inactiveColor }]}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 52,
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: 'row',
    borderTopWidth: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  rect: {
    width: 36,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    transform: [{ translateY: -6 }],
  },
  label: {
    fontSize: 12,
    marginTop: 6,
  },
});
