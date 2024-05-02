import { HiTag } from "react-icons/hi";
import { Address, zeroAddress } from "viem";

interface NFTsLenderProps {
  lendNFT: (tokenId: string, borrower: Address) => void;
  isLoading: boolean;
  isLendingDisabled: boolean;
  selectedTokenId?: number | string;
  setSelectedTokenId: (tokenId: string) => void;
}

export function NFTsLender({
  lendNFT,
  isLoading,
  isLendingDisabled,
  selectedTokenId,
  setSelectedTokenId,
}: NFTsLenderProps) {
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedTokenId) {
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const borrower = formData.get("borrower") as Address;
    lendNFT(selectedTokenId.toString(), borrower);
  }

  return (
    <div>
      <div className="card-primary-sm flex flex-col items-center justify-center">
        <h2 className="header">Lend Out NFT</h2>
        <form onSubmit={submit}>
          <label htmlFor="tokenId" className="mr-4">
            tokenId
          </label>
          <input
            name="tokenId"
            placeholder="0"
            value={selectedTokenId}
            onChange={(e) => setSelectedTokenId(e.target.value)}
            required
            className="border border-slate-900 p-1 rounded w-full mb-4"
          />
          <label htmlFor="borrower" className="mr-4">
            borrower
          </label>
          <input
            name="borrower"
            placeholder={`${zeroAddress}`}
            required
            className="border border-slate-900 p-1 rounded w-full mb-4"
          />
          <button disabled={isLendingDisabled} type="submit" className="button w-full">
            <span>{isLoading ? "Confirming..." : "Lend NFT"}</span>
            <HiTag className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
}
