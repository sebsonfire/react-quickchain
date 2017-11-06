import React from 'react';
import Block from './block.js';
import BlockInput from './BlockInput';


let blockchain = [];

export class BlockChain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      blockchain
    }

    this.handleAddBlock = this.handleAddBlock.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({blockchain: [...this.state.blockchain, genesisBlock]});
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
              <p>Block #{block.index}</p>
              <p>Timestamp: {block.timeStamp}</p>
              <p>Data: {block.data}</p>
              <p>Previous Hash: {block.previousHash}</p>
              <p>Hash: {block.hash}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default BlockChain;
