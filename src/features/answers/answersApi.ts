import axios from "axios";
import {API_BASE_URL} from "../config.ts";


export async function fetchAnswers() {
    const response = await axios.get(`${API_BASE_URL}/answers`);
    return response.data;
}
