const cryptico = require('cryptico');


export class User {
  constructor(userName, passPhrase, index, rsaKey) {
    this.userName = userName;
    this.passPhrase = passPhrase;
    this.index = index;
    this.rsaKey = rsaKey;
    this.publicKey = this.calculatePublicKey();
  }

  calculatePublicKey(){
    console.log(this.rsaKey);
    return cryptico.publicKeyString(this.rsaKey)
  }

}

export default User;
