'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { generateWorshipSession, type GenerateWorshipSessionOutput } from '@/ai/flows/generate-worship-session';
import LoadingIndicator from '@/components/LoadingIndicator';
import SessionDisplay from '@/components/SessionDisplay';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { topics } from '@/lib/topics';

function SessionPageContent() {
  const searchParams = useSearchParams();
  const topicId = searchParams.get('topicId');
  const topicTitleParam = searchParams.get('title');
  const lang = searchParams.get('lang') || 'en';

  // Find the topic object
  const topicObj = topics.find(t => t.id === topicId);
  const topicTitle = lang === 'zh' && topicObj ? topicObj.titleZh : (topicObj ? topicObj.title : topicTitleParam);

  const [sessionData, setSessionData] = useState<GenerateWorshipSessionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (topicTitle && !sessionData) {  // Only generate if we don't have session data
      setIsLoading(true);
      setError(null);
      generateWorshipSession({ topic: topicTitle }, lang)
        .then(data => {
          setSessionData(data);
        })
        .catch(err => {
          console.error("Error generating session:", err);
          setError(lang === 'en' ? "Failed to generate worship session. Please try again later." : "生成敬拜会话失败。请稍后再试。");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (!topicTitle) {
      setError(lang === 'en' ? "No topic selected. Please go back and choose a topic." : "未选择主题。请返回并选择一个主题。");
      setIsLoading(false);
    }
  }, [topicTitle, lang, sessionData]);  // Add sessionData to dependencies

  if (isLoading) {
    return <LoadingIndicator message={lang === 'en' ? `Generating session for "${topicTitle || 'your topic'}"...` : `正在为"${topicTitle || '您的主题'}"生成会话...`} />;
  }

  if (error || !topicId || !topicTitle) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{lang === 'en' ? 'Error' : '错误'}</AlertTitle>
          <AlertDescription>{error || (lang === 'en' ? "Invalid topic." : "无效的主题。")}</AlertDescription>
        </Alert>
        <Button asChild variant="link" className="mt-4">
          <Link href="/">{lang === 'en' ? 'Return to Topics' : '返回主题'}</Link>
        </Button>
      </div>
    );
  }

  if (!sessionData) {
     return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{lang === 'en' ? 'No Session Data' : '无会话数据'}</AlertTitle>
          <AlertDescription>{lang === 'en' ? 'Could not retrieve session data for the selected topic.' : '无法获取所选主题的会话数据。'}</AlertDescription>
        </Alert>
         <Button asChild variant="link" className="mt-4">
          <Link href="/">{lang === 'en' ? 'Return to Topics' : '返回主题'}</Link>
        </Button>
      </div>
    );
  }

  return <SessionDisplay topicId={topicId} topicTitle={topicTitle} sessionData={sessionData} language={lang} />;
}

export default function SessionPage() {
  return (
    <Suspense fallback={<LoadingIndicator message="Loading session..." />}>
      <SessionPageContent />
    </Suspense>
  );
}
