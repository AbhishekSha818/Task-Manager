import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function Index() {
  const router = useRouter();
  const { isLoading, token } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (token) {
        router.replace('/(app)/home');
      } else {
        router.replace('/(auth)/login');
      }
    }
  }, [isLoading, token, router]);

  return <LoadingSpinner />;
}
