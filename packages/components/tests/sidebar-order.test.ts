import { describe, expect, it } from 'vitest';

import { mergeVisibleSidebarOrder, reconcileVisibleSidebarOrder } from '../src/atoms/sidebar-state';

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
