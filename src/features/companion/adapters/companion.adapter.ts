import { Companion, CreateCompanionRequest, UpdateCompanionRequest } from '../types';
import { Gender, VisualStyle } from '@/features/onboarding/types';

type RawCompanionResponse =
  | Companion
  | { data?: Companion | null; companion?: Companion | null }
  | null
  | undefined;

const trimOptional = (value?: string): string | undefined => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const normalizeStringArray = (values?: string[] | string | null): string[] => {
  if (!values) return [];
  // Backend occasionally serializes arrays as JSON strings
  if (typeof values === 'string') {
    try {
      const parsed = JSON.parse(values);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      // Not valid JSON — treat as a single comma-separated value
      return values.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  if (!Array.isArray(values)) return [];
  const sanitized = values.map((item) => String(item).trim()).filter(Boolean);
  return sanitized;
};

const normalizeVisualStyle = (value?: string): VisualStyle => (value === 'anime' ? 'anime' : 'realista');

const normalizeGender = (value?: string): Gender => {
  if (value === 'masculino' || value === 'neutro') {
    return value;
  }
  return 'femenino';
};

const extractCompanion = (raw: RawCompanionResponse): Companion | null => {
  if (!raw) {
    return null;
  }
  if ('data' in raw || 'companion' in raw) {
    return raw.data ?? raw.companion ?? null;
  }
  return raw;
};

export const toUpsertCompanionDto = (
  payload: CreateCompanionRequest | UpdateCompanionRequest
): CreateCompanionRequest | UpdateCompanionRequest => {
  const normalized: UpdateCompanionRequest = {
    visualStyle: trimOptional(payload.visualStyle),
    gender: trimOptional(payload.gender),
    persona: trimOptional(payload.persona),
    tone: trimOptional(payload.tone),
    interactionStyle: trimOptional(payload.interactionStyle),
    conversationDepth: trimOptional(payload.conversationDepth),
    interests: normalizeStringArray(payload.interests),
    boundaries: normalizeStringArray(payload.boundaries),
    avatarUrl: trimOptional(payload.avatarUrl),
    dob: trimOptional(payload.dob),
    extra: payload.extra,
  };

  if (typeof payload.name === 'string') {
    normalized.name = payload.name.trim().slice(0, 80);
  }

  return normalized;
};

export const fromCompanionApiResponse = (raw: RawCompanionResponse): Companion | null => {
  const companion = extractCompanion(raw);
  if (!companion || !companion.id) {
    return null;
  }

  // Backend can return avatarUrl (camelCase) or avatar_url (snake_case).
  const companionRaw = companion as unknown as { avatar_url?: string };
  const avatarUrl = trimOptional(companion.avatarUrl) ?? trimOptional(companionRaw.avatar_url);

  return {
    ...companion,
    name: companion.name ?? '',
    visualStyle: normalizeVisualStyle(companion.visualStyle),
    gender: normalizeGender(companion.gender),
    persona: companion.persona ?? '',
    tone: companion.tone ?? '',
    interactionStyle: companion.interactionStyle ?? '',
    conversationDepth: companion.conversationDepth ?? '',
    interests: normalizeStringArray(companion.interests as string[] | string | null),
    boundaries: normalizeStringArray(companion.boundaries as string[] | string | null),
    avatarUrl,
  };
};
