const libName = Deno.build.os === "linux" ? "libgit2.so" : "libgit2.dylib";

const lib = Deno.dlopen(libName, {
  // [libgit2] int git_libgit2_init();
  git_libgit2_init: { parameters: [], result: "i32" },
  // [libgit2] int git_libgit2_shutdown();
  git_libgit2_shutdown: { parameters: [], result: "i32" },
  // [error] const git_error * git_error_last();
  git_error_last: { parameters: [], result: "pointer" },
  // [error] void git_error_clear();
  git_error_clear: { parameters: [], result: "void" },
  // [repository] int git_repository_init(git_repository **out, const char *path, unsigned int is_bare);
  git_repository_init: {
    parameters: ["pointer", "pointer", "u8"],
    result: "i32",
  },
  // [repository] void git_repository_free(git_repository *repo);
  git_repository_free: {
    parameters: ["pointer"],
    result: "void",
  },
});

export type git_repository = Deno.PointerValue;
export type git_config = Deno.PointerValue;
export type git_commit = Deno.PointerValue;
export type git_object = Deno.PointerValue;
export type git_blob = Deno.PointerValue;
export type git_tree = Deno.PointerValue;
export type git_treebuilder = Deno.PointerValue;
export type git_oid = Deno.PointerValue;

function close() {
  lib.close();
}

export { close, lib };
