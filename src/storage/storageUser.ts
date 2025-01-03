import { UserDTO } from '../dtos/userDTO';
import { USER_STORAGE } from './storageConfig';

export async function storageUserSave(user: UserDTO) {
  await localStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await localStorage.getItem(USER_STORAGE);
  const user = storage ? (JSON.parse(storage) as UserDTO) : undefined;
  return user;
}

export async function storageUserRemove() { 
  await localStorage.removeItem(USER_STORAGE);
}