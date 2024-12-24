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


import { createContext, ReactNode, useEffect, useState } from "react";
import { storageUserGet, storageUserSave, storageUserRemove } from '../storage/storageUser';
import { UserDTO } from "../dtos/userDTO";
import { api } from "../services/api";
import { toastApiResponse } from "../components/Toast";
import { useToast } from "@chakra-ui/react";

interface SignInResponse {
  success: boolean;
  message?: string;
  user?: UserDTO;
}

export interface AuthContextDataProps {
  user: UserDTO | null;
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signUp: (name: string, email: string, password: string, password_confirm: string) => Promise<SignInResponse>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  setUserData: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function storageUserAndTokenSave(userData: UserDTO) {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string): Promise<SignInResponse> {
    try {
      setIsLoadingUserStorageData(true);
      const response = await api.post<SignInResponse>('/login', { email, password });

      if (response.data && response.data.user) {
        setUser(response.data.user);
        await storageUserAndTokenSave(response.data.user);
      }

      return response.data;

    } catch (error) {
      console.error('SignIn Error:', error);
      return { success: false, message: 'An error occurred during sign in.' };
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signUp(name: string, email: string, password: string, password_confirm: string): Promise<SignInResponse> {
    try {
      const registerResponse = await api.post<SignInResponse>('/register_account.php', {
        name,
        email,
        password,
        confirm_password: password_confirm
      });

      if (registerResponse.data.success) {
        const signInResponse = await signIn(email, password);
        return signInResponse;
      }

      return registerResponse.data;
    } catch (error) {
      console.error('SignUp Error:', error);
      return { success: false, message: 'An error occurred during sign up.' };
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      const safeUser = await storageUserGet();
      if (safeUser) {
        setUser(safeUser);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function setUserData() {
    try {
      if (!user?.id) return;
      const response = await api.get<UserDTO>(`user/me.php?id=${user.id}`);
      setUser(response.data);
      await storageUserAndTokenSave(response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server. Please try again later.');
    }
  }

  // async function signOut() {
  //   try {
  //     setIsLoadingUserStorageData(true);
  //     setUser(null);
  //     await storageUserRemove();
  //   } catch (error) {
  //     console.error('SignOut Error:', error);
  //   } finally {
  //     setIsLoadingUserStorageData(false);
  //   }
  // }

  const toast = useToast();

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);

      // Call the backend logout endpoint
      const response = await api.post('/logout');

      if (response.data.status) {
        // Backend logout successful
        setUser(null);
        await storageUserRemove();
        
        // Clear any auth tokens or other sensitive data
        // For example, if you're using localStorage:
        localStorage.removeItem('authToken');

        toast({
          title: "Logout bem-sucedido",
          description: response.data.message || "Você foi deslogado com sucesso.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });

        // Short delay before redirecting
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Redirect to login page
        // navigate('/login');
      } else {
        throw new Error(response.data.message || "Falha ao deslogar");
      }
    } catch (error) {
      console.error('SignOut Error:', error);
      toast({
        title: "Erro ao deslogar",
        description: "Ocorreu um erro ao tentar deslogar. Por favor, tente novamente.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        isLoadingUserStorageData,
        setUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}