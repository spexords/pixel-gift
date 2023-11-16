export interface Flag {
  path: string;
  width: number;
}

export const flags: Record<string, Flag> = Object.freeze({
  en: {
    path: 'assets/nav/us-flag.svg',
    width: 38,
  },
  pl: {
    path: 'assets/nav/pl-flag.svg',
    width: 24,
  },
});
