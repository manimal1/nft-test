// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract SimpleNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    address _owner;

    mapping(uint256 => address) private _tokenLender;
    mapping(uint256 => address) private _tokenBorrower;
    mapping(uint256 => bool) private _isBorrowed;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
      _owner = msg.sender;
    }

    function mint(address to) external returns (uint256) {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(to, newTokenId);
        emit Minted(newTokenId, to);
        return newTokenId;
    }

    function lend(uint256 tokenId, address borrower) external {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the token owner");
        require(!_isBorrowed[tokenId], "Token is already borrowed");

        _tokenLender[tokenId] = msg.sender;
        _tokenBorrower[tokenId] = borrower;
        _isBorrowed[tokenId] = true;
        // safeTransferFrom(msg.sender, borrower, tokenId);
        emit Lent(tokenId, msg.sender, borrower);
    }

    function borrow(uint256 tokenId) external {
        require(_exists(tokenId), "Token does not exist");
        require(_isBorrowed[tokenId], "Token is not borrowed");

        address lender = _tokenLender[tokenId];
        require(lender != address(0), "Lender address is invalid");

        safeTransferFrom(lender, msg.sender, tokenId);
        _tokenLender[tokenId] = address(0);
        _isBorrowed[tokenId] = false;
        emit Borrowed(tokenId, lender, msg.sender);
    }

    /**
     * @dev Returns the tokens owned by a given wallet.
     * @param _wallet The wallet to get the tokens of. NEEDS ENUMERABLE
     */
    function getNFTsByWallet(
        address _wallet
    ) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_wallet);
        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_wallet, i);
        }
        return tokensId;
    }

    /**
     * @dev Returns the tokens owned and that are being lent by a given wallet.
     * @param _wallet The wallet address of the user who owns the lent tokens.
     */
    function getLentNFTsByWallet(address _wallet) public view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_wallet);
    uint256[] memory lentTokensId = new uint256[](tokenCount);
    uint256 lentCount = 0;

    for (uint256 i = 0; i < tokenCount; i++) {
        uint256 tokenId = tokenOfOwnerByIndex(_wallet, i);
        if (_isBorrowed[tokenId]) {
            lentTokensId[lentCount] = tokenId;
            lentCount++;
        }
    }
    return lentTokensId;
}

    function getOwner(uint256 tokenId) external view returns (address) {
        return ownerOf(tokenId);
    }

    function isBorrowed(uint256 tokenId) external view returns (bool) {
        return _isBorrowed[tokenId];
    }

    function getLender(uint256 tokenId) external view returns (address) {
        return _tokenLender[tokenId];
    }

    event Minted(uint256 tokenId, address owner);
    event Lent(uint256 tokenId, address lender, address borrower);
    event Borrowed(uint256 tokenId, address lender, address borrower);
}
