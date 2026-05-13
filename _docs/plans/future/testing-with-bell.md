# Prompt

Bell has an expect command for testing, but no infra setup around it.
The vision is: a NextJS app with an api can have a bunch of bell files that test it.
This would be runnable with an `npm` command in `package.json` and could be setup to run in a CI on Github.

We might need a `bell.config.json` file to setup the environment.
We might need this config file for other reasons anyway, but I want it to remain optional.
