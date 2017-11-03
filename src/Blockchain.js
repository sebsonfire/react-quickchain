import React from 'react';

let blockchain = [
  {
    index: 0,
    timeStamp: 1509727393252,
    data: "Genesis Block",
    previousHash: 0,
    hash: 0
  }
];

export class BlockChain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      blockchain
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.blockchain.map((todo, index) =>
            <li className='block' key={index}>
              <p>{todo.index}</p>
              <p>{todo.timeStamp}</p>
              <p>{todo.data}</p>
              <p>{todo.previousHash}</p>
              <p>{todo.hash}</p>
            </li>
            )}
        </ul>
      </div>
    )
  }
}

export default BlockChain;
