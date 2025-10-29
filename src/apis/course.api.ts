import axios from "axios";
import type { Course } from "../types/course.type";

async function addNewCourse(data: Course) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_LOCALHOST_API}/courses`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getAllCourse() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_LOCALHOST_API}/courses`
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
async function updateCourse(data: Course) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_LOCALHOST_API}/courses/${data.id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteCourse(data: Course) {
  try {
    await axios.delete(
      `${import.meta.env.VITE_LOCALHOST_API}/courses/${data.id}`
    );
    return data.id;
  } catch (err) {
    console.log(err);
  }
}

const courseApi = {
  GET: getAllCourse,
  POST: addNewCourse,
  PUT: updateCourse,
  DELETE: deleteCourse,
};

export default courseApi;
