'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Surface the digest so a production failure can be traced in the logs.
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="inner status-page">
      <p className="inner-kicker">Error</p>
      <h1>
        Something
        <br />
        broke.
      </h1>
      <p className="inner-intro">
        An unexpected error interrupted this page. Trying again usually resolves it.
      </p>
      <p>
        <button className="text-link" type="button" onClick={reset}>
          Try again
        </button>
      </p>
      {error.digest ? <p className="status-digest">Reference: {error.digest}</p> : null}
    </main>
  );
}
