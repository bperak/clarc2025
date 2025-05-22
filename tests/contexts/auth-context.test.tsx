/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/auth-context';

// ------------------------
// Mocks
// ------------------------

const mockSignUp = jest.fn();
const mockSignInWithPassword = jest.fn();
const mockOnAuthStateChange = jest.fn();

// Mock the Supabase client used in the application.
// We only provide the pieces that AuthProvider relies on.
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: (...args: any[]) => mockSignUp(...args),
      signInWithPassword: (...args: any[]) => mockSignInWithPassword(...args),
      onAuthStateChange: (...args: any[]) => mockOnAuthStateChange(...args),
    },
  },
}));

// A helper component that exposes the AuthContext object to test callbacks.
function AuthConsumer({ onReady }: { onReady: (auth: ReturnType<typeof useAuth>) => Promise<void> | void }) {
  const auth = useAuth();

  React.useEffect(() => {
    if (!auth.loading) {
      void onReady(auth);
    }
    // We intentionally include auth.loading in the deps so the effect fires once loading becomes false.
  }, [auth, onReady]);

  return null;
}

// ------------------------
// Tests
// ------------------------

describe('AuthContext – signUp and signIn methods', () => {
  const exampleUser = { id: 'user-123', email: 'test@example.com' } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnAuthStateChange.mockImplementation((callback: any) => {
      callback(null, { user: null });
      return { data: { subscription: { unsubscribe: jest.fn() } } };
    });
  });

  it('signUpWithEmail calls supabase.auth.signUp and returns user', async () => {
    mockSignUp.mockResolvedValue({ data: { user: exampleUser }, error: null });

    await new Promise<void>((resolve) => {
      render(
        <AuthProvider>
          <AuthConsumer
            onReady={async (auth) => {
              const user = await auth.signUpWithEmail(exampleUser.email, 'password123');
              expect(mockSignUp).toHaveBeenCalledWith({ email: exampleUser.email, password: 'password123' });
              expect(user).toEqual(exampleUser);
              resolve();
            }}
          />
        </AuthProvider>
      );
    });
  });

  it('signInWithEmail calls supabase.auth.signInWithPassword and returns user', async () => {
    mockSignInWithPassword.mockResolvedValue({ data: { user: exampleUser }, error: null });

    await new Promise<void>((resolve) => {
      render(
        <AuthProvider>
          <AuthConsumer
            onReady={async (auth) => {
              const user = await auth.signInWithEmail(exampleUser.email, 'password123');
              expect(mockSignInWithPassword).toHaveBeenCalledWith({ email: exampleUser.email, password: 'password123' });
              expect(user).toEqual(exampleUser);
              resolve();
            }}
          />
        </AuthProvider>
      );
    });
  });

  it('signUpWithEmail propagates Supabase errors', async () => {
    const exampleError = new Error('Sign up failed');
    mockSignUp.mockResolvedValue({ data: { user: null }, error: exampleError });

    await new Promise<void>((resolve) => {
      render(
        <AuthProvider>
          <AuthConsumer
            onReady={async (auth) => {
              await expect(auth.signUpWithEmail(exampleUser.email, 'password123')).rejects.toBe(exampleError);
              resolve();
            }}
          />
        </AuthProvider>
      );
    });
  });
}); 