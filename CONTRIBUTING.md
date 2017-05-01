# Contributing

## Workflow

- Ensure you have [Git](https://git-scm.com/), [Node](https://nodejs.org), and [Yarn](https://yarnpkg.com) installed on your machine
- Run `yarn` to install dependencies
- Run `yarn client-dev` and `yarn desktop-dev` to develop
- Note that seconds are used in place of minutes during development to speed up testing
- The key things you may want to edit are `index.js` (the Electron main process), `src` (the client pieces, written as React components), and `appShellScripts` (shell scripts which control the users desktop)
- Submit a pull request to `master`
- An admin merges your pull request into `master` and runs `yarn release` to release a new version
