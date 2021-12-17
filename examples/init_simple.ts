#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-ffi --unstable

import { isLittleEndian } from "https://deno.land/x/ffi/mod.ts";
import * as libgit2 from "../libgit2/mod.ts";

const PATH = "./tmp";

libgit2.git_libgit2_init();

const repo = new Uint8Array(8);

/* With working directory: */
const errorCode = libgit2.git_repository_init(
  Deno.UnsafePointer.of(repo),
  PATH,
  false,
);

if (errorCode < 0) {
  console.error(libgit2.git_error_last());
  Deno.exit(errorCode);
}

const repoPtr = new Deno.UnsafePointer(
  new DataView(repo.buffer).getBigUint64(0, isLittleEndian()),
);

libgit2.git_repository_free(repoPtr);

libgit2.close();

Deno.remove(PATH, { recursive: true });
