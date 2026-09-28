import type Lenis from 'lenis';

/**
 * The single Lenis instance, shared between the scroll provider that owns it
 * and the components that need to pause it (the menu overlay locks scrolling
 * while it is open).
 */
let instance: Lenis | null = null;

export function setLenisInstance(next: Lenis | null): void {
  instance = next;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}
