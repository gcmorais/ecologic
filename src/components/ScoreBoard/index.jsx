import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  background: #ffffff;
  padding: 10px 16px;
  border-radius: 999px;
  box-shadow: 0 6px 14px rgba(2,6,23,0.06);
  display: flex;
  gap: 12px;
  align-items: center;
  font-weight: 700;
`;

const Btn = styled.button`
  background: #0f5132;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
`;

export default function ScoreBoard({ score, reset }) {
  return (
    <Wrap>
      <div>Pontuação: {score} ⭐</div>
      <Btn onClick={reset}>Reiniciar</Btn>
    </Wrap>
  );
}
