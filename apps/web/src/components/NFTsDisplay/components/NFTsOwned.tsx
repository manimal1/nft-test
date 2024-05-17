import { useEffect, useState } from "react";
import { useReadSimpleNftGetNfTsByWallet } from "~/generated";
import { useConnection } from "~/providers/ConnectionProvider";

interface NFTsOwnedProps {
  isLoading: boolean;
  setSelectedTokenId: (tokenId: string) => void;
}

export function NFTsOwned({ isLoading, setSelectedTokenId }: NFTsOwnedProps) {
  const { chainInfo, wallet } = useConnection();
  const [ownedNFTs, setOwnedNFTs] = useState<readonly bigint[]>([]);

  const { data, refetch } = useReadSimpleNftGetNfTsByWallet({
    address: chainInfo.contractAddress,
    args: [wallet.address],
  });

  useEffect(() => {
    refetch();
    if (data) {
      setOwnedNFTs(data);
    }
  }, [data, isLoading, refetch]);

  return (
    <>
      <h2 className="header text-center">Your NFTs</h2>
      {ownedNFTs && ownedNFTs.length > 0 ? (
        <ul className="w-full flex items-center justify-center flex-wrap">
          {ownedNFTs.map((nft: bigint) => (
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
