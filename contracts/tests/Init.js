const { expect } = require("chai")

describe("Pixegram contract", () => {
    let Pixegram
    let PixegramContract
    let owner
    let addr1
    let addr2
    const testURL = "http://ipfs.io/testurl"

    beforeEach(async () => {
        Pixegram = await ethers.getContractFactory("Pixegram")
        const signers = await ethers.getSigners()
        owner = signers[0]
        addr1 = signers[1]
        addr2 = signers[2]
        PixegramContract = await Pixegram.deploy()
    })

    describe("Init", () => {
        it("Total number of nfts should increment after initialization", async () => {
            await PixegramContract.initNft(testURL)
            await PixegramContract.initNft(testURL)
            expect(await PixegramContract.getItemNum()).to.equal(2)
        })

        it("Check the bind of address and tokenURI", async() => {
            await PixegramContract.initNft(testURL)
            const ownerAdd = await PixegramContract.ownerOf(1)
            expect(ownerAdd).to.equal(owner.address)
            const tokenURI = await PixegramContract.tokenURI(1)
            expect(tokenURI).to.equal(testURL)
        })

        it("Check the balance of the owner after initialization", async () => {
            await PixegramContract.initNft(testURL)
            await PixegramContract.initNft(testURL)
            await PixegramContract.initNft(testURL)
            const balance = await PixegramContract.balanceOf(owner.address)
            expect(balance).to.equal(3)
        })
        
        it("Should not on the market", async () => {
            await PixegramContract.initNft(testURL)
            expect(
                (await PixegramContract.getTargetInfo(1)).currentInfo.onSale
            ).to.equal(false)
        })
    })

    describe("Check `getTargetInfo`", async () => {
        it("Check tokenId and tokenURI", async () => {
            await PixegramContract.initNft(testURL)
            expect((await PixegramContract.getTargetInfo(1)).id).to.equal(1)
            expect((await PixegramContract.getTargetInfo(1)).tokenURI).to.equal(testURL)
        })
        it("Check timestamp", async () => {
            await PixegramContract.initNft(testURL)
            const tsp = (await PixegramContract.getTargetInfo(1)).timestamp
            expect(parseInt(tsp)).to.greaterThan(0)
        })
        it("Check owner", async () => {
            await PixegramContract.initNft(testURL)
            expect((await PixegramContract.getTargetInfo(1)).owner).to.equal(owner.address)
        })
        it("Check number of likes", async () => {
            await PixegramContract.initNft(testURL)
            expect((await PixegramContract.getTargetInfo(1)).currentInfo.likeNum).to.equal(0)
        })
        it("Check price", async () => {
            await PixegramContract.initNft(testURL)
            expect((await PixegramContract.getTargetInfo(1)).currentInfo.price).to.equal(0)
        })
    })

    describe("Check `getAllInfo`", async () => {
        it("Check total number of nfts", async () => {
            await PixegramContract.initNft(testURL)
            await PixegramContract.initNft(testURL)
            const allNfts = await PixegramContract.getAllInfo()
            expect(allNfts.length).to.equal(2)
        })
    })

    describe("Like nfts", async () => {
        it("Total number of likes should increase after request", async () => {
            await PixegramContract.initNft(testURL)
            await PixegramContract.initNft(testURL)
            await PixegramContract.likePem(1)
            const likeNum1 = (await PixegramContract.getTargetInfo(1)).currentInfo.likeNum
            const likeNum2 = (await PixegramContract.getTargetInfo(2)).currentInfo.likeNum
            expect(likeNum1).to.equal(1)
            expect(likeNum2).to.equal(0)
        })
    })

    describe("Market things", async () => {
        it("`Hit the market` Should fail if sender is not the owner", async () => {
            await PixegramContract.initNft(testURL)
            await expect(
                PixegramContract.connect(addr1).hitTheStore(1, 30)
            ).to.be.revertedWith("WHO ARE YOU")
        })
        it("Should on the market", async() => {
            await PixegramContract.initNft(testURL)
            await PixegramContract.hitTheStore(1, 30)
            expect(
                (await PixegramContract.getTargetInfo(1)).currentInfo.onSale
            ).to.equal(true)
        })
        it("Should fail if already on the market", async () => {
            await PixegramContract.initNft(testURL)
            await PixegramContract.hitTheStore(1, 30)

            await expect(
                PixegramContract.hitTheStore(1, 30)
            ).to.be.revertedWith("Already on the market")
        })

        it("`Take down nft` Should fail if sender is not the owner", async() => {
            await PixegramContract.initNft(testURL)
            await expect(
                PixegramContract.connect(addr1).takeDown(1)
            ).to.be.revertedWith("WHO ARE YOU") 
        })
        it("Should have a price & on the market", async () => {
            await PixegramContract.initNft(testURL)
            await PixegramContract.hitTheStore(1, 30)
            const newInfo = await PixegramContract.getTargetInfo(1)
            expect(newInfo.currentInfo.price).to.equal(30)
            expect(newInfo.currentInfo.onSale).to.equal(true)
        })

    })

    describe("Transaction", async () => {
 
    })
})