import { useEffect } from 'react';
import { cognitoConfig } from '../auth/config';

export default function Callback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const verifier = localStorage.getItem('pkce_verifier');

    if (code && verifier) {
      fetch(`${cognitoConfig.domain}/oauth2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: cognitoConfig.clientId,
          code,
          redirect_uri: cognitoConfig.redirectUri,
          code_verifier: verifier,
        }),
      })
        .then((res) => res.json())
        .then((tokens) => {
          localStorage.setItem('id_token', tokens.id_token);
          localStorage.setItem('access_token', tokens.access_token);
          localStorage.setItem('refresh_token', tokens.refresh_token);
          window.location.href = '/';
        });
    }
  }, []);

  return <p>Logging in...</p>;
}
