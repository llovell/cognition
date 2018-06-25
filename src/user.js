import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const User = function User() {
  const userPoolDetails = {
    UserPoolId: 'us-east-1_F3yVZA5Sp',
    ClientId: '7be3lv5eddcfpdv25kih5jd5mp',
  };

  function login() {
  }

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

  function confirm() {
  }

  return {
    login,
    register,
    confirm,
  };
};

module.exports = User;
