import React from 'react';
import Block from './block.js';
import BlockInput from './BlockInput';


let blockchain = [];

export class BlockChain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      blockchain: blockchain,
      valid: ""
    }

    this.handleAddBlock = this.handleAddBlock.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickValidate = this.handleClickValidate.bind(this);
  }

  handleAddBlock(block) {
    let index = this.state.blockchain.length + 1;
    let timeStamp = new Date().toString();
    let previousHash = this.state.blockchain[this.state.blockchain.length-1].hash;
    let newBlock = new Block(index, timeStamp, block.data, previousHash);
    this.setState({blockchain: [...this.state.blockchain, newBlock]});
  }

  handleSubmit(e) {
    e.preventDefault();
    let timeStamp = new Date().toString();
    let genesisBlock = new Block(1, timeStamp, "Genesis block", "0");
    this.setState({
      blockchain: [...this.state.blockchain, genesisBlock]
    });
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



  render() {
    return (
      <div className='text-center'>
      {this.state.blockchain.length < 1 ?
        <div>
          <h4>Add Genesis Block</h4>
          <form onSubmit={this.handleSubmit}>
            <button type="submit" className="btn btn-success">Create Genesis Block</button>
          </form>
        </div>
        : null
      }
        {this.state.blockchain.length < 1 ? null : <BlockInput onAddBlock={this.handleAddBlock}/>}
        <div className='blockchain'>
          {this.state.blockchain.map((block, index) =>
            <div className='block' key={index}>
              <div><p>Block #{block.index}</p></div>
              <div><p>Timestamp: {block.timeStamp}</p></div>
              <div><p>Data: {block.data}</p></div>
              <div><p>Previous Hash: {block.previousHash}</p></div>
              <div><p>Hash: {block.hash}</p></div>
            </div>
          )}
          {this.state.blockchain.length < 1 ? null : <div><button onClick={this.handleClickValidate} className="btn btn-danger">Check Validity</button><div className="validator">{this.state.valid.toString().toUpperCase()}</div></div>}
        </div>
      </div>
    )
  }
}

export default BlockChain;
