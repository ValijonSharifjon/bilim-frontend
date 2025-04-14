import axios from "axios";
import {API_BASE_URL} from "../config.ts";


export async function fetchAnswerById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/answers/${id}`);
    return response.data;
}
