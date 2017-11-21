const SHA256 = require('crypto-js/sha256');

export class Block {
  constructor(index, timeStamp, difficulty, data, previousHash ='', nonce='') {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.previousHash = previousHash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.index+this.previousHash+this.timeStamp+this.nonce+JSON.stringify(this.data)).toString();
  }

  mineBlock(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}


export default Block;
