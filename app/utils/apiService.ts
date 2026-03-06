// app/utils/apiService.ts
// ✅ Update BASE_URL every time you restart Colab (paste ngrok URL here)

export const BASE_URL = 'https://tanika-achlamydeous-ruffianly.ngrok-free.dev';

const HEADERS = {
  'ngrok-skip-browser-warning': 'true',
};

// ── Types ─────────────────────────────────────────────────────────────────────
export interface PredictResult {
  rejected         : boolean;
  reject_reason    : string | null;
  prediction       : string | null;   // backend returns "prediction" not "predicted_class"
  confidence       : number;
  all_probabilities: Record<string, number>;  // backend returns "all_probabilities"
  model_name       : string;
  description      : string | null;
  advice           : string | null;
}

export interface HistoryRecord {
  id             : string;
  model_name     : string;
  image_path     : string;
  predicted_class: string;
  confidence     : number;
  probabilities  : Record<string, number>;
  description    : string;
  advice         : string;
  timestamp      : string;
}

// ── Health Check ──────────────────────────────────────────────────────────────
export const healthCheck = async (): Promise<boolean> => {
  try {
    const res  = await fetch(`${BASE_URL}/health`, { headers: HEADERS });
    const data = await res.json();
    // backend returns "model_loaded": true (not "models_loaded")
    return data.status === 'ok' && data.model_loaded === true;
  } catch {
    return false;
  }
};

// ── Predict Disease ───────────────────────────────────────────────────────────
export const predictDisease = async (imageUri: string): Promise<PredictResult> => {
  const formData = new FormData();
  formData.append('file', {
    uri : imageUri,
    name: 'leaf.jpg',
    type: 'image/jpeg',
  } as any);

  const res = await fetch(
    `${BASE_URL}/predict`,   // ✅ no query params needed
    {
      method : 'POST',
      headers: {
        ...HEADERS,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Prediction failed (${res.status}): ${err}`);
  }

  return res.json();
};

// ── Get History from Backend ──────────────────────────────────────────────────
export const fetchBackendHistory = async (limit = 20): Promise<HistoryRecord[]> => {
  const res = await fetch(`${BASE_URL}/history`, { headers: HEADERS });
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
};

// ── Delete All History ────────────────────────────────────────────────────────
// Note: simple backend only supports DELETE /history (clears all)
export const deleteBackendHistory = async (): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/history`, {
    method : 'DELETE',
    headers: HEADERS,
  });
  return res.ok;
};

// ── Map backend prediction → frontend diseaseName ────────────────────────────
// Backend returns lowercase: "healthy" | "leaf_blight" | "slow_wilt"
export const mapDiseaseName = (prediction: string | null): string => {
  switch (prediction) {
    case 'leaf_blight': return 'Leaf blight';
    case 'slow_wilt'  : return 'Slow wilt';
    case 'healthy'    : return 'Healthy';
    default           : return prediction ?? 'Unknown';
  }
};

// ── Map confidence + class → severity string ─────────────────────────────────
export const mapSeverity = (prediction: string | null, confidence: number): string => {
  if (prediction === 'healthy') return 'None';
  if (confidence >= 90) return 'Severe';
  if (confidence >= 75) return 'Moderate';
  return 'Mild';
};