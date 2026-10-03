'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { profile } from '@/content/profile';
import { appearances } from '@/content/speaking';
import { ventures } from '@/content/ventures';
import { getLenisInstance } from '@/lib/lenis-instance';

// Ventures and Speaking each appear only once they have something to show, so
// the menu never links to an empty section.
const NAV_ITEMS: { label: string; href: string }[] = [
  { label: 'Index', href: '/' },
  { label: 'Work', href: '/work' },
  ...(ventures.length > 0 ? [{ label: 'Ventures', href: '/ventures' }] : []),
  { label: 'Thinking', href: '/thinking' },
  { label: 'Awards', href: '/awards' },
  ...(appearances.length > 0 ? [{ label: 'Speaking', href: '/speaking' }] : []),
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function isCurrent(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close the overlay whenever the route changes, including on browser
  // back/forward. Adjusting state during render is React's recommended
  // alternative to a route-watching effect, which would cascade a second
  // render pass on every navigation.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const lenis = getLenisInstance();
    lenis?.stop();
    document.documentElement.classList.add('is-locked');

    // Move focus into the panel, and keep Tab inside it while it is open.
    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.classList.remove('is-locked');
      getLenisInstance()?.start();
    };
  }, [open, close]);

  // Pin the header once the hero has scrolled past, and slide it away while
  // the visitor is moving down the page. Without this the only route to the
  // menu disappears after the first viewport.
  const [pinned, setPinned] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let queued = false;

    const update = () => {
      const y = window.scrollY;
      setPinned(y > 40);
      setHidden(y > 320 && y > last + 4);
      last = y;
      queued = false;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const initial = requestAnimationFrame(update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(initial);
    };
  }, []);

  // Return focus to the trigger when the panel closes.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <header
        className={`site-head${pinned ? ' is-pinned' : ''}${hidden && !open ? ' is-hidden' : ''}`}
      >
        <Link className="signature" href="/" aria-label={`${profile.name} — home`}>
          {profile.chineseName}
        </Link>
        <button
          ref={triggerRef}
          className="menu-trigger"
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <i aria-hidden="true" />
        </button>
      </header>

      <div
        id={panelId}
        ref={panelRef}
        className={`menu-panel${open ? ' is-open' : ''}`}
        // `inert` removes the off-screen panel from the tab order and the
        // accessibility tree together, which `aria-hidden` alone does not do.
        inert={!open}
      >
        <button className="menu-close" type="button" onClick={close}>
          Close <span aria-hidden="true">×</span>
        </button>

        <nav aria-label="Main">
          <ul>
            {NAV_ITEMS.map((item, index) => {
              const current = isCurrent(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={current ? 'page' : undefined}
                    className={current ? 'is-current' : undefined}
                  >
                    <small aria-hidden="true">{String(index + 1).padStart(2, '0')}</small>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="menu-meta">
          <a href={profile.links.github} rel="me noreferrer" target="_blank">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <span>{profile.location.label}</span>
        </div>
      </div>
    </>
  );
}
