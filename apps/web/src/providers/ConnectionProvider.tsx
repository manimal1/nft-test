import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Address, zeroAddress } from "viem";
import { useAccount, useBalance } from "wagmi";
import config from "~/lib/config.json";
import { toAddress } from "~/utils";

interface Wallet {
  address: Address;
  accounts: any[]; // eslint-disable-line
  balance: string;
  chainId: string;
  isWalletConnecting: boolean;
}

interface ChainInfo {
  blockExplorer: string;
  chainId?: string;
  contractAddress: Address;
  name: string;
  rpcUrl: string;
  symbol: string;
}

interface ConnectionContextValues {
  wallet: Wallet;
  chainInfo: ChainInfo;
}

const disconnectedWalletState: Wallet = {
  accounts: [],
  address: zeroAddress,
  balance: "",
  chainId: "",
  isWalletConnecting: false,
};

const defaultChainInfo: ChainInfo = {
  blockExplorer: "",
  chainId: undefined,
  contractAddress: zeroAddress,
  name: "",
  rpcUrl: "",
  symbol: "",
};

const ConnectionContext = createContext<ConnectionContextValues>({
  chainInfo: defaultChainInfo,
  wallet: disconnectedWalletState,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useConnection() {
  return useContext(ConnectionContext);
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function ConnectionProvider({ children }: LoadingProviderProps) {
  const [wallet, setWallet] = useState(disconnectedWalletState);
  const [chainInfo, setChainInfo] = useState(defaultChainInfo);

  const { address, chainId, isConnecting: isWalletConnecting, isConnected, ...account } = useAccount();
  const balance = useBalance({ address });

  useEffect(() => {
    setWallet({
      accounts: [{ ...account }],
      address: address ?? zeroAddress,
      balance: balance.data?.value.toString() ?? "",
      chainId: chainId?.toString() ?? "",
      isWalletConnecting,
    });
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setWallet((previousWalletState) => ({
      ...previousWalletState,
      isWalletConnecting,
    }));
  }, [isWalletConnecting]);

  useEffect(() => {
    const chainID = chainId?.toString();
    const chainConfig = JSON.parse(JSON.stringify(config));

    if (!chainID || !isChainSupported(chainID, chainConfig)) {
      return;
    }

    setChainInfo({
      blockExplorer: chainConfig[chainID]["blockExplorer"],
      chainId: chainId?.toString() ?? "",
      contractAddress: toAddress(chainConfig[chainID]["contractAddress"]),
      name: chainConfig[chainID]["name"],
      rpcUrl: chainConfig[chainID]["rpcUrl"],
      symbol: chainConfig[chainID]["symbol"],
    });
  }, [chainId]);

  return <ConnectionContext.Provider value={{ chainInfo, wallet }}>{children}</ConnectionContext.Provider>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isChainSupported(chainId: string, config: any): boolean {
  return Object.keys(config).some((key) => key === chainId);
}
