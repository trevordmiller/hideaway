# Contributing

- Ensure you have [Git](https://git-scm.com/), [Node](https://nodejs.org), and [Yarn](https://yarnpkg.com) installed on your machine
- Run `yarn` to install libraries
- Run `yarn dev` to develop
  - Note that the app has a slow startup in development because of the included developer tools, but once build for production is much faster
  - Note that seconds are used in place of minutes during development to speed up testing
- Submit a pull request to `master`
- Continuous Integration runs `yarn verify` to ensure things are working as expected
- An admin merges your pull request into `master` and releases a new version
