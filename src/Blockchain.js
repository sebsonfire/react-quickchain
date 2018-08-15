import React from 'react';
import Block from './block.js';
import BlockInput from './BlockInput';
import User from './user.js';
import UserInput from './UserInput';

const cryptico = require('cryptico');

let blockchain = [];
let users = [];

export class BlockChain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      blockchain: blockchain,
      users: users,
      valid: ""
    }

    this.handleAddBlock = this.handleAddBlock.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleClickValidate = this.handleClickValidate.bind(this);
  }

  handleAddBlock(block) {
    let index = this.state.blockchain.length + 1;
    let timeStamp = new Date().toString();
    let difficulty = block.difficulty === null ? 0 : block.difficulty;
    let previousHash = this.state.blockchain.length < 1 ? 0 : this.state.blockchain[this.state.blockchain.length-1].hash;
    let newBlock = new Block(index, timeStamp, difficulty, block.data, previousHash);
    newBlock.mineBlock(block.difficulty);
    console.log(newBlock.hash);
    this.setState({
      blockchain: [...this.state.blockchain, newBlock],
      valid: ""});
  }

  handleAddUser(userInput) {
    let passPhrase = userInput.passPhrase;
    let userName = userInput.userName;
    let bits = 1024;
    let userRsaKey = cryptico.generateRSAKey(userName + passPhrase, bits);
    let index = this.state.users.length + 1;
    let newUser = new User(userName, passPhrase, index, userRsaKey);
    this.setState({
      users: [...this.state.users, newUser]});
  }

  handleClickValidate(e) {
    e.preventDefault();
    this.isChainValid();
  }

  isChainValid() {
    for(let i=1; i<this.state.blockchain.length; i++) {
      const currentBlock = this.state.blockchain[i];
      const previousBlock = this.state.blockchain[i-1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return this.setState({
          valid: false
        })
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
         return this.setState({
          valid: false
        })
      }
    }
    return this.setState({
      valid: true
    })
  }

  setBorder() {
    if(this.state.valid === true) {
      return 'valid'
    }
    else if(this.state.valid === false) {
      return 'invalid'
    }
    else{
      return ""
    }
  }

  render() {
    return (
      <div ref='container' className='text-center'>
        <UserInput onAddUser={this.handleAddUser}/>
        <div className={this.state.users.length < 1 ? "" : 'user-chain'}>
          {this.state.users.map((user, index) =>
            <div className='user' key={index}>
              <div>User: {user.userName}</div>
              <div>Public Key: <i>{user.publicKey}</i></div>
            </div>
            )}
        </div>
          <BlockInput onAddBlock={this.handleAddBlock} blockchainLength={this.state.blockchain.length}/>
        <div className={(this.state.blockchain.length < 1 ? "" : 'blockchain ')+(this.setBorder())}>
          {this.state.blockchain.map((block, index) =>
            <div className='block' key={index}>
              <div><p><strong>Block #{block.index}</strong></p></div>
              <div><p>Timestamp: {block.timeStamp}</p></div>
              <div><p>Difficulty: {block.difficulty}</p></div>
              <div><p>Data: {block.data}</p></div>
              <div><p>Previous Hash: <i>{block.previousHash}</i></p></div>
              <div><p>Hash: <i>{block.hash}</i></p></div>
              <div><p>Nonce: <i>{block.nonce}</i></p></div>
            </div>
          )}
        </div>
        {this.state.blockchain.length < 1 ? null : <div><button onClick={this.handleClickValidate} className="btn">Check Validity</button></div>}
      </div>
    )
  }
}

export default BlockChain;
