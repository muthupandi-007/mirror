export type TryOnRequest = {
  apiBaseUrl: string;
  userImageFile: File;
  garmentImageFile?: File;
  garmentUrl?: string;
  extras?: Record<string, string | number | boolean>;
};

export type TryOnResponse = {
  image_url?: string;
  image_base64?: string;
  [key: string]: unknown;
};

export async function postTryOn(payload: TryOnRequest): Promise<TryOnResponse> {
  const { apiBaseUrl, userImageFile, garmentImageFile, garmentUrl, extras } = payload;

  const endpoint = apiBaseUrl.replace(/\/$/, "") + "/try-on";

  const formData = new FormData();
  formData.append("user_image", userImageFile);
  if (garmentImageFile) {
    formData.append("garment_image", garmentImageFile);
  }
  if (garmentUrl) {
    formData.append("garment_url", garmentUrl);
  }
  if (extras) {
    Object.entries(extras).forEach(([key, value]) => {
      formData.append(`extras[${key}]`, String(value));
    });
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = `Request failed (${response.status})`;
    try {
      const text = await response.text();
      errorMessage = text || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  // Try JSON first; if not, attempt to treat as image/blob and convert to data URL
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as TryOnResponse;
  }

  // If backend returns an image directly
  const blob = await response.blob();
  const base64 = await blobToDataURL(blob);
  return { image_base64: base64 };
}

export function dataURLToFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

async function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


