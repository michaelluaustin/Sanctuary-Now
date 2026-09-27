'use client';

import { useRouter } from 'next/navigation';
import { topics } from '@/lib/topics';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [language, setLanguage] = useState('en');

  const handleTopicSelect = (topicId: string) => {
    if (topicId) {
      const selectedTopic = topics.find(t => t.id === topicId);
      if (selectedTopic) {
        router.push(`/session?topicId=${selectedTopic.id}&title=${encodeURIComponent(selectedTopic.title)}&lang=${language}`);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-2">
          {language === 'en' ? 'Welcome to Sanctuary Now' : '欢迎来到 Sanctuary Now'}
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          {language === 'en' ? 'Choose a topic below to begin your personal worship session. Find peace, reflection, and connection.' : '选择以下主题开始您的个人敬拜。寻找平安、反思和连接。'}
        </p>
      </header>

      <div className="flex flex-col items-center justify-center space-y-6 pt-6">
        <div className="flex items-center">
          <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-accent-foreground mr-3" />
          <h2 className="text-xl sm:text-2xl font-semibold font-headline text-accent-foreground">
            {language === 'en' ? 'Select a Worship Topic' : '选择一个敬拜主题'}
          </h2>
        </div>
        
        {topics.length > 0 ? (
          <Select onValueChange={handleTopicSelect}>
            <SelectTrigger className="w-full max-w-md text-base py-3 h-auto rounded-lg shadow-sm">
              <SelectValue placeholder={language === 'en' ? "Tap to choose a topic..." : "点击选择一个主题..."} />
            </SelectTrigger>
            <SelectContent className="max-h-[60vh]">
              <SelectGroup>
                <SelectLabel className="px-3 py-2 text-xs text-muted-foreground font-medium">
                  {language === 'en' ? 'Available Topics' : '可用主题'}
                </SelectLabel>
                {topics.map(topic => (
                  <SelectItem 
                    key={topic.id} 
                    value={topic.id} 
                    className="py-2.5 px-3 text-sm cursor-pointer hover:bg-accent/80 focus:bg-accent"
                  > 
                    {language === 'en' ? topic.title : topic.titleZh}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          <p className="text-center text-foreground/70 mt-4">
            {language === 'en' ? 'No topics available at the moment. Please check back later.' : '目前没有可用主题。请稍后再查看。'}
          </p>
        )}
      </div>

      <div className="absolute top-4 right-4">
        <Button onClick={toggleLanguage} variant="outline">
          {language === 'en' ? '中文' : 'English'}
        </Button>
      </div>
    </div>
  );
}
