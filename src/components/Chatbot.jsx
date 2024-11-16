// src/components/Chatbot.js
import React from 'react';
import styled from 'styled-components';

const ChatbotContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const Chatbot = () => {
    const handleClick = () => {
        // Logic untuk membuka chatbot (misalnya modal atau dialog)
        alert('Chatbot opened!');
    };

    return (
        <ChatbotContainer onClick={handleClick}>
            <span>💬</span>
        </ChatbotContainer>
    );
};

export default Chatbot;
