// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

// THIS IS OUR ERC20 TOKEN!
// PIXEGRAM THE BEST!

// The code runs well in Rinkeby testnet, but dont deploy on the Etherdata.
// We will do it in the future.

library customLib {
    // Use this lib to handle refund
    address constant owner = 0x8ec42d4D2CbAd10FfD90Ef8033AadFf3d25fbafB;

    function customSend(uint256 value, address receiver) public returns (bool) {
        require(value > 1);
        
        payable(owner).transfer(1);
        
        (bool success,) = payable(receiver).call{value: value-1}("");
        return success;
    }
}
contract MyToken {
    // 1 token for 1 wei
    uint256 public tokenPrice = 1;

    // deployed library contract address
    address libContractAddr = 0xc0b843678E1E73c090De725Ee1Af6a9F728E2C47;
    // CustomLib customLib = CustomLib(libContractAddr);

    // definition
    bytes32 public name = "Pixegram";
    bytes32 public symbol = "PEM";
    address private owner;
    uint256 private totalSupply = 1000000;
    uint256 private priceFlag = 0;
    uint256 private circulation = 0;
    mapping(address => uint256) private balances;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = 10000;
    }

    event Purchase(address buyer, uint256 amount);
    event Transfer(address sender, address receiver, uint256 amount);
    event Sell(address seller, uint256 amount);
    event Price(uint256 price);

    function buyToken(uint256 amount) public payable returns (bool) {
        // a user purchase amount number of tokens by paying price in wei.
        // purchase is successful, return true 
        // Emit Purchase(msg.sender, amount)

        require(msg.value > amount * tokenPrice, "Please pay enough money to buy the token :(");
        // calculate the refund
        uint256 refund = msg.value - tokenPrice * amount;
        balances[msg.sender] += amount;
        // Add the market circulation
        circulation += amount;
        // When the token is sold, change the flag for price change to true.
        priceFlag = 1;

        if (refund == 0) {
            emit Purchase(msg.sender, amount);
            return true;
        }
        bool success = customLib.customSend(refund, msg.sender);

        if (success) {
            emit Purchase(msg.sender, amount);
            return true;
        } else {
            return false;
        }
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        // transfer amount number of tokens from sender to recipient.
        // transfer is successful, return true
        // Emit Transfer(msg.sender, recipient, amount)

        require(balances[msg.sender] >= amount, "Not enough tokens. Plz buy some firstly.");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function sellToken(uint256 amount) public returns (bool) {
        // sell amount number of token and receive current price.
        // sold token are destroyed, and return true
        // Emit sell(msg.sender, amount)

        require(balances[msg.sender] >= amount, "Wow, check your balance :)");

        balances[msg.sender] -= amount;
        circulation -= amount;
        
        // call the library
        bool success = customLib.customSend(amount * tokenPrice, msg.sender);

        if (success) {
            emit Sell(msg.sender, amount);
            return true;
        } else {
            return false;
        }
    }

    function changePrice(uint256 price) public {
        // only the creator can change the tokenPrice.
        require(msg.sender == owner, "who are you?");
        require(priceFlag == 1, "Too high, no one will buy! ");
        require(price == (2 * tokenPrice), "Double! Double! Double!");
        tokenPrice = price;
    }

    function getBalance() public view returns (uint) {
        // return the amount of tokens that the user owns
        return balances[msg.sender];
    }
}

