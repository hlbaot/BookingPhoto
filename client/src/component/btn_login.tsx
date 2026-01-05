'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormSignIn from './signIn';
import FormSignUp from './signUp';

const ButtonLogin = () => {
  const [mode, setMode] = useState<"signin" | "signup" | null>(null);
  // khóa scroll khi mở modal
  useEffect(() => {
    if (mode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // cleanup khi component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mode]);

  return (
    <StyledWrapper>
      <button onClick={() => setMode("signin")}>
        <span>Login</span>
      </button>

      {mode && (
        <ModalOverlay onClick={() => setMode(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {mode === "signin" && <FormSignIn switchToSignUp={() => setMode("signup")} />}
            {mode === "signup" && <FormSignUp switchToSignIn={() => setMode("signin")} />}
          </ModalContent>
        </ModalOverlay>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    border: none;
    border-radius: 20px;
    background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    transition: all 1.5s ease;
    font-family: 'Ropa Sans', sans-serif;
    font-weight: bold;
    letter-spacing: 0.05rem;
    padding: 0;
    cursor: pointer;
  }

  button span {
    display: inline-block;
    padding: 5px 25px;
    font-size: 17px;
    border-radius: 20px;
    background: #ffffff10;
    backdrop-filter: blur(20px);
    transition: 0.4s ease-in-out;
    transition-property: color;
    height: 100%;
    width: 100%;
  }

  button span:hover {
    backdrop-filter: blur(0px);
    color: #ffffff;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* để modal nổi trên cùng */
`;

const ModalContent = styled.div`
  border-radius: 12px;
  padding: 20px;
  min-width: 300px;
  z-index: 1000;
`;

export default ButtonLogin;
