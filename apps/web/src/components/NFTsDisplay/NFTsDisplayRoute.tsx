import { useState } from "react";
import { zeroAddress } from "viem";
import { useLendNft } from "~/hooks/useLendNFT";
import { useMintNft } from "~/hooks/useMintNFT";
import { useConnection } from "~/providers/ConnectionProvider";
import { NFTsLender } from "./components/NFTsLender";
import { NFTsLentOut } from "./components/NFTsLentOut";
import { NFTsMinter } from "./components/NFTsMinter";
import { NFTsOwned } from "./components/NFTsOwned";

export default function NFTsDisplayRoute() {
  const { chainInfo, wallet } = useConnection();
  const { isConfirming, isPending, isMintingDisabled, mintNFT } = useMintNft();
  const { isConfirming: isLendingConfirming, isPending: isLendingPending, lendNFT } = useLendNft();

  const [selectedTokenId, setSelectedTokenId] = useState<string | undefined>(undefined);

  const isMintingLoading = isPending || isConfirming;
  const isLendingLoading = isLendingConfirming || isLendingPending;
  const isLendingDisabled = isLendingLoading || isMintingLoading;

  if (!wallet.address || wallet.address === zeroAddress) {
    return <h1 className="header">Please connect to your wallet!</h1>;
  }

  return (
    <div>
      {chainInfo.contractAddress ? (
        <>
          <div className="flex flex-wrap justify-center space-x-6">
            <NFTsMinter
              mintNFT={mintNFT}
              isLoading={isMintingLoading}
              isMintingDisabled={isMintingDisabled || isLendingLoading}
            />
            <NFTsLender
              lendNFT={lendNFT}
              isLoading={isLendingLoading}
              isLendingDisabled={isLendingDisabled}
              selectedTokenId={selectedTokenId}
              setSelectedTokenId={setSelectedTokenId}
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="mt-8">
              <NFTsOwned isLoading={isMintingLoading} setSelectedTokenId={setSelectedTokenId} />
            </div>
            <div className="mt-8">
              <NFTsLentOut isLoading={isLendingLoading} />
            </div>
          </div>
        </>
      ) : (
        <div className="text-red-500">
          No NFT Contract has been Deployed or
          <br />
          contract address does not exist in the config for chain:
          <code> {chainInfo.chainId}</code>.
        </div>
      )}
    </div>
  );
}
