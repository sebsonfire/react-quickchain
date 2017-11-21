import React from 'react';

export class BlockInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      timeStamp: "",
      data: "",
      previousHash: 0,
      hash: "",
      nonce: "",
      difficulty: null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
  }

  handleInputChange(e) {

    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name] : value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddBlock(this.state);
    this.setState({
      data : ""
    })
  }

  handleDifficultyChange(e) {
    e.preventDefault();
    let target = e.target;
    let value = parseInt(target.value, 10);
    value = isNaN(value) ? 0 : value;
    this.setState({
      difficulty: value
    });
  }

  render() {
    const { data } = this.state;
    const isEnabled = data.length > 0;
    return (
    <div>
      <form onSubmit = {this.handleSubmit} className="add-block-form" autoComplete="off">
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
        <div>
          <div>
            <input name="data"
                   type="text"
                   id="inputBlockData"
                   value={this.state.data}
                   onChange={this.handleInputChange}
                   placeholder={this.props.blockchainLength < 1 ? "Name Your Blockchain" : "Data"}>
            </input>
          </div>
          <div>
            <button type="submit" disabled={!isEnabled} className="btn">{this.props.blockchainLength < 1 ? "Create Genesis Block" : "Add Block"}</button>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

export default BlockInput;
