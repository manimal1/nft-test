import { useCallback, useEffect, useState } from "react";
import { HiTag } from "react-icons/hi";
import { Address, isAddress, zeroAddress } from "viem";
import { toAddress } from "~/utils";

interface NFTsLenderProps {
  lendNFT: (tokenId: string, borrower: Address) => Promise<void>;
  isLoading: boolean;
  isLendingConfirmed: boolean;
  isLendingDisabled: boolean;
  selectedTokenId?: number | string;
  setSelectedTokenId: (tokenId: string) => void;
}

export function NFTsLender({
  lendNFT,
  isLoading,
  isLendingConfirmed,
  isLendingDisabled,
  selectedTokenId,
  setSelectedTokenId,
}: NFTsLenderProps) {
  const [borrower, setBorrower] = useState("");

  const clearForm = useCallback(() => {
    setSelectedTokenId("");
    setBorrower("");
  }, [setSelectedTokenId]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedTokenId || !isAddress(toAddress(borrower))) {
      return;
    }

    lendNFT(selectedTokenId.toString(), toAddress(borrower));
  }

  useEffect(() => {
    if (isLendingConfirmed) {
      clearForm();
    }
  }, [clearForm, isLendingConfirmed]);

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
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
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
