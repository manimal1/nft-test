import * as fs from "fs/promises";
import hre, { ethers } from "hardhat";
import path from "path";

async function main() {
  // const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");

  console.log("Deploying SimpleNFT...");

  // make sure to pass the expected contract args on deploy
  // const simpleNFT = await SimpleNFT.deploy("MyNFT", "NFT");
  const marketplace = await NFTMarketplace.deploy();
  // await simpleNFT.waitForDeployment();
  await marketplace.waitForDeployment();

  // const contractAddress = await simpleNFT.getAddress();
  const contractAddress = await marketplace.getAddress();

  console.log("NFTMarketplace deployed to:", contractAddress);

  // get the network chain id in order to set it to the FE config props
  const chainId = (await hre.network.config.chainId?.toString()) ?? "undefined";
  // get filepath of the config file
  const filePath = path.join(__dirname, "../../web/src/lib/config.json");
  // get the config
  const configFile = await fs.readFile(filePath, "utf-8");
  const config = JSON.parse(configFile);
  // add the contract address to the config
  config[chainId].contractAddress = contractAddress;
  // write config JSON to file
  await fs.writeFile(filePath, JSON.stringify(config, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
