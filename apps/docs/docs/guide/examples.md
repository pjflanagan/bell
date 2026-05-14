# Examples

Below are a collection of examples showing Bell in action. These files are pulled directly from the `examples/` directory of the repository.

## Basic GET Request

A simple example of setting a URL and parameters, then executing a GET request.

<<< @/../../../examples/0-basicGetRequest/post.GET.bel

## User Input

Prompt the user for data during execution.

<<< @/../../../examples/0-basicGetRequest/postWithUserInput.GET.bel

## Search with URL Breakdown

Build a URL from a base domain and query parameters.

<<< @/../../../examples/3-searchWithUrlBreakdown/searchWithUrl.GET.bel

## Login and POST (Single File)

A multi-step workflow in a single file: log in, save the token, then make an authenticated POST.

<<< @/../../../examples/1-loginAndPost/loginAndPostOneFile.bel

## Multi-file Organization

Bell runs each file in order at the time it is called. If you need to login before executing a file,
you can simply `import` the `login.bel` file then run a new request.

To ensure that necessary variables are set, you can `require` them in files and `export` them in files run before. If the required variable
is not present then the execution stops.

Split scripts into reusable files. The main file uses `run` to run each step; exported variables carry over between files.

::: code-group

<<< @/../../../examples/2-loginAndPostAndDelete-require/loginAndPostImport.bel [loginAndPostImport.bel]

<<< @/../../../examples/2-loginAndPostAndDelete-require/1-login.POST.bel [1-login.POST.bel]

<<< @/../../../examples/2-loginAndPostAndDelete-require/2-post.POST.bel [2-post.POST.bel]

<<< @/../../../examples/2-loginAndPostAndDelete-require/3-delete.DELETE.bel [3-delete.DELETE.bel]

<<< @/../../../examples/2-loginAndPostAndDelete-require/cred.bel [cred.bel]

:::

## Post with Validation

Import JSON data, validate it against a TypeScript type, and assert on the response.

::: code-group

<<< @/../../../examples/5-postWithValidateAndExpect/post.POST.bel [post.POST.bel]

<<< @/../../../examples/5-postWithValidateAndExpect/request.json [request.json]

:::

## Environment Switching

Load an environment config and let the user choose between dev, staging, and production.

::: code-group

<<< @/../../../examples/6-environment/environment.GET.bel [environment.GET.bel]

<<< @/../../../examples/6-environment/envConfig.json [envConfig.json]

:::

## Security Warnings

Use `warn` to require confirmation before sending a request to a sensitive endpoint.

<<< @/../../../examples/7-securityWarnings/deleteUserProdWarning.bel
