// import { AuthContext } from '../context/AuthContext';
// import { useContext } from 'react';

// export function useAuth() {
//   const context = useContext(AuthContext);

//   return context;
// }

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}