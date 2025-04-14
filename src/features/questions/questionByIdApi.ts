import axios from "axios";
import {API_BASE_URL} from "../config.ts";


export async function fetchQuestionById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/questions/${id}`);
    return response.data;
}
