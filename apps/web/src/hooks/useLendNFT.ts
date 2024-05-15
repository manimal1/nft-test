import { Address } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import { useWriteSimpleNftLend } from "~/generated";
import { useConnection } from "~/providers/ConnectionProvider";

export function useLendNft() {
  const { chainInfo } = useConnection();

  const { data: contractHash, error: contractError, isPending, writeContract } = useWriteSimpleNftLend();

  const lendNFT = async (tokenId: string, borrower: Address) => {
    try {
      writeContract({
        address: chainInfo.contractAddress,
        args: [BigInt(tokenId), borrower],
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
