import React, {
  createContext,
  useMemo,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { clearAccessToken, readAccessToken, saveAccessToken } from './authTokenService';

type AuthState = {
  isLoggedIn: boolean;
  isBootstraping: boolean;
};

type AuthActions = {
  setSession: (accessToken: string) => Promise<void>;
  clearSession: () => Promise<void>;
};

type AuthContextValue = AuthState & AuthActions;

type Action =
  | { type: 'BOOTSTRAP_DONE'; isLoggedIn: boolean }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' };

const initialState: AuthState = { isLoggedIn: false, isBootstraping: true };

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'BOOTSTRAP_DONE':
      return { isLoggedIn: action.isLoggedIn, isBootstraping: false };
    case 'LOGIN':
      return state.isLoggedIn ? state : { isLoggedIn: true, isBootstraping: false };
    case 'LOGOUT':
      return state.isLoggedIn ? { isLoggedIn: false, isBootstraping: false } : state;
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSession = useCallback(async (accessToken: string) => {
    await saveAccessToken(accessToken);
    dispatch({ type: 'LOGIN' });
  }, []);

  const clearSession = useCallback(async () => {
    await clearAccessToken();
    dispatch({ type: 'LOGOUT' });
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      const token = await readAccessToken();
      if (!alive) return;
      dispatch({ type: 'BOOTSTRAP_DONE', isLoggedIn: Boolean(token) });
    })();

    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn: state.isLoggedIn,
      isBootstraping: state.isBootstraping,
      setSession,
      clearSession,
    }),
    [state.isLoggedIn, state.isBootstraping, setSession, clearSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
