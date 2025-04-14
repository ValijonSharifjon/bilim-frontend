import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchQuestions } from "../features/questions/questionsApi";

interface Question {
    id: string;
    content: string;
    createdAt: string;
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

const Card = styled.div`
  background: white;
  padding: 20px;
  margin: 10px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: left;
`;

const QuestionLink = styled(Link)`
  color: #333;
  font-weight: bold;
  text-decoration: none;
  display: block;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
  }
`;

const Timestamp = styled.span`
  display: block;
  font-size: 12px;
  color: #6c757d;
  margin-top: 8px;
`;


const QuestionsPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        async function loadQuestions() {
            try {
                const data = await fetchQuestions();
                setQuestions(data);
            } catch (error) {
                console.error("Error fetching questions", error);
            }
        }
        loadQuestions();
    }, []);

    return (
        <Container>
            <SectionTitle>Barcha savollar</SectionTitle>
            {questions.length > 0 ? (
                questions.map((q) => (
                    <Card key={q.id}>
                        <QuestionLink to={`/questions/${q.id}`}>{q.content}</QuestionLink>
                        <Timestamp>{new Date(q.createdAt).toLocaleString("uz-UZ")}</Timestamp>
                    </Card>
                ))
            ) : (
                <p>Hali savollar yo'q.</p>
            )}
        </Container>
    );
};

export default QuestionsPage;
