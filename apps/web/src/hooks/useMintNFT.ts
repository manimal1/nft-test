import { useWaitForTransactionReceipt } from "wagmi";
import { useWriteSimpleNftMint } from "~/generated";
import { useConnection } from "~/providers/ConnectionProvider";

export function useMintNft() {
  const { chainInfo, wallet } = useConnection();

  const { data: contractHash, isPending, writeContract, error: contractError } = useWriteSimpleNftMint();

  const mintNFT = async () => {
    try {
      writeContract({
        address: chainInfo.contractAddress,
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
