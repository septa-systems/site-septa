// Ritmo das animações (ADR 0001): com "menos movimento" tudo anda mais devagar, mas não para.
export const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const ritmo = calmo ? 0.45 : 1;
export const mouseFino = matchMedia("(pointer: fine)").matches;
