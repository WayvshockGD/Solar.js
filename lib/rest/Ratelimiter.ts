export = class Ratelimiter {
    constructor(headers: any, ratelimits: string[]) {
        console.log(headers["x-ratelimit-limit"]);
        ratelimits.push(headers["x-ratelimit-limit"])
    }
}