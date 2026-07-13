const DEFAULT_NEXT_PATH = "/account";
const MAX_LENGTH = 512;

/**
 * Sanitizes a user-supplied `?next=` redirect target so it can only ever
 * point back into this app — never off-site. Used by `/login` (and any
 * other flow that accepts a post-auth redirect) to close the classic
 * open-redirect hole.
 *
 * Returns the original string unchanged when it is a safe, same-origin,
 * absolute path. Otherwise returns the default `"/account"`.
 *
 * Rules (all must hold, or the input is rejected):
 * 1. Must be a non-empty string.
 * 2. Must start with exactly one `/` — i.e. `raw[0] === "/"` and
 *    `raw[1] !== "/"` and `raw[1] !== "\\"`. This rejects protocol-relative
 *    URLs (`//evil.com`) and the backslash variant some browsers normalize
 *    to a protocol-relative URL (`/\evil.com`).
 * 3. Must not contain a `:` before the first `/` — this would allow it to
 *    be interpreted as a scheme (this check is redundant with rule 2 for
 *    inputs starting with `/`, but is kept explicit for defense in depth
 *    and to reject values like `/\t javascript:...` after trimming logic
 *    changes in the future).
 * 4. Must not contain any backslash anywhere (`\\`) — browsers can treat
 *    backslashes as forward slashes, which can be abused to smuggle a
 *    protocol-relative or scheme URL past a naive same-origin check.
 * 5. Must not contain any ASCII control character (0x00–0x1F or 0x7F),
 *    including newlines/tabs — these can be used for header/response
 *    splitting or to hide a scheme from a naive prefix check.
 * 6. Must be at most 512 characters long.
 *
 * Behavior table (JSDoc contract — a future test suite should assert these
 * exact examples):
 *
 * | Input                              | Output                | Reason               |
 * |-------------------------------------|------------------------|-----------------------|
 * | `"/account"`                        | `"/account"`           | valid                 |
 * | `"/account/security?x=1"`           | `"/account/security?x=1"` | valid (query ok)  |
 * | `"/"`                                | `"/"`                  | valid (root)          |
 * | `"/a/b/c#frag"`                      | `"/a/b/c#frag"`        | valid (fragment ok)   |
 * | `null`                               | `"/account"`           | null -> default       |
 * | `undefined`                          | `"/account"`           | undefined -> default  |
 * | `""`                                 | `"/account"`           | empty -> default      |
 * | `"account"` (no leading slash)       | `"/account"`           | missing leading slash |
 * | `"//evil.com"`                       | `"/account"`           | protocol-relative     |
 * | `"/\\evil.com"`                      | `"/account"`           | backslash after slash |
 * | `"\\evil.com"`                       | `"/account"`           | leading backslash     |
 * | `"/a\\b"`                            | `"/account"`           | backslash anywhere    |
 * | `"https://evil.com"`                 | `"/account"`           | absolute URL / scheme |
 * | `"javascript:alert(1)"`              | `"/account"`           | scheme, no leading /  |
 * | `"/javascript:alert(1)"`             | `"/javascript:alert(1)"` | leading / makes it a path, no scheme before first / -> valid |
 * | `"/x\n/y"`                           | `"/account"`           | control character     |
 * | `"/x\t"`                             | `"/account"`           | control character     |
 * | 600-character `"/" + "a".repeat(600)`| `"/account"`           | exceeds 512-char cap  |
 * | 512-character valid path             | unchanged              | at the cap, still ok  |
 */
export function sanitizeNextPath(raw: string | null | undefined): string {
  if (!raw) {
    return DEFAULT_NEXT_PATH;
  }

  if (raw.length > MAX_LENGTH) {
    return DEFAULT_NEXT_PATH;
  }

  if (raw[0] !== "/") {
    return DEFAULT_NEXT_PATH;
  }

  if (raw[1] === "/" || raw[1] === "\\") {
    return DEFAULT_NEXT_PATH;
  }

  if (raw.includes("\\")) {
    return DEFAULT_NEXT_PATH;
  }

  if (/[\x00-\x1f\x7f]/.test(raw)) {
    return DEFAULT_NEXT_PATH;
  }

  const firstSlash = raw.indexOf("/");
  const firstColon = raw.indexOf(":");
  if (firstColon !== -1 && firstColon < firstSlash) {
    return DEFAULT_NEXT_PATH;
  }

  return raw;
}
