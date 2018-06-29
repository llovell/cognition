# Cognition

This project was created for user authentication and authorization using 
Amazon Web Services [Cognito Service](https://aws.amazon.com/cognito/)

Amazon Cognito lets you add user sign-up, sign-in, and
access control to your web and mobile apps quickly and easily

To use, follow the steps outlined below

###### Step 1: Create a new User object

When creating a new user object, you will need to pass in
three parameters: userPoolId, clientId and identityPoolId.
Find these values from within the AWS console

```javascript
const user = new User(userPoolId, clientId, identityPoolId);
```

###### Step 2: Register a new user

This function will register a new user. This function returns
a Promise

```javascript
user.register(email, password, phone);
```

###### Step 3: Confirm Registration

Once registered your user will need to confirm their email
account via the verification code sent to their email address.
This function returns a Promise

```javascript
user.confirm(code);
```

###### Step 4: Log user in

This method will log your user in. This function returns
a Promise

```javascript
user.login(email, password);
```

###### Step 5: Get Identity Pool Credentials

Upon a successful login, you will need to get the users
Identity Pool Credentials. These credentials will be used
to make authorized calls to AWS Services. Use this function
to validate any current user session. This function returns
a Promise

```javascript
user.getUsersIDPCredentials();
```
