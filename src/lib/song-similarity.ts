import OpenAI from 'openai';
import { promises as fs } from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SongEmbedding {
  title: string;
  url: string;
  lyrics: string;
  embedding: number[];
}

let songEmbeddings: SongEmbedding[] = [];

async function loadSongEmbeddings(): Promise<SongEmbedding[]> {
  if (songEmbeddings.length > 0) return songEmbeddings;
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'chinese_worship_embeddings.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    songEmbeddings = JSON.parse(fileContent);
    return songEmbeddings;
  } catch (error) {
    console.error('Error loading song embeddings:', error);
    return [];
  }
}

export async function findSimilarSongs(topic: string, numSongs: number = 3): Promise<SongEmbedding[]> {
  // Load the embeddings if not already loaded
  const songs = await loadSongEmbeddings();
  if (songs.length === 0) {
    console.error('No songs loaded');
    return [];
  }
  
  // Get embedding for the topic
  const topicEmbeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: topic,
  });
  const topicEmbedding = topicEmbeddingResponse.data[0].embedding;
  
  // Calculate cosine similarity for each song
  const similarities = songs.map(song => {
    const similarity = cosineSimilarity(topicEmbedding, song.embedding);
    return { song, similarity };
  });
  
  // Sort by similarity and return top N songs
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, numSongs)
    .map(item => item.song);
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
} 