import React from 'react';

export class UserInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passPhrase: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] : value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddUser(this.state);
    this.setState({
      userName: "",
      passPhrase: ""
    })
  }

  render() {
    return (
       <div>
      <form onSubmit = {this.handleSubmit} className="add-user-form">
        <div>
          <label htmlFor="inputUserData">Create Account</label>
          <div>
            <input name= "userName"
                   type="text"
                   id="inputUserName"
                   value={this.state.userName}
                   onChange={this.handleInputChange}
                   placeholder="Enter Username">
            </input>
          </div>
          <div>
            <input name="passPhrase"
                   type="password"
                   id="inputUserPassPhrase"
                   value={this.state.passPhrase}
                   onChange={this.handleInputChange}
                   placeholder="Enter Passphrase">
            </input>
          </div>
          <div>
            <button type="submit" className="btn">Generate Account</button>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

export default UserInput;
