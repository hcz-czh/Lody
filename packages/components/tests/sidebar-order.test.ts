import { describe, expect, it } from 'vitest';

import { mergeVisibleSidebarOrder, reconcileVisibleSidebarOrder } from '../src/atoms/sidebar-state';
import { restrictSidebarListDrag } from '../src/components/session-list';

describe('sidebar project ordering', () => {
  it('applies saved positions and appends new visible ids once', () => {
    expect(
      reconcileVisibleSidebarOrder(
        ['remote-b', 'hidden', 'remote-a', 'remote-b'],
        ['remote-a', 'remote-b', 'remote-c', 'remote-c']
      )
    ).toEqual(['remote-b', 'remote-a', 'remote-c']);
  });

  it('keeps temporarily hidden ids after a visible reorder', () => {
    expect(
      mergeVisibleSidebarOrder(
        ['project-a', 'hidden-project', 'project-b'],
        ['project-b', 'project-a']
      )
    ).toEqual(['project-b', 'project-a', 'hidden-project']);
  });
});

describe('sidebar list drag bounds', () => {
  it('keeps a dragged row vertical and inside its own list', () => {
    const result = restrictSidebarListDrag({
      transform: { x: 400, y: 400, scaleX: 0.8, scaleY: 0.8 },
      activeNodeRect: { top: 100, bottom: 130, left: 50, right: 300, width: 250, height: 30 },
      containerNodeRect: {
        top: 100,
        bottom: 220,
        left: 50,
        right: 300,
        width: 250,
        height: 120,
      },
    } as Parameters<typeof restrictSidebarListDrag>[0]);

    expect(result).toEqual({ x: 0, y: 90, scaleX: 1, scaleY: 1 });
  });
});
