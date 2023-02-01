export function pad2(num: number) {
  return num < 10 ? `0${num}` : num;
}

export function numberFromDay(date: Date = new Date()): string {
  return `${pad2(date.getDate())}${pad2(date.getHours())}${pad2(date.getMinutes())}`;
}

const monthCodes = ['A', 'C', 'E', 'H', 'J', 'L', 'M', 'P', 'R', 'S', 'X', 'Y', 'T'];
// NiNo validation : Neither of the first two letters can be D, F, I, Q, U or V.
// The second letter also cannot be O. The prefixes BG, GB, NK, KN, TN, NT and ZZ are not allocated
// Letters to avoid - B, D, F, G, I, K, N, O, Q, T, U, V, Z
export function monthPrefix(date: Date = new Date()): string {
  return monthCodes[date.getMonth()] || 'T';
}

const yearCodes = ['A', 'C', 'E', 'H', 'J', 'L', 'M', 'P'];
export function yearPrefix(date: Date = new Date()): string {
  return yearCodes[date.getFullYear() - 2020] || 'P';
}

export function generateNINumber(postfix = 'A', date: Date = new Date()): string {
  return `${yearPrefix(date)}${monthPrefix(date)}${numberFromDay(date)}${postfix}`;
}
