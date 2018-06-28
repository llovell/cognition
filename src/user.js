import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';

/**
 * Module used to authenticate a user
 * and authorize privileges
 *
 * @module User
 */
const User = function User() {
  let cognitoUser = null;

  const userPoolDetails = {
    UserPoolId: 'us-east-1_F3yVZA5Sp',
    ClientId: '7be3lv5eddcfpdv25kih5jd5mp',
  };

  /**
   * Function used to log a user in
   *
   * @function login
   * @param {string} email - Users email address
   * @param {string} password - Users password
   */
  function login(email, password) {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userPool = new CognitoUserPool(userPoolDetails);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);
        const idToken = result.idToken.jwtToken;
        console.log(idToken);
      },

      onFailure: (err) => {
        console.log(err);
      },

      // mfaRequired: (codeDeliveryDetails) => {
      //   console.log(codeDeliveryDetails);
      //   const verificationCode = prompt('Please input verification code', '');
      //   cognitoUser.sendMFACode(verificationCode, this);
      // },
    });
  }

  /**
   * Function used to log a user out
   *
   * @function logout
   */
  function logout() {
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }

  /**
   * Function used to register a new user
   *
   * @function register
   * @param {string} email - Users email address
   * @param {string} password - Users password
   * @param {string} phone - Users phone number
   */
  function register(email, password, phone) {
    const userPool = new CognitoUserPool(userPoolDetails);

    const attributes = [];

    const emailDetails = {
      Name: 'email',
      Value: email,
    };

    const phoneDetails = {
      Name: 'phone_number',
      Value: phone,
    };

    const emailAttribute = new CognitoUserAttribute(emailDetails);
    const phoneAttribute = new CognitoUserAttribute(phoneDetails);

    attributes.push(emailAttribute);
    attributes.push(phoneAttribute);

    userPool.signUp(email, password, attributes, null, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        cognitoUser = result.user;
      }
    });
  }

  /**
   * Function used to confirm a new user registration
   *
   * @function confirm
   * @param {string} code - Users verification code
   */
  function confirm(code) {
    if (cognitoUser) {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`call result: ${result}`);
        }
      });
    }
  }

  return {
    login,
    logout,
    register,
    confirm,
  };
};

module.exports = User;
