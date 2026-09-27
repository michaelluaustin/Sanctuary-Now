'use client';

import { useFavorites } from '@/hooks/useFavorites';
import SessionDisplay from '@/components/SessionDisplay';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { HeartOff, Trash2, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import LoadingIndicator from '@/components/LoadingIndicator';

export default function FavoritesPage() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();
  const { toast } = useToast();

  const handleRemoveFavorite = (topicId: string, topicTitle: string) => {
    removeFavorite(topicId);
    toast({
      title: "Removed from Favorites",
      description: `"${topicTitle}" session has been removed from your favorites.`,
    });
  };
  
  if (!isLoaded) {
    return <LoadingIndicator message="Loading your favorites..." />;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-10">
        <HeartOff className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold font-headline mb-2">No Favorites Yet</h2>
        <p className="text-muted-foreground">
          You haven&apos;t favorited any worship sessions. Explore topics and save your favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary">Your Favorite Sessions</h1>
        <p className="text-lg text-foreground/80 mt-1">Revisit your saved worship experiences.</p>
      </header>

      <Accordion type="single" collapsible className="w-full">
        {favorites.map((fav, index) => (
          <AccordionItem value={`item-${index}`} key={fav.topicId} className="border border-border rounded-lg mb-4 shadow-sm overflow-hidden bg-card">
            <AccordionTrigger className="px-6 py-4 hover:bg-accent/50 transition-colors w-full text-left">
              <div className="flex justify-between items-center w-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold font-headline text-primary-foreground">{fav.topicTitle}</h3>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <CalendarDays className="w-3 h-3 mr-1.5" />
                    Favorited on: {format(new Date(fav.favoritedAt), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 p-2 rounded-full ml-4" onClick={(e) => e.stopPropagation()}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove from Favorites?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove the session &quot;{fav.topicTitle}&quot; from your favorites?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemoveFavorite(fav.topicId, fav.topicTitle)} className="bg-destructive hover:bg-destructive/90">
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 border-t border-border">
              <div className="p-4 sm:p-6 bg-background">
                 <SessionDisplay topicId={fav.topicId} topicTitle={fav.topicTitle} sessionData={fav.sessionData} language={fav.language ?? 'en'} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
