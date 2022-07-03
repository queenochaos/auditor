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

function formatCount() {
  let response = Atomics.load(counter, 0).toString();
  if (response.length === 0) response = "000";
  else if (response.length === 1) response = `00${response}`;
  else if (response.length === 2) response = `0${response}`;
  else if (response.length === 3) response = `${response}`;
  else if (response.length > 3) response = `${response.substring(0, 2)}`;
  return response;
}

function generate(): generatedItem {
  /*
  if (!master) master = masters[Math.floor(Math.random() * masters.length)];
  if (!masters.includes(master))
    master = masters[Math.floor(Math.random() * masters.length)];
    */
  const ts = getCurrentTime();
  return { ts, generated: Number(`${ts}${formatCount()}`) };
}

export function create() {
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

export function createdAt(id: number): Date {
  return new Date (Math.floor(id / 1000) + 1582133511000)

}
