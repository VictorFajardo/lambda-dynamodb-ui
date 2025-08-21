import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import type { User } from 'oidc-client-ts';
import { Loading } from '../components/Loading';
import { useCallback } from 'react';

export default function AutoLoginPage() {
  const auth = useAuth();

  const loginDemo = useCallback(async () => {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/demo-login`, { method: 'POST' });
    const { AccessToken, ExpiresIn, IdToken, RefreshToken, TokenType } = await resp.json();

    const demoUser: User = {
      id_token: IdToken,
      access_token: AccessToken,
      refresh_token: RefreshToken,
      expires_in: ExpiresIn,
      token_type: TokenType,
      scope: 'openid profile email',
      profile: {
        sub: 'demo-subject-id',
        email: 'demo.user@email.com',
        email_verified: true,
        iss: auth.settings.authority,
        aud: auth.settings.client_id,
        name: 'Demo User',
        exp: Math.floor(Date.now() / 1000) + ExpiresIn,
        iat: Math.floor(Date.now() / 1000),
      },
      session_state: null,
      state: undefined,
      expired: undefined,
      scopes: [],
      toStorageString: function (): string {
        throw new Error('Function not implemented.');
      },
    };

    const storageKey = `oidc.user:${auth.settings.authority}:${auth.settings.client_id}`;
    sessionStorage.setItem(storageKey, JSON.stringify(demoUser));

    console.log('🚀', import.meta.env.BASE_URL);
    window.location.href = import.meta.env.BASE_URL;
  }, [auth.settings.authority, auth.settings.client_id]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      loginDemo();
    }
  }, [auth.isAuthenticated, loginDemo]);

  return (
    <main className="p-4 max-w-xl mx-auto font-sans text-gray-100">
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="mb-2">Logging you in as...</h2>
        <p>
          <strong>user:</strong> demo.user@email.com
        </p>
        <p className="mb-6">
          <strong>password:</strong> ****************
        </p>
        <Loading />
      </div>
    </main>
  );
}
