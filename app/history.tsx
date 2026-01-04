import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHistory, HistoryItem } from './utils/history';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<HistoryItem[] | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getHistory();
      if (!mounted) return;
      setItems(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const inStorage = Array.isArray(items) && items.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: (insets?.bottom ?? 0) + 88 }}>
        <Text style={styles.title}>History</Text>

        {inStorage &&
          items!.map((it) => (
            <View key={it.id} style={styles.card}>
              {it.imageUri ? (
                <Image source={{ uri: it.imageUri }} style={styles.image} resizeMode="cover" />
              ) : (
                <View style={[styles.image, { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }]}>
                  <Text>No Image</Text>
                </View>
              )}
              <View style={styles.cardBody}>
                <Text style={styles.disease}>{it.diseaseName}</Text>
                {it.date && <Text style={{ color: '#666', marginBottom: 6 }}>{new Date(it.date).toLocaleString()}</Text>}
                <Text style={styles.solutionTitle}>{it.severity ? `Severity: ${it.severity}` : 'Result'}</Text>
                <Text style={styles.solution}>{it.note ?? `Confidence: ${it.confidence ?? 'N/A'}`}</Text>
              </View>
            </View>
          ))}

        {/* Always show the three preset entries */}
        <View style={styles.card}>
          <Image source={require('../assets/images/pepper 5.jpg')} style={styles.image} resizeMode="cover" />
          <View style={styles.cardBody}>
            <Text style={styles.disease}>Slow wilt</Text>
            <Text style={styles.solutionTitle}>Solution</Text>
            <Text style={styles.solution}>
              To avoid the nematodes 03g of carbofuran should be added into pots or 30g of carbofuran should be added into the plantinghole.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/pepper 6.jpg')} style={styles.image} resizeMode="cover" />
          <View style={styles.cardBody}>
            <Text style={styles.disease}>Leaf blight</Text>
            <Text style={styles.solutionTitle}>Solution</Text>
            <Text style={styles.solution}>
              To manage black pepper leaf blight (often Phytophthora), focus on prevention with resistant varieties, disease-free cuttings, good sanitation (removing infected parts, tool hygiene), and proper watering (avoiding wet conditions).
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={require('../assets/images/pepper 9.jpg')} style={styles.image} resizeMode="cover" />
          <View style={styles.cardBody}>
            <Text style={styles.disease}>Healthy</Text>
            <Text style={styles.solutionTitle}>Status</Text>
            <Text style={styles.solution}>
              This plant appears healthy — no visible disease detected. Maintain good cultural practices: proper nutrition, regular monitoring, and avoid prolonged wetness.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 3, marginBottom: 16 },
  image: { width: '100%', height: 200 },
  cardBody: { padding: 12 },
  disease: { fontSize: 18, fontWeight: '700', color: '#2D5016', marginBottom: 8 },
  solutionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 6 },
  solution: { fontSize: 14, color: '#333', lineHeight: 20 },
});
