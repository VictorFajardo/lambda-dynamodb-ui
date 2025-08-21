import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';

export function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <main className="p-4 max-w-xl mx-auto font-sans text-gray-100">
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="mb-6">Processing login...</h2>
        <Loading />
      </div>
    </main>
  );
}
