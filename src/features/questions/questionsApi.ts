import axios from "axios";
import {API_BASE_URL} from "../config.ts";


export async function fetchQuestions() {
    const response = await axios.get(`${API_BASE_URL}/questions`);
    return response.data;
}
