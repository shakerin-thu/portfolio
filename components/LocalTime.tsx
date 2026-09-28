'use client';

import { useEffect, useState } from 'react';

import { profile } from '@/content/profile';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: profile.location.timeZone,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/**
 * Live local time in Beijing.
 *
 * Rendered empty on the server and filled in after mount: the value depends on
 * the moment of render, so committing one during SSR guarantees a hydration
 * mismatch.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      Local time — <span suppressHydrationWarning>{time ?? '—:—'}</span>
    </span>
  );
}
