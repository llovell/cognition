import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

/**
 * Module used to authenticate a user
 * and authorize privileges
 * 
 * @module User
 */
const User = function User() {
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
  function login() {
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
        const cognitoUser = result.user;
        console.log(result);
        console.log(cognitoUser);
        console.log(`user registered as ${cognitoUser.getUsername()}`);
      }
    });
  }

  /**
   * Function used to confirm a new user registration
   *
   * @function confirm
   * @param {string} code - Users verification code
   */
  function confirm() {
  }

  return {
    login,
    register,
    confirm,
  };
};

module.exports = User;
