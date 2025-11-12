import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

const ItemContainer = styled.div`
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: grab;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:active {
    cursor: grabbing;
    transform: scale(0.95);
  }

  ${({ isDragging }) =>
    isDragging &&
    `
    opacity: 0.4;
  `}
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const ItemLabel = styled.span`
  font-size: 0.9rem;
  text-align: center;
  margin-top: 6px;
`;

export default function GameItem({ item }) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "item", // 👈 precisa ser exatamente o mesmo aceito pelo RecycleBin
      item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item]
  );

  return (
    <ItemContainer ref={dragRef} isDragging={isDragging}>
      <ItemImage src={item.image} alt={item.name} />
      <ItemLabel>{item.name}</ItemLabel>
    </ItemContainer>
  );
}
