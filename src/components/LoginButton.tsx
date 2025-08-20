import { useAuth } from 'react-oidc-context';
import { cognitoAuthConfig } from '../auth/config';
import { useNavigate } from 'react-router-dom';

export default function LoginButton() {
  const { client_id, domain } = cognitoAuthConfig;
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.removeUser();

    const redirectUri =
      import.meta.env.MODE === 'development'
        ? 'http://localhost:5173/lambda-dynamodb-ui/'
        : 'https://victorfajardo.github.io/lambda-dynamodb-ui/';
    window.location.href = `${domain}/logout?client_id=${client_id}&logout_uri=${encodeURIComponent(redirectUri)}`;
  };

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  const handleClick = () => {
    navigate('/demo-login');
  };

  return (
    <div className="flex items-end gap-2">
      {auth.isAuthenticated ? (
        <>
          <pre className="m-0">
            Welcome, <b>{auth.user?.profile.name}</b>!
          </pre>
          <button
            onClick={handleLogout}
            className="cursor-pointer text-white bg-indigo-700 border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-xs px-2 py-1 text-center dark:border-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => auth.signinRedirect()}
            className="cursor-pointer text-white bg-indigo-700 border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-xs px-2 py-1 text-center dark:border-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-800"
          >
            Login with Cognito!
          </button>
          <button
            onClick={handleClick}
            className="cursor-pointer text-white bg-amber-700 border border-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-xs px-2 py-1 text-center dark:border-amber-500 dark:hover:bg-amber-600 dark:focus:ring-indigo-800"
          >
            Sign in as Demo User! 🚀
          </button>
        </>
      )}
    </div>
  );
}
