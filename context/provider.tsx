'use client';

import React from 'react';
import { ProjectProvider } from '@/context/project-context';
import { ReviewProvider } from '@/context/review-context';
import { SocialProvider } from './social-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider>
      <ReviewProvider>
        <SocialProvider>{children}</SocialProvider>
      </ReviewProvider>
    </ProjectProvider>
  );
}
