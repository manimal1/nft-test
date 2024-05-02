import { useEffect, useState } from "react";
import { abi } from "../../../lib/artifacts/contracts/SimpleNFT.sol/SimpleNFT.json";

import { useReadContract } from "wagmi";
import { useConnection } from "~/providers/ConnectionProvider";

interface NFTsOwnedProps {
  isLoading: boolean;
  setSelectedTokenId: (tokenId: string) => void;
}

export function NFTsOwned({ isLoading, setSelectedTokenId }: NFTsOwnedProps) {
  const { chainInfo, wallet } = useConnection();
  const [ownedNFTs, setOwnedNFTs] = useState<number[]>([]);

  const { data, refetch } = useReadContract({
    address: chainInfo.contractAddress,
    abi,
    functionName: "getNFTsByWallet",
    args: [wallet.address],
  });

  useEffect(() => {
    refetch();
    setOwnedNFTs(data as unknown as number[]);
  }, [data, isLoading, refetch]);

  return (
    <>
      <h2 className="header text-center">Your NFTs</h2>
      {ownedNFTs && ownedNFTs.length > 0 ? (
        <ul className="w-full flex items-center flex-wrap">
          {ownedNFTs.map((nft: number) => (
            <button
              key={nft}
              className="card-secondary max-w-[180px] text-center"
              onClick={() => setSelectedTokenId(nft.toString())}
            >
              <h3 className="header">NFT ID</h3>
              <p className="header">{`${nft}`}</p>
            </button>
          ))}
        </ul>
      ) : (
        <p>You do not own any NFTs yet! Mint some above and see them here!</p>
      )}
    </>
  );
}
