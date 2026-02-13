import React, {createContext, useMemo, useContext, useReducer, useCallback} from 'react'

type AuthState ={
  isLoggedIn: boolean
};

type AuthActions = {
  loginMock: () => void;
  logoutMock: () => void;
};

type AuthContextValue = AuthState & AuthActions;

type Action = {type: 'LOGIN'} | {type: 'LOGOUT'}

const initialState: AuthState = {isLoggedIn: false}

function reducer (state: AuthState, action: Action): AuthState{
  switch(action.type){
    case 'LOGIN':
      return state.isLoggedIn ? state : {isLoggedIn : true}
    case 'LOGOUT':
      return state.isLoggedIn? {isLoggedIn: false} : state
  }
}

const AuthContext = createContext<AuthContextValue | null> (null)

export function AuthProvider({children}:{children: React.ReactNode}){
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginMock = useCallback(() => dispatch({type: 'LOGIN'}), [])
  const logoutMock = useCallback(() => dispatch({type: 'LOGOUT'}), [])

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn: state.isLoggedIn,
      loginMock,
      logoutMock
    }), [state.isLoggedIn, loginMock, logoutMock]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}