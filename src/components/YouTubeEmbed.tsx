import { ExternalLink } from 'lucide-react';
import { getYouTubeVideoId } from '@/lib/youtube';

interface SongInfo {
  title: string;
  artist: string;
  youtubeUrl?: string;
}

interface SongDisplayItemProps {
  song: SongInfo;
  language: string;
}

export default function SongDisplayItem({ song, language }: SongDisplayItemProps) {
  const videoId = song.youtubeUrl ? getYouTubeVideoId(song.youtubeUrl) : null;

  return (
    <div className="my-3 p-4 border border-border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-lg text-primary-foreground">{song.title}</h4>
      <p className="text-sm text-muted-foreground mb-2">By: {song.artist}</p>
      {videoId ? (
        <div className="mt-2">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${song.title} by ${song.artist}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground mt-1">
          {language === 'en' ? 'You can search for this song on YouTube or your preferred music platform.' : '您可以在YouTube或您喜欢的音乐平台上搜索这首歌。'}
        </p>
      )}
    </div>
  );
}
