#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-ffi --unstable

import * as libgit2 from "../libgit2/mod.ts";

console.log("git_libgit2_shutdown", libgit2.git_libgit2_shutdown());

const errorPtr = libgit2.git_error_last();
console.log("git_error_last", errorPtr);

const errorPtrView = new Deno.UnsafePointerView(errorPtr);
const error = new Uint8Array(16);
console.log("length", error.byteLength);
errorPtrView.copyInto(error);

libgit2.close();
