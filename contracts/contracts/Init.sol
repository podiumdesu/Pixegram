// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// init the nft tokens
// using the erc721 contract

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


// TOTALLY NEED TO REFACTOR
contract Pixegram is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Pixegram", "PEM") {}
    
    event Init(address owner, uint256 tokenId, string tokenURI);
    
    modifier onlyNftOwner(uint256 tokenId) {
        address nftOwner = ownerOf(tokenId);
        require(msg.sender == nftOwner, "WHO ARE YOU");
        _;
    }

    struct PemInfo {
        uint id;
        uint likeNum;
        uint price;
        // should put the transaction off-chain
        bool onSale;
    }

    struct TxHistory {
        address from_addr;
        address to_addr;
        uint tsp;
        uint price;
    }
    struct totalInfo {
        uint256 id;
        string tokenURI;
        uint256 timestamp;
        address owner;
        PemInfo currentInfo;
    }
    PemInfo[] public PemInfoArray;

    mapping (uint => uint) public createTimeArr;

    // for some query
    function getItemNum() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getTargetInfo(uint256 tokenId) public view returns (totalInfo memory) {
        return totalInfo(
            tokenId,
            tokenURI(tokenId),
            createTimeArr[tokenId],
            ownerOf(tokenId),
            PemInfoArray[tokenId-1]
        );
    }
    // should write in the backend
    function getAllInfo() public view returns (totalInfo[] memory) {
        uint256 currentNum = _tokenIds.current();
        totalInfo[] memory result = new totalInfo[](currentNum);

        for (uint256 i = 0; i < currentNum; i++) {
            uint256 id = i + 1;
            result[i] = totalInfo(
                id,
                tokenURI(id),
                createTimeArr[id],
                ownerOf(id),
                PemInfoArray[i]
            );
        }
        return result;
    }

    // vote for your favorite NFT
    function likePem(uint256 tokenId) public returns (uint256) {
        uint256 idx = tokenId - 1;
        PemInfoArray[idx].likeNum++;
        return PemInfoArray[idx].likeNum;
    }

    // put your nfts on the market
    function hitTheStore(uint256 tokenId, uint256 price) onlyNftOwner(tokenId)
        public returns (bool) {
        uint256 idx = tokenId - 1;
        bool signal = PemInfoArray[idx].onSale;
        require(signal == false, "Already on the market");
        PemInfoArray[idx].price = price;
        PemInfoArray[idx].onSale = true;
        return true;
    }

    function takeDown(uint256 tokenId) onlyNftOwner(tokenId) 
        public returns (bool) {
        uint256 idx = tokenId - 1;
        bool signal = PemInfoArray[idx].onSale;
        require(signal == true, "Already not on the market");
        PemInfoArray[idx].onSale = false;
        return true;
    }

    function transfer(uint256 tokenId, address to) onlyNftOwner(tokenId) 
        public returns (bool) {
        safeTransferFrom(msg.sender, to, tokenId);
        return true;
    }

    function initNft(string memory tokenURI) public returns (uint256) {
        uint256 id = awardItem(msg.sender, tokenURI);
        emit Init(msg.sender, id, tokenURI);
        return id;
    }

    function awardItem(address player, string memory tokenURI)
        private
        returns (uint256)
    {

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        PemInfoArray.push(PemInfo(newItemId, 0, 0, false));

        // use new Date(timestamp * 1000) to convert it
        createTimeArr[newItemId] = block.timestamp;

        return newItemId;
    }



}




