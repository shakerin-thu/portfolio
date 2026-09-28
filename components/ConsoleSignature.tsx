'use client';

import { useEffect } from 'react';

import { profile } from '@/content/profile';

/** A note for anyone who opens the developer console. */
export function ConsoleSignature() {
  useEffect(() => {
    console.info(
      `%cHello, curious developer. — ${profile.shortName} / ${profile.chineseName}`,
      'color:#d89b4a',
    );
  }, []);

  return null;
}
