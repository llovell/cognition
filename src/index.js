import React from 'react';
import ReactDOM from 'react-dom';
import User from './user';

// params: userPoolId, clientId, identityPoolId
const user = new User('us-east-1_F3yVZA5Sp',
  '7be3lv5eddcfpdv25kih5jd5mp',
  'us-east-1:4bcbcb09-32b7-4466-b351-fbec9d3c3aed');

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
    this.doLogout = this.doLogout.bind(this);
    this.doConfirm = this.doConfirm.bind(this);
  }

  componentDidMount() {
    user.getUsersIDPCredentials()
      .then((credentials) => {
        console.log(credentials);
      });
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
    user.login(email, password)
      .then(() => {
        user.getUsersIDPCredentials()
          .then((credentials) => {
            console.log(credentials);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  doLogout() { // eslint-disable-line class-methods-use-this
    user.logout()
      .then(() => {
        console.log('Logged out');
      });
  }

  doRegister() {
    const { email, password, phone } = this.state;
    user.register(email, password, phone)
      .then(() => {
        console.log('Registered');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  doConfirm() {
    const { code } = this.state;
    user.confirm(code)
      .then(() => {
        console.log('Confirmed');
      })
      .catch((err) => {
        console.log(err);
      });
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
        <button type="button" onClick={this.doLogout}>
          Logout
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
