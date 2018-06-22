import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const User = function() {

    const userPoolDetails = {
        UserPoolId: 'us-east-1_F3yVZA5Sp',
        ClientId: '7be3lv5eddcfpdv25kih5jd5mp'
    };
    
    function login(email, password) {
        console.log('login', email, password);
    }

    function register(email, password, phone) {
        console.log(`Register User ${email} ${password} ${phone}`);

        const userPool = new CognitoUserPool(userPoolDetails);

        let attributes = [];

        const emailDetails = {
            Name: 'email',
            Value: email
        };

        const phoneDetails = {
            Name: 'phone_number',
            Value: phone
        };


        const emailAttribute = new CognitoUserAttribute(emailDetails);
        const phoneAttribute = new CognitoUserAttribute(phoneDetails);

        attributes.push(emailAttribute);
        attributes.push(phoneAttribute);

        userPool.signUp(email, password, attributes, null, function(err, result) {
            if (err) {
                console.error(err);
            } else {
                var cognitoUser = result.user;
                console.log(result);
                console.log(cognitoUser);
                console.log('user registered as ' + cognitoUser.getUsername());
            }
        });
    }

    function confirm(code) {
        console.log('confirm', code);
    }

    return {
        login: login,
        register: register,
        confirm: confirm
    }  
};

module.exports = User;
