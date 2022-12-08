import axios from "axios";

// Type alias for age verification function type expression
type AgeVerificationFunc = (age: number) => boolean;

function verifyAge(func: AgeVerificationFunc, age: number) {
    return func(age);
}

const verifyAgeCb = (age: number): boolean => {
    return age > 32
};

const isValid = verifyAge(verifyAgeCb, 23);
console.log("isValid ", isValid)

// ***
// https://decipher.dev/30-seconds-of-typescript/docs/memoize
type SquareType<T> = (num: number) => number;

const clumsysquare = (num: number): number => {
    let result = 0;
    for (let i = 1; i <= num; i++) {
        for (let j = 1; j <= num; j++) {
            result++
        }
    }
    return result
}

const memoize = <T = any>(fn: SquareType<T>) => {
    const cache = new Map();
    const cached = function (this: any, val: T) {
        return cache.has(val)
            ? cache.get(val)
            : cache.set(val, fn.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached
}

const memoizeClass = memoize(clumsysquare);

console.time("First call");
console.log(memoizeClass(9467));
console.timeEnd("First call");

console.time("Second call");
console.log(memoizeClass(9467));
console.timeEnd("Second call");

console.time("Third call");
console.log(memoizeClass(9467));
console.timeEnd("Third call");


// ****
type CallApiType<T> = (num: number) => Promise<number>;

const memoizeRateLimit = <T = any>(func: CallApiType<T>, maxAge: number = 1000) => {
    let cache = new Map();
    let startTime = Date.now();

    const cached = function (this: any, val: T) {
        let endTime = Date.now();
        let requestTime = endTime - startTime;
        let delayTime = maxAge - requestTime;

        if (delayTime <= 0) {
            cache = new Map();
            startTime = Date.now();
        };
        return cache.has(val)
            ? cache.get(val)
            : cache.set(val, func.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached
}

const callApi = async (): Promise<number> => {
    const { data, status } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(`**** CALLED API | Status: ${status} **** `)
    return data.length
}

const memoizeApi = memoizeRateLimit(callApi);


(async function run() {
    console.time("First call");
    console.log(await memoizeApi('post'));
    console.timeEnd("First call");

    console.time("Second call");
    console.log(await memoizeApi('post'));
    console.timeEnd("Second call");

    console.time("Third call");
    console.log(await memoizeApi('post'));
    console.timeEnd("Third call");

    setTimeout(async () => {
        console.time("Four call");
        console.log(await memoizeApi('post'));
        console.timeEnd("Four call");
    }, 2000);
})()
