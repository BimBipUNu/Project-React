import axios from "axios";
import type { User } from "../types/user.type";

async function addNewUser(data: User) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_LOCALHOST_API}/users`,
      { ...data, id: String(Date.now()) }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getAllUser() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_LOCALHOST_API}/users`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
async function updateUser(data: User) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_LOCALHOST_API}/users/${data.id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteUser(data: User) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_LOCALHOST_API}/users/${data.id}`
    );
    return data.id;
  } catch (err) {
    console.log(err);
  }
}

const userApi = {
  GET: getAllUser,
  POST: addNewUser,
  PUT: updateUser,
  DELETE: deleteUser,
};

export default userApi;
