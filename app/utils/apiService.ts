export const BASE_URL = 'https://hyperexcitable-samir-conductive.ngrok-free.dev';

const HEADERS = {
  'ngrok-skip-browser-warning': 'true',
};

export interface PredictResult {
  rejected: boolean;
  reject_reason: string | null;
  prediction: string | null;
  confidence: number;
  all_probabilities: Record<string, number>;
  model_name: string;
  description: string | null;
  advice: string | null;
}

export interface BackendHistoryRecord {
  prediction: string;
  confidence: number;
  image_filename: string;
}

interface HealthResponse {
  status: string;
  model_loaded: boolean;
  detector_loaded: boolean;
  model_name: string;
  classes: string[];
  leaf_threshold: string;
}

export const healthCheck = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${BASE_URL}/health`, {
      headers: HEADERS,
    });

    const data: HealthResponse = await res.json();
    return data.status === 'ok' && data.model_loaded === true;
  } catch {
    return false;
  }
};

export const predictDisease = async (imageUri: string): Promise<PredictResult> => {
  const formData = new FormData();

  formData.append('file', {
    uri: imageUri,
    name: 'leaf.jpg',
    type: 'image/jpeg',
  } as any);

  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      ...HEADERS,
      // Do not set Content-Type manually for FormData in React Native
    },
    body: formData,
  });

  if (!res.ok) {
    let errText = 'Unknown server error';
    try {
      errText = await res.text();
    } catch {}
    throw new Error(`Prediction failed (${res.status}): ${errText}`);
  }

  return (await res.json()) as PredictResult;
};

export const fetchBackendHistory = async (): Promise<BackendHistoryRecord[]> => {
  const res = await fetch(`${BASE_URL}/history`, {
    headers: HEADERS,
  });

  if (!res.ok) {
    throw new Error('Failed to fetch history');
  }

  return (await res.json()) as BackendHistoryRecord[];
};

export const deleteBackendHistory = async (): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/history`, {
    method: 'DELETE',
    headers: HEADERS,
  });

  return res.ok;
};

export const mapDiseaseName = (prediction: string | null): string => {
  switch (prediction) {
    case 'Leaf_Blight':
      return 'Leaf blight';
    case 'Slow_Wilt':
      return 'Slow wilt';
    case 'Healthy':
      return 'Healthy';
    default:
      return prediction ?? 'Unknown';
  }
};

export const mapSeverity = (prediction: string | null, confidence: number): string => {
  if (prediction === 'Healthy') return 'None';
  if (confidence >= 90) return 'Severe';
  if (confidence >= 75) return 'Moderate';
  return 'Mild';
};