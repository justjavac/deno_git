import { lib } from "./lib.ts";

export interface GitError {
  message: string;
  klass: number;
}

/**
 * Return the last `git_error` object that was generated for the
 * current thread.
 *
 * The default behaviour of this function is to return NULL if no previous error has occurred.
 * However, libgit2's error strings are not cleared aggressively, so a prior
 * (unrelated) error may be returned. This can be avoided by only calling
 * this function if the prior call to a libgit2 API returned an error.
 *
 * @return A git_error object.
 */
export function git_error_last() {
  return lib.symbols.git_error_last() as Deno.UnsafePointer;
}

/**
 * Clear the last library error that occurred for this thread.
 */
export function git_error_clear() {
  return lib.symbols.git_error_clear();
}

/**
 * Set the error message string for this thread.
 *
 * This function is public so that custom ODB backends and the like can
 * relay an error message through libgit2.  Most regular users of libgit2
 * will never need to call this function -- actually, calling it in most
 * circumstances (for example, calling from within a callback function)
 * will just end up having the value overwritten by libgit2 internals.
 *
 * This error message is stored in thread-local storage and only applies
 * to the particular thread that this libgit2 call is made from.
 *
 * @param error_class One of the `git_error_t` enum above describing the
 *                    general subsystem that is responsible for the error.
 * @param string The formatted error message to keep
 * @return 0 on success or -1 on failure
 */
//  GIT_EXTERN(int) git_error_set_str(int error_class, const char *string); // TODO

/**
 * Set the error message to a special value for memory allocation failure.
 *
 * The normal `git_error_set_str()` function attempts to `strdup()` the
 * string that is passed in.  This is not a good idea when the error in
 * question is a memory allocation failure.  That circumstance has a
 * special setter function that sets the error string to a known and
 * statically allocated internal value.
 */
//  GIT_EXTERN(void) git_error_set_oom(void); // TODO
