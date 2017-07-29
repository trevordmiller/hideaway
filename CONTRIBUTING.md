# Contributing

- Ensure you have the latest [Git](https://git-scm.com/) and [Node + npm](https://nodejs.org) installed on your machine
- Run `npm install` to install libraries
- Run `npm run dev` to develop
  - The app has a slow startup in development because of the included developer tools, but once built for production is much faster
  - Seconds are used in place of minutes during development to speed up testing
- Submit a pull request to `master`
- Continuous Integration runs `npm run verify` to ensure things are working as expected
- An admin merges your pull request into `master` and releases a new version
