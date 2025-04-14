import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {fetchAnswerById} from "../features/answers/answerByIdApi.ts";

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
`;


const AnswerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [answer, setAnswer] = useState<Answer | null>(null);

    useEffect(() => {
        if (id) {
            fetchAnswerById(id)
                .then(setAnswer)
                .catch(console.error);
        }
    }, [id]);

    if (!answer) {
        return <Container>Yuklanmoqda...</Container>;
    }

    return (
        <Container>
            <Card>
                <h3>Savol:</h3>
                <p><strong>{answer.question.content}</strong></p>
                <h3>Javob:</h3>
                <p>{answer.content}</p>
            </Card>
        </Container>
    );
};

export default AnswerPage;
