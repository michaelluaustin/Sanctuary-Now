'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FavoriteSession } from '@/types';
import type { GenerateWorshipSessionOutput } from '@/ai/flows/generate-worship-session';

const FAVORITES_KEY = 'sanctuaryNowFavorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from local storage:", error);
      // Fallback: ensure favorites is an empty array
      setFavorites([]);
    }
    setIsLoaded(true);
  }, []);

  const persistFavorites = useCallback((updatedFavorites: FavoriteSession[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Failed to save favorites to local storage:", error);
    }
  }, []);

  const addFavorite = useCallback((topicId: string, topicTitle: string, sessionData: GenerateWorshipSessionOutput, language: string) => {
    setFavorites(prevFavorites => {
      const newFavorite: FavoriteSession = {
        topicId,
        topicTitle,
        sessionData,
        favoritedAt: new Date().toISOString(),
        language,
      };
      const updatedFavorites = [newFavorite, ...prevFavorites.filter(fav => fav.topicId !== topicId)];
      persistFavorites(updatedFavorites);
      return updatedFavorites;
    });
  }, [persistFavorites]);

  const removeFavorite = useCallback((topicId: string) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.filter(fav => fav.topicId !== topicId);
      persistFavorites(updatedFavorites);
      return updatedFavorites;
    });
  }, [persistFavorites]);

  const isFavorited = useCallback((topicId: string): boolean => {
    return favorites.some(fav => fav.topicId === topicId);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorited, isLoaded };
}
