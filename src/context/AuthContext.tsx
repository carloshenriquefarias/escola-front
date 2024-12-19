import { createContext, ReactNode, useEffect, useState } from "react";

import { storageUserGet, storageUserSave, storageUserRemove } from '../storage/storageUser';
import { UserDTO } from "../dtos/userDTO";
import { api } from "../services/api";

import 'react-toastify/dist/ReactToastify.css';
import { toastApiResponse } from "../components/Toast";

interface SignInResponse {
  success: boolean;
  message?: string;
}

export type AuthContextDataProps = {
  user: UserDTO | null;
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signUp: (name: string, email: string, password: string, password_confirm: string) => any;
  // signUp: (name: string, email: string, password: string, password_confirm: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  setUserData:() => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function storageUserAndTokenSave(userData: UserDTO) { //Colocar o token depois
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData); 

    } catch (error) {
      throw error;

    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signIn(email: string, password: string){
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const signInEndpoint = '/login.php';
      const response = await api.post(signInEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUser(response.data?.user);  

      if (response.data?.user.id) {
        await storageUserAndTokenSave(response.data.user);
      }

      return response.data

    } catch (error) {
      console.error('Error:', error);

    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signUp(name: string, email: string, password: string, password_confirm: string) {
    try {

      const firstFormData = new FormData();
      firstFormData.append("name", name);
      firstFormData.append("email", email);
      firstFormData.append("password", password);
      firstFormData.append("confirm_password", password_confirm);

      const firtsResponse = await api.post('/register_account.php', firstFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if(firtsResponse){

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const signInEndpoint = '/login.php';
        const response = await api.post(signInEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        toastApiResponse(response, response.data.message);
        setUser(response.data.user);  

        if (response.data.user.id) {
          await storageUserAndTokenSave(response.data.user);
        }

        return new Promise((resolve, reject) => {
          if (response.data.success) {
            resolve({ success: true, message: response.data.message });
          } else {
            reject({ success: false, message: 'Erro ao processar a solicitação.' });
          }
        });

        // return {succes: true, message: response.data.message}
      }
      
    } catch (error: any) {
      console.error('Error:', error);
      return { success: false, message: error.message || 'Error' }; 
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {

      // console.log('Loading user data');
      setIsLoadingUserStorageData(true);

      const safeUser = await storageUserGet();
      const userLogged = safeUser || { id: '', image: '', name: '', email: '' };
      setUser(userLogged);

      return userLogged;

    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      throw error;

    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function setUserData() {
   try {
      const url = 'user/me.php?id='+user?.id;
      const response = await api.get(url);    
      setUser(response.data);

      if (response.data.id) {
        await storageUserAndTokenSave(response.data);
      }
      
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server. Please try again later.');

    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();

    } catch (error) {
      throw error;

    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])

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
  )
}