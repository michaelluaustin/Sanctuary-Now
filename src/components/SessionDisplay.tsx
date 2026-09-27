'use client';

import type { GenerateWorshipSessionOutput } from '@/ai/flows/generate-worship-session';
import SongDisplayItem from './YouTubeEmbed'; // Updated import name
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { Heart, BookOpenText, MessageCircle, Music, Sparkles, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface SessionDisplayProps {
  topicId: string;
  topicTitle: string;
  sessionData: GenerateWorshipSessionOutput;
  language: string;
}

export default function SessionDisplay({ topicId, topicTitle, sessionData, language }: SessionDisplayProps) {
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const { toast } = useToast();
  const currentlyFavorited = isFavorited(topicId);

  const handleToggleFavorite = () => {
    if (currentlyFavorited) {
      removeFavorite(topicId);
      toast({ title: "Removed from Favorites", description: `${topicTitle} session removed from your favorites.` });
    } else {
      addFavorite(topicId, topicTitle, sessionData, language);
      toast({ title: "Added to Favorites!", description: `${topicTitle} session added to your favorites.` });
    }
  };

  const SectionCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <Card className="mb-6 shadow-md bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl font-headline text-primary">
          <Icon className="w-6 h-6 mr-3" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="prose prose-sm sm:prose-base max-w-none text-foreground/90">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="text-center py-6 border-b border-border">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary">{topicTitle}</h1>
        <p className="text-foreground/70 mt-2 text-lg">
          {language === 'en' ? 'Your guided worship session' : '您的引导敬拜'}
        </p>
      </header>
      
      <Button
        onClick={handleToggleFavorite}
        variant={currentlyFavorited ? "secondary" : "default"}
        className="w-full sm:w-auto flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        {currentlyFavorited ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Heart className="w-5 h-5" />}
        <span>{currentlyFavorited ? (language === 'en' ? 'Favorited' : '已收藏') : (language === 'en' ? 'Add to Favorites' : '添加到收藏')}</span>
      </Button>

      {sessionData.verses.map((verse, index) => (
        <div key={`verse-${index}`}>
          <SectionCard title={`Scripture ${index + 1}`} icon={BookOpenText}>
            <blockquote className="italic border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-md">
              <p className="mb-1">{verse}</p>
            </blockquote>
            {sessionData.reflections[index] && (
               <>
                <h3 className="font-semibold text-lg flex items-center mt-6 mb-2 text-primary/90">
                    <MessageCircle className="w-5 h-5 mr-2"/> {language === 'en' ? 'Reflection' : '反思'}
                </h3>
                <p>{sessionData.reflections[index]}</p>
               </>
            )}
          </SectionCard>
        </div>
      ))}
      
      <Separator className="my-8" />

      <SectionCard title={language === 'en' ? 'Worship Songs' : '敬拜歌曲'} icon={Music}>
        {sessionData.songs.map((song, index) => (
          <SongDisplayItem key={`song-${index}`} song={song} language={language} />
        ))}
        {sessionData.songs.length === 0 && <p>{language === 'en' ? 'No specific songs suggested for this session.' : '本场次没有推荐歌曲。'}</p>}
      </SectionCard>

      <Separator className="my-8" />

      <SectionCard title={language === 'en' ? 'Concluding Thoughts' : '结束语'} icon={Sparkles}>
        <p>{sessionData.conclusion}</p>
      </SectionCard>

      <SectionCard title={language === 'en' ? 'Closing Prayer' : '结束祷告'} icon={Sparkles}>
        <p className="italic">{sessionData.prayer}</p>
      </SectionCard>
    </div>
  );
}
