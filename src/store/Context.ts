import { createContext } from 'react';
import { type UserStore } from './UserStore';

const Context = createContext<{ user: UserStore | null }>({ user: null });

export { Context };
