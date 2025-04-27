import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";
import QuestionsPage from "../pages/question/QuestionsPage.tsx";
import AnswersPage from "../pages/answer/AnswersPage.tsx";
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import Layout from "../features/layout/Layout.tsx";
import Question from "../pages/question/QuestionPage.tsx";
import AnswerPage from "../pages/answer/AnswerPage.tsx";
import CreateQuestion from "../pages/question/CreateQuestion.tsx";
import PendingAnswersPage from "../pages/admin/PendingAnswersPage.tsx";
import { PendingAnswerPage } from "../pages/admin/PendingAnswerPage.tsx";

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
                    <Route path="/admin/answers" element={<PendingAnswersPage/>} />
                    <Route path="/admin/answers/:id" element={<PendingAnswerPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}