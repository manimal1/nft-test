import { Address } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useConnection } from "~/providers/ConnectionProvider";
import { abi } from "../lib/artifacts/contracts/SimpleNFT.sol/SimpleNFT.json";

export function useLendNft() {
  const { chainInfo } = useConnection();

  const { data: contractHash, error: contractError, isPending, writeContract } = useWriteContract();

  const lendNFT = async (tokenId: string, borrower: Address) => {
    try {
      writeContract({
        address: chainInfo.contractAddress,
        abi,
        functionName: "lend",
        args: [Number(tokenId), borrower],
      });
    } catch (error) {
      console.error("Error lending out NFT:", error, contractError);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: contractHash,
  });

  return {
    contractHash,
    isConfirming,
    isConfirmed,
    isPending,
    lendNFT,
  };
}
