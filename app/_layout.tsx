import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

const InitialLayout: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)/');
    } else if (!isSignedIn) {
      router.replace('/login/');
    }
  }, [isSignedIn]);

  return <Slot />;
};

const RootLayoutNav: React.FC = () => {
  const BASE_URL = 'http://192.168.11.29:3000/api/graphql';

  const client = new ApolloClient({
    uri: BASE_URL,
    cache: new InMemoryCache(),
  });
  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          console.error(err);
        }
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          console.error(err);
        }
      }
    },
  };

  return (
    <ApolloProvider client={client}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''}
        tokenCache={tokenCache}>
        <InitialLayout />
      </ClerkProvider>
    </ApolloProvider>
  );
};

export default RootLayoutNav;
