import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchQuestions } from "../features/questions/questionsApi";
import { fetchAnswers } from "../features/answers/answersApi";

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
`;

const Section = styled.section`
  padding: 50px 40px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #333;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  margin: 10px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  text-align: left;
`;

const QuestionLink = styled(Link)`
  color: #846ded;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 12px 20px;
  background: #846ded;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

const Footer = styled.footer`
  background: #846ded;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
`;

const HomePage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        fetchQuestions().then(setQuestions).catch(console.error);
        fetchAnswers().then(setAnswers).catch(console.error);
    }, []);

    return (
        <Container>
            <Section>
                <SectionTitle>Biz haqimizda</SectionTitle>
                <p>
                    <b>Bilim Top</b> - bu oʻquvchilar va oʻqituvchilar uchun bilim almashish platformasi.
                    Oʻzingizga qiziq boʻlgan savollarni bering va boshqalarga yordam bering!
                </p>
            </Section>

            <Section>
                <SectionTitle>Oxirgi savollar</SectionTitle>
                {questions.slice(0, 3).map((q) => (
                    <Card key={q.id}>
                        <QuestionLink to={`/questions/${q.id}`}>{q.content}</QuestionLink>
                    </Card>
                ))}
                <ViewAllButton to="/questions">Barcha savollarni koʻrish →</ViewAllButton>
            </Section>

            <Section>
                <SectionTitle>Oxirgi javoblar</SectionTitle>
                {answers.slice(0, 3).map((a) => (
                    <Card key={a.id}>
                        <p><strong>Savol:</strong> {a.question.content}</p>
                        <p>{a.content.length > 100 ? `${a.content.slice(0, 100)}...` : a.content}</p>
                        <QuestionLink to={`/answers/${a.id}`}>Batafsil →</QuestionLink>
                    </Card>
                ))}
                <ViewAllButton to="/answers">Barcha javoblarni koʻrish →</ViewAllButton>
            </Section>

            <Footer>
                <p>© {new Date().getFullYear()} Bilim Top | Barcha huquqlar himoyalangan.</p>
            </Footer>
        </Container>
    );
};

export default HomePage;
