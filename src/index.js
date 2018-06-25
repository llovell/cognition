import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

const user = new User();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      phone: '',
      password: '',
      code: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);

    this.doRegister = this.doRegister.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.doConfirm = this.doConfirm.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePhoneChange(event) {
    this.setState({
      phone: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleCodeChange(event) {
    this.setState({
      code: event.target.value,
    });
  }

  doLogin() {
    const { email, password } = this.state;
    user.login(email, password);
  }

  doRegister() {
    const { email, password, phone } = this.state;
    user.register(email, password, phone);
  }

  doConfirm() {
    const { code } = this.state;
    user.confirm(code);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="email" onChange={this.handleEmailChange} />
        <input type="text" placeholder="phone" onChange={this.handlePhoneChange} />
        <input type="password" placeholder="password" onChange={this.handlePasswordChange} />
        <button type="button" onClick={this.doRegister}>
          Register
        </button>
        <button type="button" onClick={this.doLogin}>
          Login
        </button>
        <br />
        <input type="text" placeholder="code" onChange={this.handleCodeChange} />
        <button type="button" onClick={this.doConfirm}>
          Confirm
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
