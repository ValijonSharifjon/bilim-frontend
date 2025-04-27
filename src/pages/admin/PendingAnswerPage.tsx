import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAnswerById } from "../../features/answers/answerByIdApi";
import apiClient from "../../features/auth/apiClient";
import styled from "styled-components";

interface Question {
  id: string;
  content: string;
}

interface Answer {
  id: string;
  content: string;
  question: Question;
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9f9ff;
  color: #212529;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #45a049;
  }
`;

export const PendingAnswerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState<Answer | null>(null);

  useEffect(() => {
    if (id) {
      fetchAnswerById(id)
        .then(setAnswer)
        .catch(console.error);
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      await apiClient.patch(`/admin/answers/check/${id}`, {
        status: 'CHECKED'
      });

      alert("Javob tekshirildi!");
      navigate("/admin/answers");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
    }
  };

  return (
    <Container>
      <Card>
        <h3>Savol:</h3>
        <p><strong>{answer?.question.content}</strong></p>
        <h3>Javob:</h3>
        <p>{answer?.content}</p>
      </Card>
      <Button onClick={handleSubmit}>
        Javobni tasdiqlash
      </Button>
    </Container>
  );
}
