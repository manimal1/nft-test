import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SimpleNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const simpleNftAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'lender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'borrower',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Borrowed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'lender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'borrower',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Lent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Minted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getLender',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_wallet', internalType: 'address', type: 'address' }],
    name: 'getLentNFTsByWallet',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_wallet', internalType: 'address', type: 'address' }],
    name: 'getNFTsByWallet',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'isBorrowed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'borrower', internalType: 'address', type: 'address' },
    ],
    name: 'lend',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__
 */
export const useReadSimpleNft = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadSimpleNftBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadSimpleNftGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"getLender"`
 */
export const useReadSimpleNftGetLender = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'getLender',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"getLentNFTsByWallet"`
 */
export const useReadSimpleNftGetLentNfTsByWallet =
  /*#__PURE__*/ createUseReadContract({
    abi: simpleNftAbi,
    functionName: 'getLentNFTsByWallet',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"getNFTsByWallet"`
 */
export const useReadSimpleNftGetNfTsByWallet =
  /*#__PURE__*/ createUseReadContract({
    abi: simpleNftAbi,
    functionName: 'getNFTsByWallet',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"getOwner"`
 */
export const useReadSimpleNftGetOwner = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'getOwner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadSimpleNftIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: simpleNftAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"isBorrowed"`
 */
export const useReadSimpleNftIsBorrowed = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'isBorrowed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"name"`
 */
export const useReadSimpleNftName = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"owner"`
 */
export const useReadSimpleNftOwner = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadSimpleNftOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadSimpleNftSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: simpleNftAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadSimpleNftSymbol = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadSimpleNftTokenByIndex = /*#__PURE__*/ createUseReadContract(
  { abi: simpleNftAbi, functionName: 'tokenByIndex' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadSimpleNftTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: simpleNftAbi,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadSimpleNftTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadSimpleNftTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: simpleNftAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__
 */
export const useWriteSimpleNft = /*#__PURE__*/ createUseWriteContract({
  abi: simpleNftAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteSimpleNftApprove = /*#__PURE__*/ createUseWriteContract({
  abi: simpleNftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"borrow"`
 */
export const useWriteSimpleNftBorrow = /*#__PURE__*/ createUseWriteContract({
  abi: simpleNftAbi,
  functionName: 'borrow',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"lend"`
 */
export const useWriteSimpleNftLend = /*#__PURE__*/ createUseWriteContract({
  abi: simpleNftAbi,
  functionName: 'lend',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteSimpleNftMint = /*#__PURE__*/ createUseWriteContract({
  abi: simpleNftAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteSimpleNftRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleNftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteSimpleNftSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteSimpleNftSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteSimpleNftTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteSimpleNftTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleNftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__
 */
export const useSimulateSimpleNft = /*#__PURE__*/ createUseSimulateContract({
  abi: simpleNftAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateSimpleNftApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleNftAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"borrow"`
 */
export const useSimulateSimpleNftBorrow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleNftAbi,
    functionName: 'borrow',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"lend"`
 */
export const useSimulateSimpleNftLend = /*#__PURE__*/ createUseSimulateContract(
  { abi: simpleNftAbi, functionName: 'lend' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateSimpleNftMint = /*#__PURE__*/ createUseSimulateContract(
  { abi: simpleNftAbi, functionName: 'mint' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateSimpleNftRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleNftAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateSimpleNftSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleNftAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateSimpleNftSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleNftAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateSimpleNftTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleNftAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateSimpleNftTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleNftAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleNftAbi}__
 */
export const useWatchSimpleNftEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: simpleNftAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleNftAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchSimpleNftApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleNftAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchSimpleNftApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleNftAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleNftAbi}__ and `eventName` set to `"Borrowed"`
 */
export const useWatchSimpleNftBorrowedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleNftAbi,
    eventName: 'Borrowed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleNftAbi}__ and `eventName` set to `"Lent"`
 */
export const useWatchSimpleNftLentEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleNftAbi,
    eventName: 'Lent',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleNftAbi}__ and `eventName` set to `"Minted"`
 */
export const useWatchSimpleNftMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleNftAbi,
    eventName: 'Minted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchSimpleNftOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleNftAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleNftAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchSimpleNftTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleNftAbi,
    eventName: 'Transfer',
  })
