import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import Promise from 'bluebird';

/**
 * Module used to authenticate a user
 * and authorize their privileges
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
   * @returns {Promise} Promise
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

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.idToken.jwtToken;
          resolve({
            accessToken,
            idToken,
          });
        },

        onFailure: (err) => {
          reject(err);
        },

        // mfaRequired: (codeDeliveryDetails) => {
        //   console.log(codeDeliveryDetails);
        //   const verificationCode = prompt('Please input verification code', '');
        //   cognitoUser.sendMFACode(verificationCode, this);
        // },
      });
    });
  }

  /**
   * Function used to log a user out
   *
   * @function logout
   * @returns {Promise} Promise
   */
  function logout() {
    return new Promise((resolve, reject) => {
      try {
        cognitoUser.signOut();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Function used to register a new user
   *
   * @function register
   * @param {string} email - Users email address
   * @param {string} password - Users password
   * @param {string} phone - Users phone number
   * @returns {Promise} Promise
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

    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributes, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          cognitoUser = result.user;
          resolve();
        }
      });
    });
  }

  /**
   * Function used to confirm a new user registration
   *
   * @function confirm
   * @param {string} code - Users verification code
   * @returns {Promise} Promise
   */
  function confirm(code) {
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  return {
    login,
    logout,
    register,
    confirm,
  };
};

module.exports = User;
