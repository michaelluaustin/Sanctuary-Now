import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
  message?: string;
}

export default function LoadingIndicator({ message = "Loading..." }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-8 text-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg text-foreground/80 font-medium">{message}</p>
    </div>
  );
}
