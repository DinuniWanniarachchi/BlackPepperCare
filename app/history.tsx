// app/history.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, Image,
  ScrollView, TouchableOpacity, Alert, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import {
  fetchBackendHistory,
  deleteBackendHistory,
  mapDiseaseName,
  HistoryRecord,
} from './utils/apiService';

// Also keep local history for items saved from result screen
import { getHistory, HistoryItem, removeHistoryItem } from './utils/history';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

  const [localItems,   setLocalItems]   = useState<HistoryItem[]>([]);
  const [backendItems, setBackendItems] = useState<HistoryRecord[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [error,        setError]        = useState<string | null>(null);

  // ── Load both local and backend history ────────────────────────────────────
  const loadAll = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      // Load local history (from result screen saves)
      const local = await getHistory();
      setLocalItems(local ?? []);
    } catch {
      setLocalItems([]);
    }

    try {
      // Load backend history (from SQLite via API)
      const backend = await fetchBackendHistory(20);
      setBackendItems(backend);
    } catch (e) {
      setError('Could not load server history. Check your connection.');
      setBackendItems([]);
    }

    setLoading(false);
    setRefreshing(false);
  };

  // Reload whenever screen comes into focus
  useFocusEffect(
    useCallback(() => { loadAll(); }, [])
  );

  // ── Delete local item ──────────────────────────────────────────────────────
  const handleDeleteLocal = (id: string) => {
    Alert.alert('Delete entry', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          const ok = await removeHistoryItem(id);
          if (ok) setLocalItems(prev => prev.filter(p => p.id !== id));
        },
      },
    ]);
  };

  // ── Delete backend item ────────────────────────────────────────────────────
  const handleDeleteBackend = (id: string) => {
    Alert.alert('Delete entry', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          const ok = await deleteBackendHistory(id);
          if (ok) setBackendItems(prev => prev.filter(p => p.id !== id));
          else Alert.alert('Error', 'Could not delete. Check your connection.');
        },
      },
    ]);
  };

  const getSeverityColor = (cls: string) => {
    switch (cls) {
      case 'Healthy': return '#4CAF50';
      case 'Leaf_Blight': return '#FF9800';
      case 'Slow_Wilt': return '#F44336';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2D5016" />
          <Text style={{ marginTop: 12, color: '#666' }}>Loading history...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const hasLocalItems   = localItems.length > 0;
  const hasBackendItems = backendItems.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: (insets?.bottom ?? 0) + 88 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadAll(true)} colors={['#2D5016']} />
        }
      >
        <Text style={styles.title}>History</Text>

        {/* ── Error banner ─────────────────────────────────────────────────── */}
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {/* ── Backend history items ─────────────────────────────────────────── */}
        {hasBackendItems && (
          <>
            <Text style={styles.sectionLabel}>📡 From Server</Text>
            {backendItems.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={[styles.colorBar, { backgroundColor: getSeverityColor(item.predicted_class) }]} />
                <View style={styles.cardBodyRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.disease}>{mapDiseaseName(item.predicted_class)}</Text>
                    <Text style={styles.dateText}>
                      {new Date(item.timestamp).toLocaleString()}
                    </Text>
                    <Text style={styles.solutionTitle}>Confidence</Text>
                    <Text style={styles.solution}>{item.confidence}%</Text>
                    {item.advice ? (
                      <>
                        <Text style={[styles.solutionTitle, { marginTop: 6 }]}>Advice</Text>
                        <Text style={styles.solution}>{item.advice}</Text>
                      </>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteBackend(item.id)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {/* ── Local history items (saved from result screen) ─────────────────── */}
        {hasLocalItems && (
          <>
            <Text style={styles.sectionLabel}>📱 Saved Locally</Text>
            {localItems.map((it) => (
              <View key={it.id} style={styles.card}>
                {it.imageUri ? (
                  <Image source={{ uri: it.imageUri }} style={styles.image} resizeMode="cover" />
                ) : (
                  <View style={[styles.image, styles.noImage]}>
                    <Text>No Image</Text>
                  </View>
                )}
                <View style={styles.cardBodyRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.disease}>{it.diseaseName}</Text>
                    {it.date && (
                      <Text style={styles.dateText}>{new Date(it.date).toLocaleString()}</Text>
                    )}
                    <Text style={styles.solutionTitle}>
                      {it.severity ? `Severity: ${it.severity}` : 'Result'}
                    </Text>
                    <Text style={styles.solution}>
                      {it.note ?? `Confidence: ${it.confidence ?? 'N/A'}`}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteLocal(it.id)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}

        {/* ── Empty state ───────────────────────────────────────────────────── */}
        {!hasLocalItems && !hasBackendItems && !error && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No predictions yet.</Text>
            <Text style={styles.emptySubText}>
              Go to the Upload tab and scan a leaf to get started.
            </Text>
          </View>
        )}

        {/* ── Always show preset examples at the bottom ─────────────────────── */}
        <Text style={styles.sectionLabel}>📚 Examples</Text>

        <View style={styles.card}>
          <Image source={require('../assets/images/pepper 5.jpg')} style={styles.image} resizeMode="cover" />
          <View style={styles.cardBody}>
            <Text style={styles.disease}>Slow wilt</Text>
            <Text style={styles.solutionTitle}>Solution</Text>
            <Text style={styles.solution}>
              To avoid the nematodes 03g of carbofuran should be added into pots or 30g of carbofuran should be added into the planting hole.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/pepper 6.jpg')} style={styles.image} resizeMode="cover" />
          <View style={styles.cardBody}>
            <Text style={styles.disease}>Leaf blight</Text>
            <Text style={styles.solutionTitle}>Solution</Text>
            <Text style={styles.solution}>
              To manage black pepper leaf blight (often Phytophthora), focus on prevention with resistant varieties, disease-free cuttings, good sanitation and proper watering.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/pepper 9.jpg')} style={styles.image} resizeMode="cover" />
          <View style={styles.cardBody}>
            <Text style={styles.disease}>Healthy</Text>
            <Text style={styles.solutionTitle}>Status</Text>
            <Text style={styles.solution}>
              This plant appears healthy — no visible disease detected. Maintain good cultural practices.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container    : { flex: 1 },
  centered     : { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title        : { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  sectionLabel : { fontSize: 13, fontWeight: '700', color: '#888', textTransform: 'uppercase',
                   letterSpacing: 1, marginBottom: 10, marginTop: 8 },
  errorBanner  : { backgroundColor: '#fdf2f2', borderRadius: 8, padding: 12, marginBottom: 12 },
  errorText    : { color: '#e74c3c', fontSize: 13 },
  emptyState   : { alignItems: 'center', paddingVertical: 40 },
  emptyText    : { fontSize: 16, color: '#888', marginBottom: 8 },
  emptySubText : { fontSize: 13, color: '#aaa', textAlign: 'center' },
  card         : { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden',
                   elevation: 3, marginBottom: 16 },
  colorBar     : { height: 6, width: '100%' },
  image        : { width: '100%', height: 200 },
  noImage      : { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
  cardBody     : { padding: 12 },
  cardBodyRow  : { padding: 12, flexDirection: 'row', alignItems: 'flex-start' },
  disease      : { fontSize: 18, fontWeight: '700', color: '#2D5016', marginBottom: 4 },
  dateText     : { color: '#666', fontSize: 12, marginBottom: 6 },
  solutionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  solution     : { fontSize: 14, color: '#333', lineHeight: 20 },
  deleteBtn    : { marginLeft: 12, alignSelf: 'flex-start', backgroundColor: '#ffefef',
                   paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  deleteText   : { color: '#b00020', fontWeight: '700' },
});