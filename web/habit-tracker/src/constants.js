const AWS_COGNITO_CLIENT_ID = process.env.REACT_APP_AWS_COGNITO_CLIENT_ID;
export const AWS_COGNITO_REDIRECT_URI = 'http://localhost:3000/redirect';
export const AWS_COGNITO_SIGN_IN_URL = `https://habit-tracker.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=token&client_id=${AWS_COGNITO_CLIENT_ID}&redirect_uri=${AWS_COGNITO_REDIRECT_URI}`;
