import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import apiClient from "../../features/auth/apiClient";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  color: #846ded;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #846ded;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const AskQuestionPage = () => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!content.trim()) return alert("Savolingizni kiriting!");

        try {
            await apiClient.post("/questions/create", {
                content,
            });

            alert("Savolingiz yuborildi!");
            setContent("");
            navigate("/questions");
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
            alert("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
        }
    };

    return (
        <Container>
            <Title>Savol berish</Title>
            <TextArea
                placeholder="Savolingizni yozing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <SubmitButton onClick={handleSubmit}>Yuborish</SubmitButton>
        </Container>
    );
};

export default AskQuestionPage;
