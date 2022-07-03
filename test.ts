import { assertEquals } from "https://deno.land/std@0.145.0/testing/asserts.ts";
import { create, createdAt } from "./mod.ts";

function findDupes<T>(arr: T[]): T[] {
  return arr.filter((item, index) => arr.indexOf(item) != index);
}

Deno.test("Dupe Checking", () => {
  const lowTest: number[] = test(Math.floor(1 * 10000));
  assertEquals(lowTest.length, 0)
  const mediumTest: number[] = test(Math.floor(1 * 25000));
  assertEquals(mediumTest.length, 0)
  const highTest: number[] = test(Math.floor(1 * 50000));
  assertEquals(highTest.length, 0)
});

function test(n: number) {
  console.time(`${n} iterations`);
  const x: number[] = [];
  for (let i = 0; i < n; ++i) {
    x.push(create());
//    console.log(i)
//    console.log(x[i]);
  }
const dupes = findDupes<number>(x)
  //console.log(x);
  console.log(dupes.length + " dupe values in " + x.length);
  console.timeEnd(`${n} iterations`);
  console.log(`Last value at ${createdAt(x[x.length - 1])}`)
  return dupes;
}

console.log(create(), createdAt(create()))
