/**
 * API para generación de imágenes del companion
 * Usa el backend eJoi-BE-Image (DALL-E)
 */

import { IMAGE_API_URL } from '@/app/config/env';
import { getAuthToken } from '@/shared/services/storage/secure';

export interface GenerateImageRequest {
  prompt: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
}

export interface GenerateImageResponse {
  imageUrl: string;
  revisedPrompt?: string;
}

/**
 * Genera una imagen usando el backend eJoi-BE-Image (DALL-E 3)
 */
export const generateCompanionImage = async (
  request: GenerateImageRequest
): Promise<GenerateImageResponse> => {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${IMAGE_API_URL}/image/generate`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      prompt: request.prompt,
      size: request.size ?? '1024x1024',
      quality: request.quality ?? 'standard',
      style: request.style ?? 'vivid',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message || `Image generation failed: ${response.statusText}`
    );
  }

  const data = (await response.json()) as GenerateImageResponse;
  if (!data?.imageUrl) {
    throw new Error('No image URL received from image API');
  }
  return data;
};
