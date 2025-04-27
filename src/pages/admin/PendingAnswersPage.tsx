import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAnswers, fetchPendingAnswers } from "../../features/answers/answersApi.ts";
import { Link } from "react-router-dom";

interface Question {
    id: string;
    content: string;
}

interface Answer {
  id: string;
  content: string;
  questionId: string;
  authorId: string;
  status: string;
  createdAt: Date; 
  updatedAt: Date;
  question: {
    id: string;
    content: string;
    authorId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
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

const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #846ded;
`;

const AnswerCardLink = styled(Link)`
  background: white;
  padding: 20px;
  margin: 10px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: left;
  text-decoration: none;
`;

const QuestionTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const AnswerText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 10px 0;
`;

const Timestamp = styled.small`
  display: block;
  font-size: 12px;
  color: #6c757d;
  margin-top: 8px;
`;

const PendingAnswersPage = () => {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
      fetchPendingAnswers()
            .then(setAnswers)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container>
            <SectionTitle>Javoblar</SectionTitle>
            {loading && <p>Yuklanmoqda...</p>}
            {error && <p>Xatolik: {error}</p>}
            {!loading && !error && answers.length > 0 ? (
                answers.map((answer) => (
                    <AnswerCardLink to={`/admin/answers/${answer.id}`} key={answer.id}>
                        <QuestionTitle>{answer.question.content}</QuestionTitle>
                        <AnswerText>{answer.content}</AnswerText>
                        <Timestamp>{new Date(answer.createdAt).toLocaleString("uz-UZ")}</Timestamp>
                    </AnswerCardLink>
                ))
            ) : (
                <p>Hali javoblar yo'q.</p>
            )}
        </Container>
    );
};

export default PendingAnswersPage;
