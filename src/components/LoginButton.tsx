import { useAuth } from 'react-oidc-context';

export default function LoginButton() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = '3vc8153ff8kdomu3t9fi1hi2cr';
    const logoutUri = 'https://victorfajardo.github.io';
    const cognitoDomain = 'https://notes-demo-989996.auth.us-east-1.amazoncognito.com';
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => auth.signinRedirect()}
        className="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
      >
        Login with Cognito
      </button>
      <button
        onClick={() => signOutRedirect()}
        className="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
      >
        Sign out
      </button>
    </>
  );
}
