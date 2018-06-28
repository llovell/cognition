import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import Promise from 'bluebird';
import { CognitoIdentityCredentials } from 'aws-sdk';

/**
 * Module used to authenticate a user
 * and authorize their privileges
 *
 * @module User
 * @param {string} userPoolId - Cognito userpool id
 * @param {string} clientId - Cognito client id
 * @param {string} identityPoolId - Cognito identity pool id
 * @returns {object} User
 */
const User = function User(userPoolId, clientId, identityPoolId) {
  let cognitoUser = null;

  const userPoolDetails = {
    UserPoolId: userPoolId,
    ClientId: clientId,
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

  /**
   * Function used to get users identity pool credentials
   *
   * @function getUsersIDPCredentials
   * @returns {Promise} Promise - Resolves users identity pool credentials
   */
  function getUsersIDPCredentials() {
    return new Promise((resolve, reject) => {
      const userPool = new CognitoUserPool(userPoolDetails);
      cognitoUser = userPool.getCurrentUser();
      const identityPoolArn = `cognito-idp.us-east-1.amazonaws.com/${userPoolId}`;

      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            reject(err);
          }

          const creds = new CognitoIdentityCredentials({
            IdentityPoolId: identityPoolId,
            Logins: {
              [identityPoolArn]: session.getIdToken().getJwtToken(),
            },
          }, {
            region: 'us-east-1',
          });

          creds.refresh((err2) => {
            if (err2) {
              reject(err2);
            } else {
              resolve(creds);
            }
          });
        });
      } else {
        reject();
      }
    });
  }

  return {
    login,
    logout,
    register,
    confirm,
    getUsersIDPCredentials,
  };
};

module.exports = User;
