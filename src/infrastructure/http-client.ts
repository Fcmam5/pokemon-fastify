import axios from "axios";

const TEMPORARY_IN_MEMORY_CACHE = new Map();

/**
 * @HACK I'm using an in-memory caching solution for the sake of this exercise.
 *  HTTP Requests in such use case might be cached;
 *   Ideally, this can be done on the proxy/reverse-proxy side which could be better for decoupling that from our business logic
 *   Or, we could refactor our service/use-case logic to try pulling data from a caching mechanism (Redis, Memcached...) before performing the HTTP request
 *
 *   Or, as an alternative (out of this scope) we can create a read-model where we store a copy of our own data in a DB which will be located as close as possible to this MS,
 *    and it will be refreshed from a cronJob running as a crawler or a frequent consumer of the target API
 *
 *  Anyways, I did a small benchmark using the **time** Unix command and I called my endpoints repeatedly using httpie: https://github.com/httpie/httpie
 * Benchmark:
 *  Example: Get one Pokemon
 *    Using in-memory cache solution:
 *      http http://localhost:3000/poke/bulbasaur  0.22s user 0.09s system 45% cpu 0.688 total
 *      http http://localhost:3000/poke/bulbasaur  0.20s user 0.08s system 72% cpu 0.387 total
 *      http http://localhost:3000/poke/bulbasaur  0.20s user 0.08s system 77% cpu 0.362 total
 *    Without cache
 *      http http://localhost:3000/poke/bulbasaur  0.21s user 0.09s system 52% cpu 0.557 total
 *      http http://localhost:3000/poke/bulbasaur  0.20s user 0.07s system 65% cpu 0.420 total
 *      http http://localhost:3000/poke/bulbasaur  0.21s user 0.07s system 66% cpu 0.411 total
 *
 *  Example: Get a list with limit=50
 *    Using in-memory cache solution:
 *      http http://localhost:3000/poke  0.25s user 0.07s system 12% cpu 2.669 total
 *      http http://localhost:3000/poke  0.25s user 0.08s system 71% cpu 0.465 total
 *      http http://localhost:3000/poke  0.24s user 0.07s system 79% cpu 0.394 total
 *    Without cache:
 *      http http://localhost:3000/poke  0.25s user 0.07s system 12% cpu 2.696 total
 *      http http://localhost:3000/poke  0.24s user 0.07s system 11% cpu 2.630 total
 *      http http://localhost:3000/poke  0.25s user 0.07s system 11% cpu 2.699 total
 */
export async function httpGetWithCache<T>(url: string): Promise<T> {
  if (TEMPORARY_IN_MEMORY_CACHE.has(url)) {
    return TEMPORARY_IN_MEMORY_CACHE.get(url);
  }

  const rs = await httpGet<T>(url);
  TEMPORARY_IN_MEMORY_CACHE.set(url, rs);
  return rs;
}

export async function httpGet<T>(url: string): Promise<T> {
  try {
    return (await axios.get(url)).data;
  } catch (error) {
    // TODO log error
    return null;
  }
}
