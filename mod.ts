import { AddZero } from "https://deno.land/x/numwizard@v1.2.1/src/add_zero.ts";

const GREAT_DAY = 1582133511000;
const counter = new Uint8Array(1);
counter[0] = 0;
function getCurrentTime() {
  return Math.floor(Date.now() - GREAT_DAY);
}
interface generatedItem {
  ts: number;
  generated: number;
}

const lastgen: { ts: number; gen: number[] } = {
  ts: 0,
  gen: [],
};

/**
 * Add Zeros to the counter.
 * @returns {string} Formatted count.
 */
function formatCount(): string {
  return AddZero(Atomics.load(counter, 0), 3);
}

/**
 * Generate id
 */
function generate(): generatedItem {
  /*
  if (!master) master = masters[Math.floor(Math.random() * masters.length)];
  if (!masters.includes(master))
    master = masters[Math.floor(Math.random() * masters.length)];
    */
  const ts = getCurrentTime();
  return { ts, generated: Number(`${ts}${formatCount()}`) };
}

/**
 * Create an ID.
 * @param {number} epoch An epoch to start from. Must be less than current time.
 * @returns {number} generated ID
 */
export function create(epoch = GREAT_DAY): number {
  if (epoch > Date.now()) {
    throw new Error(
      "Invalid epoch. Epoch must be a point of time in the past.",
    );
  }
  if (Atomics.load(counter, 0) === 999) Atomics.store(counter, 0, 0);
  let { generated, ts } = generate();

  if (lastgen.ts !== ts) {
    lastgen.ts = ts;
    lastgen.gen.push(generated);
    Atomics.add(counter, 0, 1);
    return generated;
  } else {
    while (lastgen.gen.includes(generated)) {
      generated = generate().generated;
    }
    lastgen.gen.push(generated);
    Atomics.add(counter, 0, 1);
    return generated;
  }
}

/**
 * Get creation time of ID.
 * @param {number} id ID to get date from.
 * @param {number} epoch Epoch used when creating ID
 * @returns {Date} creation time of ID.
 */
export function createdAt(id: number, epoch = GREAT_DAY): Date {
  return new Date(Math.floor(id / 1000) + epoch);
}
