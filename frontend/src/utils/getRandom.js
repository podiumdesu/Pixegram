function randomNum(length, num){
    const res = []
    for (let i = 0; i < num;) {
        let rand = Math.floor(Math.random()*(length+1))
        if (res.indexOf(rand) < 0) {
            res.push(rand)
            if (res.length == num) {
                return res
            }
        }
    }
}

export default randomNum