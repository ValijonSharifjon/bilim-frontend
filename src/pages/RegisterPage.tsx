import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useAuth} from "../context/AuthContext.tsx";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #846ded;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #846ded;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: bold;

  &:hover {
    background: #0056b3;
  }
`;

const FooterText = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #6c757d;
`;

const RegisterPage = () => {
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(email, password);
            navigate("/");
        } catch (error) {
            alert("Xatolik yuz berdi! Qayta urinib ko'ring.");
        }
    };

    return (
        <Container>
            <Card>
                <Title>Roʻyxatdan oʻtish</Title>
                <Input
                    type="email"
                    placeholder="Email manzilingiz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Parol"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleRegister}>Roʻyxatdan oʻtish</Button>
                <FooterText>
                    Allaqachon akkauntingiz bormi? <Link to="/login">Kirish</Link>
                </FooterText>
            </Card>
        </Container>
    );
};

export default RegisterPage;
