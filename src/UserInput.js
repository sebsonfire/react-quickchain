import React from 'react';

export class UserInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      passPhrase: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    let target = e.target;
    let value = target.value;
    this.setState({
      passPhrase: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddUser(this.state);
    this.setState({
      passPhrase: ""
    })
  }

  render() {
    return (
       <div>
      <form onSubmit = {this.handleSubmit} className="add-user-form">
        <div>
          <label htmlFor="inputUserPassPhrase">Create Account</label>
          <div>
            <input name="passPhrase"
                   type="text"
                   id="inputUserPassPhrase"
                   value={this.state.passPhrase}
                   onChange={this.handleInputChange}
                   placeholder="Enter PassPhrase">
            </input>
          </div>
          <div>
            <button type="submit" className="btn btn-success">Generate Account</button>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

export default UserInput;
