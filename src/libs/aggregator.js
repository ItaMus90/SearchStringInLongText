class Aggregator{
    constructor() {
        this.map = {};
    }

    print(){
        for (const key in this.map) {
            let len =  this.map[key].length;
            console.log(`[${key}]`)
            for (let i = 0; i < len; i++) {
                console.log(this.map[key][i]);
            }
        }
    }
}

module.exports = Aggregator;