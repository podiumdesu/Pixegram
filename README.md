# Pixegram - MSBD5017 Blockchain Group Project

Pixegram aims to create an educational platform that simulates a typical NFT marketplace, such as OpenSea. However, rather than trading real NFTs on the platform, everything would be self-contained. This means that even the tradeable NFTs would be created within the platform. 

![ezgif.com-gif-maker](https://tva1.sinaimg.cn/large/e6c9d24egy1h24rpfpuqlg20go0auttn.gif)

Our group is composed by:

* Isaac Chap:  Architectural design, business vision, general market capitalization, and partial Smart Contracts Engineering.
* Wang Weihong:  Technology lead, Website design, Front-end and Smart Contracts Engineering.

## Goal of Pixegram

An introduction to NFT trading can be seen as an introduction to wall street trading. As blockchain technology has been advancing, people are realizing the potential of such a tool. This comes with the security as well as the volatility of blockchain technology, similar to wall street bets. Therefore, fundamentals in both financial and technical analysis are pivotal to success in stock trading.

> Pixegram brings the opportunity to pursue virtual success in a safe space. 💐

## Getting Started

The smart contract has been deployed on the `EtherData` chain. The address is `0x042511E2be3842697Cfc00b7DbbdF98C9e552511`.

Click [here](https://github.com/etherdata-blockchain) to know more about the fancy Etherchain. 


### Prepare your wallet

You have to set up crypto-wallets on the EtherData network. Recommend to use `Metamask` which is a chrome extension. You can add a new network in MetaMask with the following settings.

* Network Name: etd testnet
* New RPC URL: https://rpc.debugchain.net
* Chain ID: 8348

Then click the [faucet](https://faucet.debugchain.net/) for some ETD tokens.

### Run Frontend

Firstly you need to clone this repo.

```bash
$ git clone <repo name>
$ cd <repo name>
$ cd frontend
```

Then we are going to install all the modules we need.

```bash
$ npm install
```

To start our website,

```bash
$ npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) to explore our project. 

**⚠️ Important notes:**

When you run the website for the first time, you need to link to your wallet. 

![image-20220511222957132](https://tva1.sinaimg.cn/large/e6c9d24egy1h24u4m455jj207602sa9w.jpg)

Hope you like it. If you have any problems with our Pixegram, directly propose an issue or email me. I will always be here waiting for you.

## Router

* `/` (index page): show the whole market
  * Market Sales
  * Popular Trends
* `/draw` : Draw the pixel paintings online

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h24w4oyq0wg20go0autay.gif" alt="ezgif.com-gif-maker (3)" />

* `/mint ` : Upload the art. Name the token, give some introduction and upload all the metadata on the IPFS.

![ezgif.com-gif-maker (5)](https://tva1.sinaimg.cn/large/e6c9d24egy1h2564cpq2lg20go0auq4j.gif)

* `/detail/[id]`: Show the detailed information of the tokens.

![ezgif.com-gif-maker (4)](https://tva1.sinaimg.cn/large/e6c9d24egy1h24w7adkwbg20go0augtf.gif)

* `/search`: Market. (not finished with searching)

![ezgif.com-gif-maker (6)](https://tva1.sinaimg.cn/large/e6c9d24egy1h2565wtqelg20go0aun8p.gif)

* `/profile`: Show your profile, and everything in your wallet(not finished)

## File exploration

In this repository, you can find two different folders:

* `/frontend`
  * `/src`
    * `App.jsx`: index page
    * `/router`: router components
    * `/components`: some React components
    * `/layout`: layout components
    * `/contracts`: contract address
    * `/abi`: contract abi
    * `/utils`: utility functions
* `/contracts`
  * `/contracts`
    * `Init.sol` : everything about ERC721 token
    * `ERC20Token.sol`: everything about ERC20 token
  * `/tests`
    * `Init.js`: test file for `Init.sol`

## Smart Contract Testing

We use Hardhat to test our sweety Pixegram contracts.

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h256gf7p3zj20y40u0425.jpg" alt="image-20220512053629455" style="zoom:40%;" />

## Acknowledgments

Our pixel painter is forked from [`pixel-art-drawing-editor`](https://github.com/alekspopovic/pixel-art-drawing-editor) written by alekspopovic. Thanks a lot. And I do some modifications to support continuous painting when clicking the left key of the mouse and holding on.

## Future plan

It is a totally huge project if we want to make every detail perfect. We have so many assignments and projects at the end of the semester. We will improve our project in the future since we really like this idea.

There are far more things we need to finish. We have already completed some functions in our smart contract, for example, ERC20 token, pricing the NFTs, transferring the tokens, and liking the NFTs. But unfortunately, we don't have enough time to implement everything on the website. Users can't easily interact with these functionalities.  And one of the most interesting things is the "daily lottery", I know how to write, but just no time.

Website:

* ERC20 token thing
* Transfer tokens
* Price the NFT
* Collect the NFTs
* Personal profile
* Daily Lottery
  * Request a random number from the chain
  * According to the number, give the user different levels of awards
  * Picture dragger

Smart Contract:

* Daily Lottery
  * need the oracle for generating random numbers

Also, we need a backend with a database, in order to record all the on-chain data and transaction history. And we need to solve the IPFS requesting problem through local caching. 

## CONTACT US

Issac: ifchap@connect.ust.hk 

Weihong: wwangcm@connect.ust.hk
