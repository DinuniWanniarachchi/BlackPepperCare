import AsyncStorage from '@react-native-async-storage/async-storage';

export type HistoryItem = {
  id: string;
  diseaseName: string;
  severity?: string;
  confidence?: string | number;
  imageUri?: string;
  note?: string;
  date: string;
};

const STORAGE_KEY = '@bp_history';

export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryItem[];
  } catch (e) {
    console.warn('getHistory error', e);
    return [];
  }
}

export async function saveHistory(list: HistoryItem[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('saveHistory error', e);
  }
}

export async function addHistory(item: Omit<HistoryItem, 'id' | 'date'>) {
  try {
    const current = await getHistory();
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...item,
    };
    const next = [newItem, ...current].slice(0, 200); // keep latest 200
    await saveHistory(next);
    return newItem;
  } catch (e) {
    console.warn('addHistory error', e);
    return null;
  }
}

export async function clearHistory() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('clearHistory error', e);
  }
}

export async function removeHistoryItem(id: string) {
  try {
    const current = await getHistory();
    const next = current.filter((i) => i.id !== id);
    await saveHistory(next);
    return true;
  } catch (e) {
    console.warn('removeHistoryItem error', e);
    return false;
  }
}
