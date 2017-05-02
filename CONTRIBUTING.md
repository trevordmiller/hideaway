# Contributing

- Ensure you have [Git](https://git-scm.com/), [Node](https://nodejs.org), and [Yarn](https://yarnpkg.com) installed on your machine
- Run `yarn` to install libraries
- Run `yarn dev:build` and `yarn dev:server` to develop
  - Note that seconds are used in place of minutes during development to speed up testing
  - The key things you may want to edit are `index.js` (the Electron main process), `src` (the client pieces, written as React components), and `appShellScripts` (shell scripts which control the users desktop)
- Submit a pull request to `master`
- Continuous Integration runs `yarn verify` to ensure things are working as expected
- An admin merges your pull request into `master` and runs `yarn release` to release a new version
