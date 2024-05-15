import { useEffect, useState } from "react";
import { useReadSimpleNftGetLentNfTsByWallet } from "~/generated";
import { useConnection } from "~/providers/ConnectionProvider";

interface NFTsLentOutProps {
  isLoading: boolean;
}

export function NFTsLentOut({ isLoading }: NFTsLentOutProps) {
  const { chainInfo, wallet } = useConnection();
  const [lentNFTs, setLentNFTs] = useState<readonly bigint[]>([]);

  const { data, refetch } = useReadSimpleNftGetLentNfTsByWallet({
    address: chainInfo.contractAddress,
    args: [wallet.address],
  });

  useEffect(() => {
    refetch();
    if (data) {
      setLentNFTs(data);
    }
  }, [data, isLoading, refetch]);

  return (
    <>
      <h2 className="header text-center">Your Lent Out NFTs</h2>
      {lentNFTs && lentNFTs.length > 0 ? (
        <div className="w-full flex items-center flex-wrap">
          {lentNFTs
            .filter((nft: bigint) => nft !== 0n)
            .map((nft) => (
              <div key={nft} className="card-secondary max-w-[180px] text-center opacity-50">
                <h3 className="header">NFT ID</h3>
                <p className="header">{`${nft}`}</p>
              </div>
            ))}
        </div>
      ) : (
        <p>You have not lent out any NFTs yet! Mint some above and then lend them out!</p>
      )}
    </>
  );
}
