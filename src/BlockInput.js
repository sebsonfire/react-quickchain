import React from 'react';

export class BlockInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: 0,
      timeStamp: "",
      data: "",
      previousHash: "",
      hash: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
    <div>
      <form onSubmit = {this.handleSubmit} className="add-block-form">
        <div>
          <label htmlFor="inputBlockData">ADD NEW BLOCK</label>
          <div>
            <input name="data"
                   type="text"
                   id="inputBlockData"
                   value={this.state.data}
                   onChange={this.handleInputChange}
                   placeholder="Data">
            </input>
          </div>
          <div>
            <button type="submit" className="btn btn-success">Add Block</button>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

export default BlockInput;
