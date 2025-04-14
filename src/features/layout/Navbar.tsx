import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext.tsx";

const NavbarSection = styled.nav`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #846ded;
  text-decoration: none;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 16px;

  a {
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition: 0.3s;
  }

  a:first-child {
    background: #846ded;
    color: white;
  }

  a:nth-child(2) {
    color: #846ded;
  }

  a:nth-child(3) {
    color: #846ded;
  }
  

  a:hover {
    opacity: 0.8;
  }
`;

const UserSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  
  a {
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition: 0.3s;
  }
  
  a:first-child {
    background: #846ded;
    color: white;
  }

  a:nth-child(3) {
    color: #846ded;
  }

  a:hover {
    opacity: 0.8;
  }
`;

const UserName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #846ded;
`;

const LogoutButton = styled.button`
  padding: 8px 16px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #e60000;
  }
`;

const getUsername = (email: string) => email.replace("@gmail.com", "");

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <NavbarSection>
            <Logo to="/">Bilim Top</Logo>
            {user ? (
                <UserSection>
                    <Link to={user ? '/ask' : '/login'}>Savol berish</Link>
                    <UserName>{getUsername(user.email)}</UserName>
                    <LogoutButton onClick={logout}>Chiqish</LogoutButton>
                </UserSection>
            ) : (
                <NavButtons>
                    <Link to={user ? '/ask' : '/login'}>Savol berish</Link>
                    <Link to="/login">Kirish</Link>
                    <Link to="/register">Roʻyxatdan oʻtish</Link>
                </NavButtons>
            )}
        </NavbarSection>
    );
};

export default Navbar;
