import styled from "styled-components";
import { useDrop } from "react-dnd";

const BinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const BinImage = styled.img`
  width: 200px;   /* largura fixa */
  height: 200px;  /* altura fixa */
  object-fit: contain; /* mantém a proporção */
`;

export default function RecycleBin({ type, label, image, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => onDrop(item, type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <BinContainer ref={drop} style={{ opacity: isOver ? 0.7 : 1 }}>
      <BinImage src={image} alt={label} />
      <span>{label}</span>
    </BinContainer>
  );
}
