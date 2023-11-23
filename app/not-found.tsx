'use client'; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function NotFound() {

  return (
    <Alert className="my-8">
      <AlertTriangle />
      <AlertTitle>Not found</AlertTitle>
      <AlertDescription>Post not found</AlertDescription>
    </Alert>
  );
}