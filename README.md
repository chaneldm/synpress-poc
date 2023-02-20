Running e2e tests locally:
1. pull this repository
2. `yarn install`
3. `yarn test:e2e:local`


Synpress: https://github.com/Synthetixio/synpress
There is a global before() which runs metamask setup before all tests:

passes welcome page
imports wallet
changes network (defaults to goerli) or creates custom network and changes to it (depending on your setup)
switches back to Cypress window and starts testing