const GREAT_DAY = 1582133511000;
let counter = 0;
function getCurrentTime() {
  return Math.floor(Date.now() - GREAT_DAY);
}
interface generatedItem {
  ts: number;
  generated: string;
}

const lastgen = {
  ts: 0,
  gen: new Array(),
};

function formatCount() {
  let response = counter.toString();
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
  return { ts, generated: `${ts}${formatCount()}` };
}

function findDupes(arr: Array<any>) {
  return arr.filter((item, index) => arr.indexOf(item) != index);
}

export function createID() {
  if (counter === 999) counter = 0;
  let { generated, ts } = generate();

  if (lastgen.ts !== ts) {
    lastgen.ts = ts;
    lastgen.gen.push(generated);
    counter++;
    return generated;
  } else {
    while (lastgen.gen.includes(generated)) {
      generated = generate().generated;
    }
    lastgen.gen.push(generated);
    counter++;
    return generated;
  }
}

/*
// let x = Math.floor(Math.random() * 999);

console.time("15k iterations");
let x = [];
for (let i = 0; i < 15000; ++i) {
  x.push(run());
  console.log(x[i])
}

//console.log(x);
console.log(findDupes(x).length + " dupe values")
console.timeEnd("15k iterations");
*/
