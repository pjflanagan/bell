# Bell Language Design Assessment

## URL Quoting

### Current state
The grammar defines two unquoted URL tokens — `FullUrl` (matches `http(s)://...`) and `RelativeUrl` (matches paths starting with `/` or `./`) — plus a general `StringLiteral` for quoted strings. In practice, the existing examples use all three inconsistently:

```
url http://localhost:4000/post/{id}       # unquoted FullUrl token
url https://subdomain.domain.com:1234/page # unquoted FullUrl token
url localhost:4000/post/{id}              # neither — falls through to expression as identifier chain?
```

The third form (`localhost:4000/...`) is a problem: without a scheme, the input doesn't match `FullUrl` or `RelativeUrl`, so the parser likely misreads it as an identifier followed by a colon and more tokens. It only "works" today because the visitor returns identifier text verbatim and the string concatenates into something axios accepts — fragile behavior, not an intentional feature.

### Should quotes be required for `url`?

**Yes, enforce quotes.** The reasons:

1. **`{var}` interpolation is already broken without them.** The string `http://localhost/{id}` is parsed as a `FullUrl` token by the lexer, which captures it as a raw string literal. The visitor calls `resolveInterpolation` on `FullUrl` text, so interpolation works — but only by accident. The lexer token boundary and the interpolation pass are not designed together; any change to the grammar could silently break it.

2. **`StringLiteral` already handles this cleanly.** Backtick strings (`` `https://api.example.com/{id}` ``) make the interpolation intent explicit and consistent with how headers and body values work.

3. **Consistency with `path`, `body`, `header`.** All other request-building statements use `expression` as their value and work naturally with quoted strings. `url` being special-cased with dedicated lexer tokens is an inconsistency that doesn't pay for itself.

4. **The `FullUrl` / `RelativeUrl` tokens should probably be removed.** They exist to let you write `url https://...` unquoted, but they leak into the expression grammar (they are valid expressions), which makes the grammar harder to extend. Nothing meaningful is lost by requiring quotes.

**Recommended change:** Change `urlStatement` and `pathStatement` to accept only `expression`, drop `FullUrl` and `RelativeUrl` from the lexer, and update all examples to use quoted strings. The one thing to preserve: the bare `http://...` form without braces used in many existing examples — a migration note is enough since this is a pre-1.0 language.


## `param` Statement

### Current state
The grammar rule is:

```antlr
paramStatement
  : Param expression (Assign? expression)?
  ;
```

The `Assign?` makes `=` optional. The visitor handles two shapes:

```
param name value          # two expressions, key + value
param name = value        # two expressions with optional = (= is discarded)
param "key=value"         # single string expression, split on '='
```

The `"key=value"` form (`param "location=NY/New_York"`) appears in one example alongside `param query = "Sushi"`. The `=` form comes from thinking about Bell as config-like syntax; the bare form is cleaner for a scripting language.

### Should `=` be removed?

**Yes, remove `=` from `param`.** The reasons:

1. **It adds nothing.** `param query "Sushi"` and `param query = "Sushi"` produce identical output. The `=` does not improve readability for someone who doesn't already know it does nothing.

2. **It looks like assignment and isn't.** `name = "value"` is the variable assignment syntax. `param query = "Sushi"` reads as if it's assigning a variable named `query`, which is misleading.

3. **The `"key=value"` single-string form should also go.** It's an escape hatch for raw query strings (`"location=NY/New_York"`), but it makes the parser ambiguous at the call site — you can't tell by reading whether the single argument is a key or a `key=value` pair. The right approach for a pre-built query string is either `url "https://api.com/path?location=NY/New_York"` or two arguments: `param location "NY/New_York"`.

**Recommended change:** Simplify the grammar to:

```antlr
paramStatement
  : Param expression expression
  ;
```

Two required expressions, no `=`, no single-argument form. Remove the `key.includes('=')` split logic from the visitor.


## Related: `param` with a variable key

One test file uses `$var1` / `$var2` with dollar-sign prefixes, but the lexer's `Identifier` rule doesn't allow `$`. These examples would currently fail to lex. Either the `$` prefix should be added to `Identifier`, or the examples should be updated to use plain identifiers (`query`, `value`). Given that the language has no other use of `$`, removing it from the examples is the cleaner choice.


## Summary of Recommended Changes

| Area | Change |
|------|--------|
| `url` quoting | Require quoted strings; remove `FullUrl` and `RelativeUrl` lexer tokens |
| `param` `=` syntax | Remove optional `=`; always use `param key value` |
| `param "key=value"` single-arg form | Remove; use `url` with inline query string or two-arg `param` |
| `$var` in examples | Update to plain identifiers; `$` is not a valid identifier character |
