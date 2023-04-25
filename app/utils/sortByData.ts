import type { Story } from '~/types';

export function sortByDateDescending(arr: Story[]) {
  return arr.sort((a, b) => {
    const timeA = a.time || 0;
    const timeB = b.time || 0;
    return timeB - timeA;
  });
}
