import { createContext, useContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

// 앱 어디서든 "지금 로그인했는지"를 알 수 있게 해 주는 공용 상태
export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthState>({
  session: null,
  user: null,
  loading: false,
});

export const useAuth = (): AuthState => useContext(AuthContext);
