import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { SimpleNFT$Type } from "./src/lib/artifacts/contracts/SimpleNFT.sol/SimpleNFT";
import { abi } from "./src/lib/artifacts/contracts/SimpleNFT.sol/SimpleNFT.json";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [{ name: "SimpleNFT", abi: abi as SimpleNFT$Type["abi"] }],
  plugins: [react()],
});
