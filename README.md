# NFT Test

A simple proof of concept (POC) application that mints NFTs on EVM compatible blockchains and then allows you to lend them out to other wallets.

## Integrations and setup

This app was setup using [Turborepo](https://turbo.build/repo) and [Vite React-TS](https://vitejs.dev/guide/#scaffolding-your-first-vite-project). It hosts a blockchain and a web project.

The protocol workspace is located in `/apps/protocol`. It utilizes [Hardhat](https://hardhat.org/) to deploy a Solidity Smart Contract that allows a user to mint an NFT, and then lend it out.

This dApp employs [Infura](https://www.infura.io/) to connect our to the [Linea](https://sepolia.lineascan.build/) testnet. Infura acts as our node/rpc provider. It can easily be configured to work with other chains besides linea-sepolia as well.

This dApp also uses the [Rainbowkit wallet](https://www.rainbowkit.com/docs/installation) in order to connect to a user wallet and manage digital assets.

[Wagmi](https://wagmi.sh/) and [Viem](https://viem.sh/docs/introduction) are used to interact with our chains and to handle read and write transactions.

### Utilities

Additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Install Dependencies

Install the necessary app dependencies

```
npm install
```

### Create an Infura Account and Set ENV Variables in the Protocol App

Create an [Infura](https://www.infura.io) account and create an API Key.
You will aslo need to get your MetaMask private key.

Create an `.env` file inside of ` apps/protocol`. and set these two variables:

```
# Infura API key
INFURA_API_KEY=<YOUR_API_KEY>
# Metamask wallet private key - Make sure you use your PRIVATE_KEY here!
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```

### Create a Wagmi Project ID and Set ENV variables in the Web App

Create a [WalletConnect](https://cloud.walletconnect.com/sign-in) account and get the Project ID. It will be on your dashboard. This will be used for your WAGMI_PROJECT_ID.

Then create an `.env` file inside of `apps/web` and add these two variables:

```
VITE_WAGMI_PROJECT_ID=<YOUR_PROJECT_ID>
VITE_INFURA_API_KEY=<YOUR_API_KEY>
```

### Deploy Smart Contract on Linea

Next, from the ROOT directory, run the compile script inside of the Protocol, and then run the `deploy` script.

```
npm run compile
npm run deploy
```

### Generate Contract Functions with Wagmi

Next, from the ROOT directory, run the generate script inside of the Web app. This generates specific read/write functions per contract and offers us proper typing for these functions. It also provides properly named and typed ABIs. These can all be found in the newly created `generated.ts` file in `./apps/web/src`. You can find the WAGMI config file that is used to generate this file at the root of the `/web` app in `wagmi.config.ts`.

```
npm run generate
```

### Lets get building!!!

### Build

To build all apps and packages, run the following command from the root directory:

```
npm run build
```

### Develop

To start developing and testing the applicaiton, run the following command from the root directory:

```
npm run dev
```

### Lint

To run the linter, run the following command from the root directory:

```
npm run lint
```

### Format

To run the fromatter, run the following command from the root directory:

```
npm run format
```

### Additional Tools

[Vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker) and [Vite-plugin-eslint](https://github.com/nabla/vite-plugin-eslint#readme) were also added in to catch any type or linting errors during development. If you've never used them, please take a little time to check them out and see how they can help you as you build out your vite application.
