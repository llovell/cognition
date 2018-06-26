# Cognition

This package is used to authenticate users and authorize their privileges

It is build on Amazon Web Services [Cognito](https://aws.amazon.com/cognito/)

###### Step 1: Create a new User object

```javascript
const user = new User();
```

###### Step 2: Register a new user

```javascript
user.register(email, password, phone);
```