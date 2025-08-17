import { useAuth } from 'react-oidc-context';

export default function LoginButton() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.removeUser();

    const clientId = '6og0f8178r15nssb9p55fcftc0';
    const cognitoDomain = 'https://notes-demo-989996.auth.us-east-1.amazoncognito.com';
    const redirectUri =
      import.meta.env.MODE === 'development'
        ? 'http://localhost:5173/lambda-dynamodb-ui/'
        : 'https://victorfajardo.github.io/lambda-dynamodb-ui/';
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(redirectUri)}`;
  };

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  return auth.isAuthenticated ? (
    <div>
      <pre>Hello: {auth.user?.profile.email}</pre>
      <pre>ID Token: {auth.user?.id_token}</pre>
      <pre>Access Token: {auth.user?.access_token}</pre>
      <pre>Refresh Token: {auth.user?.refresh_token}</pre>
      <button
        onClick={handleLogout}
        className="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
      >
        Sign out
      </button>
    </div>
  ) : (
    <button
      onClick={() => auth.signinRedirect()}
      className="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
    >
      Login with Cognito!
    </button>
  );
}
