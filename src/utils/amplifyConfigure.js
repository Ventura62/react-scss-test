import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      region: 'us-east-1',
      userPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
      userPoolClientId:  process.env.REACT_APP_COGNITO_CLIENT_ID,
      loginWith: {
        email: true,
      }
    }
  }
});
