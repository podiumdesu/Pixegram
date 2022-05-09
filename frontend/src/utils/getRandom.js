function randomNum(length, num){
    const res = []
    for (let i = 0; i < num;) {
        let rand = parseInt(Math.random()*length,10)
        if (res.indexOf(rand) < 0) {
            res.push(rand)
            if (res.length == num) {
                return res
            }
        }
    }
}

export default randomNum