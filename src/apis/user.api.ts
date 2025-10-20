import axios from "axios";
import type { User } from "../types/user.type";

async function addNewUser(data: User) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_LOCALHOST_API}/users`,
      data
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

const userApi = {
  GET: getAllUser,
  POST: addNewUser,
};

export default userApi;
