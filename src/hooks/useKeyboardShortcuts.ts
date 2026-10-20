import { useEffect, useEffectEvent } from 'react';

export interface UseKeyboardShortcutsOptions {
  onToggle?: () => void;
  onReset?: () => void;
  enabled?: boolean;
}

/**
 * Custom React hook for simulation keyboard shortcuts.
 * Listens for:
 * - 'Space' to toggle animation/simulation state
 * - 'R' (or 'KeyR') to reset the simulation
 *
 * Automatically suppresses shortcuts when the user is typing in form inputs,
 * textareas, or contentEditable elements.
 */
export function useKeyboardShortcuts({
  onToggle,
  onReset,
  enabled = true,
}: UseKeyboardShortcutsOptions) {
  const handleToggle = useEffectEvent(() => {
    if (onToggle) {
      onToggle();
    }
  });

  const handleReset = useEffectEvent(() => {
    if (onReset) {
      onReset();
    }
  });

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes when the user is actively focused on an input or textarea
      const target = document.activeElement as HTMLElement | null;
      const tagName = target ? target.tagName.toLowerCase() : '';
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleToggle();
      } else if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);
}

export default useKeyboardShortcuts;
