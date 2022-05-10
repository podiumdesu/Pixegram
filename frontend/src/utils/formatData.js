import axios from "axios"

export default async (info) => {
    const {id, currentInfo, timestamp, tokenURI} = info
    const IPFSData = (await axios.get(`https://ipfs.infura.io/ipfs/${tokenURI}`)).data
    const { name, intro, picCover, type } = IPFSData
    const res = {
        id: parseInt(id, 16),
        nftName: name,
        intro: intro,
        type: type,
        picCover: picCover,
        createTime: parseInt(timestamp, 16) * 1000,
        likeNum: parseInt(currentInfo.likeNum, 16),
        colNum: 0,
    }
    return res
}
