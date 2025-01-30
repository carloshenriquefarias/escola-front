// import { createContext, ReactNode, useEffect, useState } from "react";

// import { storageUserGet, storageUserSave, storageUserRemove } from '../storage/storageUser';
// import { UserDTO } from "../dtos/userDTO";
// import { api } from "../services/api";

// import 'react-toastify/dist/ReactToastify.css';
// import { toastApiResponse } from "../components/Toast";

// interface SignInResponse {
//   success: boolean;
//   message?: string;
// }

// export type AuthContextDataProps = {
//   user: UserDTO | null;
//   signIn: (email: string, password: string) => Promise<SignInResponse>;
//   signUp: (name: string, email: string, password: string, password_confirm: string) => any;
//   // signUp: (name: string, email: string, password: string, password_confirm: string) => Promise<void>;
//   signOut: () => Promise<void>;
//   isLoadingUserStorageData: boolean;
//   setUserData:() => Promise<void>;
// }

// type AuthContextProviderProps = {
//   children: ReactNode;
// }

// export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

// export function AuthContextProvider({ children }: AuthContextProviderProps) {

//   const [user, setUser] = useState<UserDTO | null>(null);
//   const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

//   async function storageUserAndTokenSave(userData: UserDTO) { //Colocar o token depois
//     try {
//       setIsLoadingUserStorageData(true);
//       await storageUserSave(userData); 

//     } catch (error) {
//       throw error;

//     } finally {
//       setIsLoadingUserStorageData(false)
//     }
//   }

//   async function signIn(email: string, password: string){
//     try {
//       const formData = new FormData();
//       formData.append("email", email);
//       formData.append("password", password);

//       const signInEndpoint = '/login.php';
//       const response = await api.post(signInEndpoint, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setUser(response.data?.user);  

//       if (response.data?.user.id) {
//         await storageUserAndTokenSave(response.data.user);
//       }

//       return response.data

//     } catch (error) {
//       console.error('Error:', error);

//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function signUp(name: string, email: string, password: string, password_confirm: string) {
//     try {

//       const firstFormData = new FormData();
//       firstFormData.append("name", name);
//       firstFormData.append("email", email);
//       firstFormData.append("password", password);
//       firstFormData.append("confirm_password", password_confirm);

//       const firtsResponse = await api.post('/register_account.php', firstFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
      
//       if(firtsResponse){

//         const formData = new FormData();
//         formData.append("email", email);
//         formData.append("password", password);

//         const signInEndpoint = '/login.php';
//         const response = await api.post(signInEndpoint, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         toastApiResponse(response, response.data.message);
//         setUser(response.data.user);  

//         if (response.data.user.id) {
//           await storageUserAndTokenSave(response.data.user);
//         }

//         return new Promise((resolve, reject) => {
//           if (response.data.success) {
//             resolve({ success: true, message: response.data.message });
//           } else {
//             reject({ success: false, message: 'Erro ao processar a solicitação.' });
//           }
//         });

//         // return {succes: true, message: response.data.message}
//       }
      
//     } catch (error: any) {
//       console.error('Error:', error);
//       return { success: false, message: error.message || 'Error' }; 
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function loadUserData() {
//     try {

//       // console.log('Loading user data');
//       setIsLoadingUserStorageData(true);

//       const safeUser = await storageUserGet();
//       const userLogged = safeUser || { id: '', image: '', name: '', email: '' };
//       setUser(userLogged);

//       return userLogged;

//     } catch (error) {
//       console.error('Erro ao carregar dados do usuário:', error);
//       throw error;

//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function setUserData() {
//    try {
//       const url = 'user/me.php?id='+user?.id;
//       const response = await api.get(url);    
//       setUser(response.data);

//       if (response.data.id) {
//         await storageUserAndTokenSave(response.data);
//       }
      
//     } catch (error) {
//       console.error('Error:', error);
//       toastApiResponse(error, 'An error occurred while connecting to the server. Please try again later.');

//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function signOut() {
//     try {
//       setIsLoadingUserStorageData(true);
//       setUser({} as UserDTO);
//       await storageUserRemove();

//     } catch (error) {
//       throw error;

//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   useEffect(() => {
//     loadUserData();
//   }, [])

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         signIn,
//         signUp,
//         signOut,
//         isLoadingUserStorageData,
//         setUserData
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// ESSE ERA O QUE ESTAVA SENDO USADO


// import { createContext, ReactNode, useEffect, useState } from "react";
// import { storageUserGet, storageUserSave, storageUserRemove } from '../storage/storageUser';
// import { UserDTO } from "../dtos/userDTO";
// import { api } from "../services/api";
// import { toastApiResponse } from "../components/Toast";
// import { useToast } from "@chakra-ui/react";

// interface SignInResponse {
//   success: boolean;
//   message?: string;
//   user?: UserDTO;
// }

// export interface AuthContextDataProps {
//   user: UserDTO | null;
//   signIn: (email: string, password: string) => Promise<SignInResponse>;
//   signUp: (name: string, email: string, password: string, password_confirm: string) => Promise<SignInResponse>;
//   signOut: () => Promise<void>;
//   isLoadingUserStorageData: boolean;
//   setUserData: () => Promise<void>;
// }

// interface AuthContextProviderProps {
//   children: ReactNode;
// }

// export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

// export function AuthContextProvider({ children }: AuthContextProviderProps) {
//   const [user, setUser] = useState<UserDTO | null>(null);
//   const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

//   async function storageUserAndTokenSave(userData: UserDTO) {
//     try {
//       setIsLoadingUserStorageData(true);
//       await storageUserSave(userData);
//     } catch (error) {
//       throw error;
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function signIn(email: string, password: string): Promise<SignInResponse> {
//     try {
//       setIsLoadingUserStorageData(true);
//       const response = await api.post<SignInResponse>('/login', { email, password });

//       if (response.data && response.data.user) {
//         setUser(response.data.user);
//         await storageUserAndTokenSave(response.data.user);
//       }

//       return response.data;

//     } catch (error) {
//       console.error('SignIn Error:', error);
//       return { success: false, message: 'An error occurred during sign in.' };
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function signUp(name: string, email: string, password: string, password_confirm: string): Promise<SignInResponse> {
//     try {
//       const registerResponse = await api.post<SignInResponse>('/register_account.php', {
//         name,
//         email,
//         password,
//         confirm_password: password_confirm
//       });

//       if (registerResponse.data.success) {
//         const signInResponse = await signIn(email, password);
//         return signInResponse;
//       }

//       return registerResponse.data;
//     } catch (error) {
//       console.error('SignUp Error:', error);
//       return { success: false, message: 'An error occurred during sign up.' };
//     }
//   }

//   async function loadUserData() {
//     try {
//       setIsLoadingUserStorageData(true);
//       const safeUser = await storageUserGet();
//       if (safeUser) {
//         setUser(safeUser);
//       }
//     } catch (error) {
//       console.error('Error loading user data:', error);
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   async function setUserData() {
//     try {
//       if (!user?.id) return;
//       const response = await api.get<UserDTO>(`user/me.php?id=${user.id}`);
//       setUser(response.data);
//       await storageUserAndTokenSave(response.data);
//     } catch (error) {
//       console.error('Error updating user data:', error);
//       toastApiResponse(error, 'An error occurred while connecting to the server. Please try again later.');
//     }
//   }

//   // async function signOut() {
//   //   try {
//   //     setIsLoadingUserStorageData(true);
//   //     setUser(null);
//   //     await storageUserRemove();
//   //   } catch (error) {
//   //     console.error('SignOut Error:', error);
//   //   } finally {
//   //     setIsLoadingUserStorageData(false);
//   //   }
//   // }

//   const toast = useToast();

//   async function signOut() {
//     try {
//       setIsLoadingUserStorageData(true);

//       // Call the backend logout endpoint
//       const response = await api.post('/logout');

//       if (response.data.status) {
//         // Backend logout successful
//         setUser(null);
//         await storageUserRemove();
        
//         // Clear any auth tokens or other sensitive data
//         // For example, if you're using localStorage:
//         localStorage.removeItem('authToken');

//         toast({
//           title: "Logout bem-sucedido",
//           description: response.data.message || "Você foi deslogado com sucesso.",
//           status: "success",
//           position: "top",
//           duration: 5000,
//           isClosable: true,
//         });

//         // Short delay before redirecting
//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         // Redirect to login page
//         // navigate('/login');
//       } else {
//         throw new Error(response.data.message || "Falha ao deslogar");
//       }
//     } catch (error) {
//       console.error('SignOut Error:', error);
//       toast({
//         title: "Erro ao deslogar",
//         description: "Ocorreu um erro ao tentar deslogar. Por favor, tente novamente.",
//         status: "error",
//         position: "top",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setIsLoadingUserStorageData(false);
//     }
//   }

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         signIn,
//         signUp,
//         signOut,
//         isLoadingUserStorageData,
//         setUserData
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// ESSE E O NOVO QUE FUNCIONA

// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { api } from '../services/api';

// // Tipos para o usuário e contexto
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   photo?: string;
// }

// interface AuthContextData {
//   user: User | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// // Tipo para o provedor
// interface AuthProviderProps {
//   children: ReactNode;
// }

// // Criar o contexto com tipo inicial vazio
// const AuthContext = createContext<AuthContextData | undefined>(undefined);

// export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null); // Dados do usuário
//   const [token, setToken] = useState<string | null>(null); // Token de autenticação

//   // Carregar os dados do Local Storage quando o app é iniciado
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const storedToken = localStorage.getItem('token');

//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser));
//       setToken(storedToken);
//     }
//   }, []);

//   const login = async (email: string, password: string): Promise<void> => {
//     try {
//       // Envia os dados para a API
//       const response = await api.post('/login', { email, password });
  
//       // Acessa diretamente o `data` retornado pela API
//       const { status, token, user } = response.data;
  
//       // Verifica se o status é verdadeiro
//       if (!status || !token || !user) {
//         throw new Error('Dados inválidos retornados pela API');
//       }
  
//       // Salvar os dados no estado e Local Storage
//       setUser(user);
//       setToken(token);
  
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('token', token);      

//     } catch (error: any) {
//       console.error('Erro ao tentar fazer login:', error.message || error);
  
//       // Lança uma mensagem de erro amigável
//       throw new Error(
//         error.response?.data?.message ||
//         'Erro desconhecido. Por favor, tente novamente mais tarde.'
//       );
//     }
//   };  

//   // Função de logout
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   // Verifica se o contexto está disponível
//   if (!AuthContext) {
//     throw new Error('AuthContext não foi inicializado.');
//   }

//   // Prover o contexto
//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


// ----------------------------------------------------------------------------------------
// ESSSE AQUI E O AUTENTICA AS PAGINAS NA ROTA E FUNCIONA

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

// Interface para os dados do usuário
interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

// Interface para o contexto de autenticação
interface AuthContextData {
  user: User | null;
  token: string | null;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Interface para as propriedades do provedor do contexto
interface AuthProviderProps {
  children: ReactNode;
}

// Criação do contexto com um valor inicial indefinido
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Provedor do contexto de autenticação
export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Carregar dados do Local Storage ao iniciar o aplicativo
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Verifica se o usuário está autenticado
  const isAuthenticated = (): boolean => !!user && !!token;

  // Função de login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post('/login', { email, password });
      const { status, token, user } = response.data;

      if (!status || !token || !user) {
        throw new Error('Dados inválidos retornados pela API');
      }

      setUser(user);
      setToken(token);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (error: any) {
      console.error('Erro ao tentar fazer login:', error.message || error);
      throw new Error(
        error.response?.data?.message || 'Erro desconhecido. Por favor, tente novamente mais tarde.'
      );
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = (): AuthContextData => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthContextProvider');
  }

  return context;
};

export default AuthContext;
