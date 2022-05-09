const compare = (a,b) => {
    return (b.num - a.num)
}

const getHotItemsIdx = (item, number) => {
    const likeAndCol = []
    item.map((i, idx) => {
        if (i.likeNum && i.colNum) {
            likeAndCol.push({
                idx: idx,
                num: i.likeNum + i.colNum
            })
            return
        } else if (i.likeNum) {
            likeAndCol.push({
                idx: idx,
                num: i.likeNum
            })
            return
        } else if (i.colNum) {
            likeAndCol.push({
                idx: idx,
                num: i.colNum
            })
            return
        } else {
            likeAndCol.push({
                idx: idx,
                num: 0
            })
            return
        }
    })
    likeAndCol.sort(compare)
    return likeAndCol.slice(0, number)
}

export default getHotItemsIdx