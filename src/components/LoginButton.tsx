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
    <div className="flex items-end gap-2">
      <pre className="m-0">
        Welcome, <b>{auth.user?.profile.name}</b>!
      </pre>
      <button
        onClick={handleLogout}
        className="text-white bg-indigo-700 border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-xs px-2 py-1 text-center dark:border-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
      >
        Sign out
      </button>
    </div>
  ) : (
    <button
      onClick={() => auth.signinRedirect()}
      className="text-white bg-indigo-700 border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-xs px-2 py-1 text-center dark:border-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
    >
      Login with Cognito!
    </button>
  );
}
