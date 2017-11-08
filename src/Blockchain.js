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
      valid: "",
      difficulty: null
    }

    this.handleAddBlock = this.handleAddBlock.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickValidate = this.handleClickValidate.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
  }

  handleAddBlock(block) {
    let index = this.state.blockchain.length + 1;
    let timeStamp = new Date().toString();
    let previousHash = this.state.blockchain[this.state.blockchain.length-1].hash;
    let newBlock = new Block(index, timeStamp, block.data, previousHash);
    newBlock.mineBlock(this.state.difficulty);
    console.log(newBlock.hash);
    this.setState({
      blockchain: [...this.state.blockchain, newBlock]});
  }

  handleAddUser(user) {
    let passPhrase = user.passPhrase;
    let bits = 1024;
    let userRsaKey = cryptico.generateRSAKey(passPhrase, bits);
    let index = this.state.users.length + 1;
    let newUser = new User(index, userRsaKey);
    this.setState({
      users: [...this.state.users, newUser]});
  }

  handleSubmit(e) {
    e.preventDefault();
    let timeStamp = new Date().toString();
    let genesisBlock = new Block(1, timeStamp, "Genesis block", "0","0");
    genesisBlock.mineBlock(this.state.difficulty);
    this.setState({
      blockchain: [...this.state.blockchain, genesisBlock]
    });
  }

  handleClickValidate(e) {
    e.preventDefault();
    this.isChainValid();
  }

  handleDifficultyChange(e) {
    e.preventDefault();
    let target = e.target;
    let value = parseInt(target.value, 10);
    value = isNaN(value) ? null : value;
    this.setState({
      difficulty: value
    })
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



  render() {
    return (
      <div className='text-center'>
      <h2>QuickChain</h2>
      <UserInput onAddUser={this.handleAddUser}/>
      <div>
        {this.state.users.map((user, index) =>
          <div className='user' key={index}>
            <div><p>User #{user.index}</p></div>
            <div><p>Public Key: <i>{user.publicKey}</i></p></div>

          </div>
          )}
      </div>
      <div className='difficulty-form'>
        <label htmlFor="inputBlockData">Add New Block</label>
          <div>
            <input name="difficulty"
               type="text"
               id="inputBlockDifficulty"
               value={this.state.difficulty}
               onChange={this.handleDifficultyChange}
               placeholder="Set Blockchain Difficulty">
            </input>
          </div>
      </div>
        {this.state.blockchain.length < 1 ? null : <BlockInput onAddBlock={this.handleAddBlock}/>}
      {this.state.blockchain.length < 1 ?
        <div>
          <form onSubmit={this.handleSubmit}>
            <button type="submit" className="btn">Create Genesis Block</button>
          </form>
        </div>
        : null
      }
        <div className={this.state.blockchain.length < 1 ? "" : 'blockchain'}>
          {this.state.blockchain.map((block, index) =>
            <div className='block' key={index}>
              <div><p><strong>Block #{block.index}</strong></p></div>
              <div><p>Timestamp: {block.timeStamp}</p></div>
              <div><p>Data: {block.data}</p></div>
              <div><p>Previous Hash: <i>{block.previousHash}</i></p></div>
              <div><p>Hash: <i>{block.hash}</i></p></div>
              <div><p>Nonce: <i>{block.nonce}</i></p></div>
            </div>
          )}
        </div>
        {this.state.blockchain.length < 1 ? null : <div><button onClick={this.handleClickValidate} className="btn">Check Validity</button><div className="validator">{this.state.valid.toString().toUpperCase()}</div></div>}
      </div>
    )
  }
}

export default BlockChain;
