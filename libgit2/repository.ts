import { cstr2ptr } from "https://deno.land/x/ffi/mod.ts";

import { lib } from "./lib.ts";
import type { git_repository } from "./lib.ts";

/**
 * Creates a new Git repository in the given folder.
 *
 * TODO:
 * 	- Reinit the repository
 *
 * @param out pointer to the repo which will be created or reinitialized
 * @param path the path to the repository
 * @param is_bare if true, a Git repository without a working directory is
 * 		created at the pointed path. If false, provided path will be
 * 		considered as the working directory into which the .git directory
 * 		will be created.
 *
 * @return 0 or an error code
 */
export function git_repository_init(
  out: git_repository,
  path: string,
  is_bare: boolean,
): number {
  return lib.symbols.git_repository_init(
    out,
    cstr2ptr(path),
    Number(is_bare),
  ) as number;
}

/**
 * Free a previously allocated repository
 *
 * Note that after a repository is free'd, all the objects it has spawned
 * will still exist until they are manually closed by the user
 * with `git_object_free`, but accessing any of the attributes of
 * an object without a backing repository will result in undefined
 * behavior
 *
 * @param repo repository handle to close. If NULL nothing occurs.
 */
export function git_repository_free(
  repo: Deno.UnsafePointer,
): void {
  return lib.symbols.git_repository_free(repo) as void;
}
