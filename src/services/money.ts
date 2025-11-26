/**
 * Money and transaction utilities built on integer grosze to avoid floating point errors.
 */

export type Grosze = number;
export const PLN_SYMBOL = 'zł';

export interface MoneyAmount {
  currency: 'PLN';
  grosze: Grosze;
}

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type TransactionKind = 'deposit' | 'withdrawal' | 'payment' | 'refund';

export interface Transaction {
  id: string;
  kind: TransactionKind;
  label: string;
  amount: Grosze; // stored as grosze to keep integer precision
  status: TransactionStatus;
  createdAt: Date;
  completedAt?: Date;
  counterparty?: string;
  reference?: string;
}

const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Parse human-friendly PLN input into grosze (integer).
 * Supports comma or dot decimal separators and optional currency symbol.
 */
export function parsePLNToGrosze(value: string | number): Grosze {
  const raw = String(value).trim();
  const sanitized = raw.replace(/[^0-9,.-]/g, '').replace(',', '.');

  if (!sanitized || sanitized === '.' || sanitized === '-' || sanitized === '-.') {
    throw new Error(`Cannot parse monetary value from "${value}"`);
  }

  const negative = sanitized.startsWith('-');
  const unsigned = sanitized.replace(/^-/, '');
  const [zlotyPart = '0', groszePart = ''] = unsigned.split('.');
  const normalizedGrosze = (groszePart + '00').slice(0, 2);

  const zloty = parseInt(zlotyPart || '0', 10);
  const grosze = parseInt(normalizedGrosze || '0', 10);

  const total = zloty * 100 + grosze;
  return negative ? -total : total;
}

export function toMoneyAmount(input: string | number): MoneyAmount {
  return { currency: 'PLN', grosze: parsePLNToGrosze(input) };
}

export function addGrosze(base: Grosze, ...increments: Grosze[]): Grosze {
  return increments.reduce((acc, inc) => acc + inc, base);
}

export function subtractGrosze(base: Grosze, ...deductions: Grosze[]): Grosze {
  return deductions.reduce((acc, dec) => acc - dec, base);
}

/**
 * Convert grosze into a formatted PLN string, keeping integer arithmetic.
 */
export function formatGroszeToPLN(grosze: Grosze, withSymbol = true): string {
  const sign = grosze < 0 ? '-' : '';
  const absolute = Math.abs(grosze);
  const zloty = Math.floor(absolute / 100);
  const remainder = absolute % 100;

  const zlotyString = zloty.toLocaleString('pl-PL');
  const groszeString = remainder.toString().padStart(2, '0');
  const formatted = `${sign}${zlotyString},${groszeString}`;

  return withSymbol ? `${formatted} ${PLN_SYMBOL}` : formatted;
}

export function formatMoneyAmount(amount: MoneyAmount, withSymbol = true): string {
  return formatGroszeToPLN(amount.grosze, withSymbol);
}

function dateDaysAgo(days: number): Date {
  const now = Date.now();
  const msInDay = 86_400_000;
  return new Date(now - days * msInDay);
}

function addMinutes(date: Date, minutes: number): Date {
  const msInMinute = 60_000;
  return new Date(date.getTime() + minutes * msInMinute);
}

/**
 * Generate deterministic-ish mock transaction histories with realistic spreads
 * across statuses, dates, and integer grosze amounts.
 */
export function generateMockTransactions(count = 12): Transaction[] {
  const kinds: TransactionKind[] = ['deposit', 'withdrawal', 'payment', 'refund'];
  const statuses: TransactionStatus[] = ['pending', 'completed', 'failed', 'refunded'];
  const counterparties = ['Kawiarnia Młyn', 'Sklep Spożywczy', 'PKP Intercity', 'Cinema City', 'Biedronka', 'Allegro'];

  return Array.from({ length: count }).map((_, index) => {
    const daysAgo = range(index + 1, index + 40);
    const createdAt = dateDaysAgo(daysAgo);
    const kind = kinds[range(0, kinds.length - 1)];
    const status = statuses[range(0, statuses.length - 1)];
    const direction = kind === 'deposit' || kind === 'refund' ? 1 : -1;

    const zlotyPortion = range(10, 650); // PLN portion for realism
    const groszePortion = range(0, 99);
    const amount = direction * (zlotyPortion * 100 + groszePortion);

    const baseLabelMap: Record<TransactionKind, string> = {
      deposit: 'Wpłata własna',
      withdrawal: 'Wypłata bankomat',
      payment: 'Płatność kartą',
      refund: 'Zwrot środków'
    };

    const label = `${baseLabelMap[kind]} ${counterparties[range(0, counterparties.length - 1)]}`;

    const reference = `TX-${createdAt.getFullYear()}${String(createdAt.getMonth() + 1).padStart(2, '0')}-${index}`;
    const completionMinutes = range(5, 60 * 48);
    const completedAt = status === 'completed' || status === 'refunded' ? addMinutes(createdAt, completionMinutes) : undefined;

    return {
      id: `txn-${createdAt.getTime()}-${index}`,
      amount,
      kind,
      label,
      status,
      createdAt,
      completedAt,
      counterparty: counterparties[range(0, counterparties.length - 1)],
      reference
    };
  });
}

/**
 * Quick helpers for UI usage.
 */
export const Money = {
  toGrosze: parsePLNToGrosze,
  format: formatGroszeToPLN,
  add: addGrosze,
  subtract: subtractGrosze
};

export const Transactions = {
  generateMock: generateMockTransactions
};
