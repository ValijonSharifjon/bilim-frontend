import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {fetchQuestionById} from "../features/questions/questionByIdApi.ts";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
`;

const AnswerButton = styled.button`
  background: #846DED;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background: #6d5ad2;
  }
`;

const QuestionPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Получаем ID из URL
    const [question, setQuestion] = useState<{ id: string; content: string } | null>(null);

    useEffect(() => {
        if (id) {
            fetchQuestionById(id).then(setQuestion).catch(console.error);
        }
    }, [id]);

    if (!question) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container>
            <Title>Savol:</Title>
            <p>{question.content}</p>
            <AnswerButton>Javob berish</AnswerButton>
        </Container>
    );
};

export default QuestionPage;
