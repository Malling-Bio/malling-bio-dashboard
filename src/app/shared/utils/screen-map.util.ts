import {ScreenView} from '../../core/models/screen-view';

export function screenMapToList(screenMap: Record<string, ScreenView> | null | undefined): ScreenView[] {
  if (!screenMap) {
    return [];
  }

  return Object.values(screenMap).sort((a, b) => a.screenId.localeCompare(b.screenId));
}
