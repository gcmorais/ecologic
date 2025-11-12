import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameItem from "./components/GameItem";
import RecycleBin from "./components/RecycleBin";
import ScoreBoard from "./components/ScoreBoard";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  flex-direction: column;
  gap: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width:100%;
  gap: 18px;
`;

const Title = styled(motion.h1)`
  color: #0f5132;
  font-size: 2rem;
  font-weight: 800;
`;

const ItemsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
`;

const BinsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const itemsList = [
  { id: 1, type: "organico", image: "/images/banana.webp", name: "Casca de banana" },
  { id: 2, type: "plastico", image: "/images/garrafa.png", name: "Garrafa PET" },
  { id: 3, type: "papel", image: "/images/jornal.png", name: "Jornal/Revista" },
  { id: 4, type: "metal", image: "/images/lata.png", name: "Lata" },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState([]);

  const handleDrop = (item, targetType) => {
    // item is the full item object from drag
    if (item.type === targetType) {
      setScore((s) => s + 10);
      setCompleted((c) => [...c, item.id]);
    } else {
      // setScore((s) => (s > 0 ? s - 5 : 0));
      console.log("Item colocado na lixeira errada!");
    }
  };

  const reset = () => {
    setScore(0);
    setCompleted([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header>
          <Title initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            ♻️ Ecologic
          </Title>
        <ScoreBoard score={score} reset={reset} />
      </Header>
      <Container>
        <ItemsRow>
          {itemsList.map(
            (it) => !completed.includes(it.id) && <GameItem key={it.id} item={it} />
          )}
        </ItemsRow>

        <BinsRow>
          <RecycleBin
  type="organico"
  label="Orgânico"
  image="/images/bins/verde.png"
  onDrop={handleDrop}
/>
<RecycleBin
  type="plastico"
  label="Plástico"
  image="/images/bins/vermelha.png"
  onDrop={handleDrop}
/>
<RecycleBin
  type="papel"
  label="Papel"
  image="/images/bins/azul.png"
  onDrop={handleDrop}
/>
<RecycleBin
  type="metal"
  label="Metal"
  image="/images/bins/amarela.png"
  onDrop={handleDrop}
/>
        </BinsRow>
      </Container>
    </DndProvider>
  );
}
