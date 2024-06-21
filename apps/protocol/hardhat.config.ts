import dotenv from "dotenv";
dotenv.config();

import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-viem";
import "@openzeppelin/hardhat-upgrades";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
  },
  paths: {
    artifacts: "../web/src/lib/artifacts",
  },
  defaultNetwork: "linea-sepolia",
  networks: {
    "linea-sepolia": {
      url: `https://linea-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
      chainId: 59141,
    },
    // TODO: add polygon chain to networks
    // mumbai: {
    //   url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
    //   accounts: [process.env.PRIVATE_KEY!],
    //   chainId: 137,
    // },
  },
};

export default config;
