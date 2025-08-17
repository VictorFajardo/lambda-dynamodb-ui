export const cognitoAuthConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ySM950XJd',
  client_id: '3vc8153ff8kdomu3t9fi1hi2cr',
  redirect_uri:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5173/lambda-dynamodb-ui/'
      : 'https://victorfajardo.github.io/lambda-dynamodb-ui/',
  response_type: 'code',
  scope: 'email openid profile',
};
