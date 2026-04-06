# Examples

Below are a collection of examples showing Bell in action. These files are pulled directly from the `examples/` directory of the repository.

## Basic GET Request
A simple example of setting a URL and parameters, then executing a GET request and logging the status.

<<< @/../../../examples/0-basicGetRequest/post.GET.bel

## Login and POST (Workflow)
Demonstrates a multi-step workflow in a single file.

<<< @/../../../examples/1-loginAndPost/loginAndPostOneFile.bel

## Post with Validation
Shows how to import JSON data, validate it against a type, and perform expectations on the response.

<<< @/../../../examples/5-postWithValidateAndExpect/post.POST.bel

## Environment Switching
Shows how to load environment configurations and switch between them.

<<< @/../../../examples/6-environment/environment.GET.bel

## User Input
Prompt the user for data during execution.

<<< @/../../../examples/0-basicGetRequest/postWithUserInput.GET.bel

## Security Warnings
Prompt for confirmation before performing sensitive operations.

<<< @/../../../examples/7-securityWarnings/deleteUserProdWarning.bel

## Multi-file Organization
Split your scripts into reusable components.

<<< @/../../../examples/2-loginAndPostAndDelete-require/loginAndPostImport.bel
