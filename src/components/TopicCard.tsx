import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Topic } from '@/lib/topics';
import { ArrowRight, ListChecks } from 'lucide-react'; // Using ListChecks as a generic topic icon

interface TopicCardProps {
  topic: Topic;
}

export default function TopicCard({ topic }: TopicCardProps) {
  const IconComponent = topic.icon || ListChecks;

  return (
    <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <IconComponent className="w-8 h-8 text-primary" />
          <CardTitle className="text-xl font-headline">{topic.title}</CardTitle>
        </div>
        <CardDescription className="text-foreground/80 min-h-[3em]">{topic.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/session?topicId=${topic.id}&title=${encodeURIComponent(topic.title)}`}>
            Start Session
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
