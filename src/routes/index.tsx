import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import QuestionsPage from "../pages/QuestionsPage.tsx";
import AnswersPage from "../pages/AnswersPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import Layout from "../features/layout/Layout.tsx";
import Question from "../pages/QuestionPage.tsx";
import AnswerPage from "../pages/AnswerPage.tsx";
import CreateQuestion from "../pages/CreateQuestion.tsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="questions" element={<QuestionsPage />} />
                    <Route path="questions/:id" element={<Question />} />
                    <Route path="/ask" element={<CreateQuestion/>} />
                    <Route path="answers" element={<AnswersPage />} />
                    <Route path="answers/:id" element={<AnswerPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}