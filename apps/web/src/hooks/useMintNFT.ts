import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useConnection } from "~/providers/ConnectionProvider";
import { abi } from "../lib/artifacts/contracts/SimpleNFT.sol/SimpleNFT.json";

export function useMintNft() {
  const { chainInfo, wallet } = useConnection();

  const { data: contractHash, isPending, writeContract, error: contractError } = useWriteContract();

  const mintNFT = async () => {
    try {
      writeContract({
        address: chainInfo.contractAddress,
        abi,
        functionName: "mint",
        args: [wallet.address],
      });
    } catch (error) {
      console.error("Error minting NFT:", error, contractError);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: contractHash,
  });

  const isMintingDisabled = !wallet.address || isPending || isConfirming;

  return {
    contractHash,
    isPending,
    mintNFT,
    isConfirming,
    isConfirmed,
    isMintingDisabled,
  };
}
