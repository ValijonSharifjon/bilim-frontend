import axios from "axios";
import {API_BASE_URL} from "../config.ts";
import { getToken } from "../../utils/storage.ts";


export async function fetchAnswers() {
    const response = await axios.get(`${API_BASE_URL}/answers`);
    return response.data;
}

export async function fetchPendingAnswers() {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/admin/answers/pending`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}