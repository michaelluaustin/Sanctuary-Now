'use server';
/**
 * @fileOverview Generates a personalized worship session based on a selected topic.
 *
 * - generateWorshipSession - A function that generates the worship session.
 * - GenerateWorshipSessionInput - The input type for the generateWorshipSession function.
 * - GenerateWorshipSessionOutput - The return type for the generateWorshipSession function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { findSimilarSongs } from '@/lib/song-similarity';

const GenerateWorshipSessionInputSchema = z.object({
  topic: z.string().describe('The topic for the worship session.'),
});
export type GenerateWorshipSessionInput = z.infer<typeof GenerateWorshipSessionInputSchema>;

const SongSchema = z.object({
  title: z.string().describe('The title of the worship song.'),
  artist: z.string().describe('The performing artist(s) of the worship song.'),
  youtubeUrl: z.string().optional().describe(
    'A YouTube link for the song. IMPORTANT: Only include this field if you are certain it leads to the correct, playable video for the specified song and artist. If in ANY doubt, or if a reliable link is not immediately known, omit this field or leave it as an empty string.'
  ),
});

const GenerateWorshipSessionOutputSchema = z.object({
  verses: z.array(z.string()).describe('Relevant Bible verses with references.'),
  reflections: z.array(z.string()).describe('Reflections and analysis of each verse.'),
  songs: z.array(SongSchema).describe('Suggested worship songs, each with title, artist, and optional YouTube URL.'),
  conclusion: z.string().describe('A concluding paragraph summarizing the theme.'),
  prayer: z.string().describe('A prayer to close the session.'),
});
export type GenerateWorshipSessionOutput = z.infer<typeof GenerateWorshipSessionOutputSchema>;

export async function generateWorshipSession(
  input: GenerateWorshipSessionInput,
  language: string = 'en'
): Promise<GenerateWorshipSessionOutput> {
  // For Chinese sessions, first find similar songs
  let songs: z.infer<typeof SongSchema>[] = [];
  if (language === 'zh') {
    const similarSongs = await findSimilarSongs(input.topic);
    songs = similarSongs.map(song => ({
      title: song.title.split(' - ')[0], // Remove the artist part from title
      artist: song.title.split(' - ')[1] || 'Unknown Artist',
      youtubeUrl: song.url
    }));
  }

  const { output } = await generateWorshipSessionPrompt(input, { context: { language } });
  
  // For Chinese sessions, replace the AI-generated songs with our similar songs
  if (language === 'zh') {
    return {
      ...output!,
      songs
    };
  }
  
  return output!;
}

const generateWorshipSessionPrompt = ai.definePrompt({
  name: 'generateWorshipSessionPrompt',
  input: {schema: GenerateWorshipSessionInputSchema},
  output: {schema: GenerateWorshipSessionOutputSchema},
  prompt: (input, options) => {
    const language = options.context?.language || 'en';
    console.log('Prompt language:', language);
    console.log('Raw input:', JSON.stringify(input, null, 2));
    if (language === 'zh') {
      return [{
        text: `请用中文回答以下请求: 请根据主题"${input.topic}"生成一个基督教敬拜会话。请包含以下内容：
- 3个相关的圣经经文（请包含经文引用）
- 对每段经文的反思和分析
- 3首推荐的敬拜歌曲。对于每首歌：
    - 提供歌曲标题
    - 提供演唱艺术家
    - 关于'youtubeUrl'：
        - **重要：仅当您确定链接指向特定艺术家演唱的特定歌曲且视频当前可用时，才包含YouTube URL。**
        - **如果您有任何疑问，或者无法自信地提供此类链接，您必须完全省略'youtubeUrl'字段或将其值设置为空字符串。**
        - **不要提供猜测、占位符或通用URL。缺少URL比错误的URL更好。错误的链接会导致用户体验不佳。**
- 总结主题的结束段落
- 结束祷告

请以JSON格式返回您的响应。"songs"字段必须是一个对象数组，每个对象都有"title"（字符串）、"artist"（字符串）和"youtubeUrl"（字符串，可选URL）字段。`
      }];
    }
    return [{
      text: `Generate a Christian worship session on the topic of "${input.topic}". Include:
- 3 relevant Bible verses (with references)
- A reflection and analysis of each verse
- 3 suggested worship songs. For each song:
    - Provide the song title.
    - Provide the performing artist(s).
    - For 'youtubeUrl':
        - **CRITICAL: Only include a YouTube URL if you are ABSOLUTELY CERTAIN it is a direct, working link to the specific song by the specified artist and that the video is currently available.**
        - **If you have ANY doubt, or if you cannot confidently provide such a link, YOU MUST EITHER OMIT the 'youtubeUrl' field entirely OR set its value to an empty string.**
        - **DO NOT provide guessed, placeholder, or generic URLs. A missing URL is far preferable to a broken one. Incorrect links will lead to a poor user experience.**
- A concluding paragraph summarizing the theme
- A prayer to close the session

Format your response in JSON. The "songs" field must be an array of objects, where each object has "title" (string), "artist" (string), and "youtubeUrl" (string, optional URL) fields.`
    }];
  },
});

