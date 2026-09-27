import type { GenerateWorshipSessionOutput } from '@/ai/flows/generate-worship-session';

export interface FavoriteSession {
  topicId: string;
  topicTitle: string;
  sessionData: GenerateWorshipSessionOutput;
  favoritedAt: string; // ISO date string
  language?: string; // 'en' | 'zh'; absent on favorites saved before this field existed
}
