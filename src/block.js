const SHA256 = require('crypto-js/sha256');

export class Block {
  constructor(index, timeStamp, data, previousHash ='') {
    this.index = index;
    this.timeStamp = timeStamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.index+this.previousHash+this.timeStamp+JSON.stringify(this.data)).toString();
  }
}


export default Block;
