export const cognitoAuthConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ggFmNfmqv',
  client_id: '6og0f8178r15nssb9p55fcftc0',
  redirect_uri:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5173/lambda-dynamodb-ui/'
      : 'https://victorfajardo.github.io/lambda-dynamodb-ui/',
  response_type: 'code',
  scope: 'email openid profile',
};
