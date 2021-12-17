#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-ffi --unstable

import * as libgit2 from "./libgit2/mod.ts";

console.log("git_libgit2_init", libgit2.git_libgit2_init());
console.log("git_libgit2_shutdown", libgit2.git_libgit2_shutdown());

console.log("git_error_last", libgit2.git_error_last());

const buf = new Uint8Array(8);
const ptr = Deno.UnsafePointer.of(buf);
const ptrView = new Deno.UnsafePointerView(ptr);
console.log(
  "git_repository_init",
  libgit2.git_repository_init(ptr, "./tmp", false),
);

libgit2.close();
