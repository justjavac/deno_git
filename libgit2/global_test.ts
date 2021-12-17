import {  assert } from "https://deno.land/std/testing/asserts.ts";

import {git_libgit2_init, git_libgit2_shutdown} from "./global.ts";

Deno.test("git_libgit2_init", (): void => {
  assert(git_libgit2_init() >= 0);
  assert(git_libgit2_init() >= 0);
});

Deno.test("git_libgit2_shutdown", (): void => {
  git_libgit2_init();
  assert(git_libgit2_shutdown() >= 0);
});
