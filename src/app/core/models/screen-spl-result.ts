import {SplCue} from './spl-cue';

export interface ScreenSplResult {
  screenId: string;
  available: boolean;
  cueCount: number;
  cues: SplCue[];
  error: string | null;
}
