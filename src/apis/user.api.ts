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

const userApi = {
  POST: addNewUser,
};

export default userApi;
