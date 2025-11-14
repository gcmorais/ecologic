import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameItem from "./components/GameItem";
import RecycleBin from "./components/RecycleBin";
import ScoreBoard from "./components/ScoreBoard";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 70vh;

  justify-content: ${(props) => (props.gameOver ? "center" : "space-between")};
  align-items: ${(props) => (props.gameOver ? "center" : "center")};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
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
  margin-top: 7rem;
`;

const BinsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const MessageBox = styled.div`
  text-align: center;
  background: #e8f5e9;
  border: 2px solid #4caf50;
  padding: 24px;
  border-radius: 12px;
  font-size: 1.2rem;
`;

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
  z-index: 999;
`;

const Popup = styled(motion.div)`
  background: #fff;
  padding: 24px 32px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #ff9800;
  font-size: 1.4rem;
  font-weight: 600;
  color: #6c4a00;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
`;

const ErrorPopup = styled(motion.div)`
  background: #ffebee;
  padding: 24px 32px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #f44336;
  font-size: 1.3rem;
  font-weight: 600;
  color: #b71c1c;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
`;

const Spinner = styled.div`
  width: 70px;
  height: 70px;
  border: 8px solid #ccc;
  border-top: 8px solid #0f5132;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const itemsList = [
  // Orgânicos
  { id: 1, type: "organico", image: "/images/banana.webp", name: "Casca de banana" },
  { id: 2, type: "organico", image: "/images/maca.webp", name: "Casca de maçã" },
  { id: 3, type: "organico", image: "/images/casca-laranja.webp", name: "Casca de laranja" },
  { id: 4, type: "organico", image: "/images/borra-cafe.png", name: "Borra de café" },
  { id: 5, type: "organico", image: "/images/resto-comida.png", name: "Resto de comida" },
  { id: 6, type: "organico", image: "/images/folha-vegetal.webp", name: "Folhas secas" },

  // Plásticos
  { id: 7, type: "plastico", image: "/images/garrafa.png", name: "Garrafa PET" },
  { id: 8, type: "plastico", image: "/images/sacola.png", name: "Sacola plástica" },
  { id: 9, type: "plastico", image: "/images/copinho.png", name: "Copinho plástico" },
  { id: 10, type: "plastico", image: "/images/tampinha.png", name: "Tampinha de garrafa" },
  { id: 11, type: "plastico", image: "/images/embalagem-shampoo.png", name: "Embalagem de shampoo" },
  { id: 12, type: "plastico", image: "/images/pote-margarina.png", name: "Pote de margarina" },

  // Papel
  { id: 13, type: "papel", image: "/images/jornal.png", name: "Jornal" },
  { id: 14, type: "papel", image: "/images/caixa.webp", name: "Caixa de papelão" },
  { id: 15, type: "papel", image: "/images/folha.webp", name: "Folha de papel" },
  { id: 16, type: "papel", image: "/images/rolo-papel.png", name: "Rolo de papel" },
  { id: 17, type: "papel", image: "/images/guardanapo.png", name: "Guardanapo usado" },
  { id: 18, type: "papel", image: "/images/envelope.webp", name: "Envelope" },

  // Metais
  { id: 19, type: "metal", image: "/images/lata.png", name: "Lata de refrigerante" },
  { id: 20, type: "metal", image: "/images/prego.png", name: "Prego" },
  { id: 21, type: "metal", image: "/images/tampa.webp", name: "Tampa metálica" },
  { id: 22, type: "metal", image: "/images/colher.png", name: "Colher de alumínio" },
  { id: 23, type: "metal", image: "/images/anel-lata.webp", name: "Anel de lata" },
  { id: 24, type: "metal", image: "/images/fio-cobre.webp", name: "Fio de cobre" },
];

export default function App() {
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [level, setLevel] = useState(1);
  const [lastLevel, setLastLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const [levelMessage, setLevelMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 🔴 NOVO

  const [loading, setLoading] = useState(false);

  const itemsPerRound = 4;

  const getNextItems = () => {
    const remaining = itemsList.filter((i) => !completed.includes(i.id));
    const shuffled = remaining.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, itemsPerRound);
  };

  useEffect(() => {
    setVisibleItems(getNextItems());
  }, []);

  const handleDrop = (item, targetType) => {
    if (item.type === targetType) {
      setScore((s) => s + 5);

      setCompleted((prev) => {
        const updated = [...prev, item.id];
        const newLevel = Math.floor(updated.length / 8) + 1;

        if (newLevel > lastLevel) {
          setLevel(newLevel);
          setLastLevel(newLevel);

          setLevelMessage(`🎉 Parabéns! Você chegou ao nível ${newLevel}!`);
          setTimeout(() => setLevelMessage(""), 2500);
        }

        return updated;
      });
    } else {
      setScore((s) => Math.max(0, s - 2));

      setErrorMessage("❌ Item colocado no lixo errado!");
      setTimeout(() => setErrorMessage(""), 2500);
    }
  };

  useEffect(() => {
    if (completed.length === itemsList.length) {
      setGameOver(true);
      return;
    }

    if (visibleItems.every((i) => completed.includes(i.id)) && !loading) {
      const next = getNextItems();
      if (next.length > 0) {
        setLoading(true);
        setTimeout(() => {
          setVisibleItems(next);
          setLoading(false);
        }, 2500);
      }
    }
  }, [completed]);

  const reset = () => {
    setScore(0);
    setCompleted([]);
    setLevel(1);
    setLastLevel(1);
    setGameOver(false);
    setLevelMessage("");
    setErrorMessage("");
    setVisibleItems(getNextItems());
    setLoading(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="cloud"
        style={{
          top: "12%",
          width: "280px",
          height: "140px",
          backgroundImage: "url('/images/bg/cloud1.webp')",
          animation: "cloud-move 45s linear infinite",
        }}
      />

      <div className="bird" />
        
      <div
        className="cloud"
        style={{
          top: "28%",
          width: "350px",
          height: "180px",
          opacity: 0.75,
          backgroundImage: "url('/images/bg/cloud2.webp')",
          animation: "cloud-move 55s linear infinite",
        }}
      />

      <div
        className="cloud"
        style={{
          top: "20%",
          width: "350px",
          height: "180px",
          opacity: 0.75,
          backgroundImage: "url('/images/bg/cloud2.webp')",
          animation: "cloud-move 30s linear infinite",
        }}
      />
      

      
      <Header>
        <Title initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          ♻️ Ecologic — Nível {level}
        </Title>

        <ScoreBoard score={score} reset={reset} />
      </Header>

      {levelMessage && (
        <Overlay>
          <Popup initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            {levelMessage}
          </Popup>
        </Overlay>
      )}

      {errorMessage && (
        <Overlay>
          <ErrorPopup initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            {errorMessage}
          </ErrorPopup>
        </Overlay>
      )}

      {loading && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}

      <Container
        gameOver={gameOver}
        key={loading ? "loading" : "content"}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {gameOver ? (
          <MessageBox>
            <p>🏆 Você reciclou todos os itens!</p>
            <p>Pontuação final: <b>{score}</b></p>
            <button
              onClick={reset}
              style={{
                marginTop: "12px",
                padding: "10px 18px",
                background: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Jogar novamente
            </button>
          </MessageBox>
        ) : !loading ? (
          <>
            <ItemsRow>
              {visibleItems
                .filter((it) => !completed.includes(it.id))
                .map((it) => (
                  <GameItem key={it.id} item={it} />
                ))}
            </ItemsRow>

            <BinsRow>
              <RecycleBin type="organico" label="Orgânico" image="/images/bins/verde.png" onDrop={handleDrop} />
              <RecycleBin type="plastico" label="Plástico" image="/images/bins/vermelha.png" onDrop={handleDrop} />
              <RecycleBin type="papel" label="Papel" image="/images/bins/azul.png" onDrop={handleDrop} />
              <RecycleBin type="metal" label="Metal" image="/images/bins/amarela.png" onDrop={handleDrop} />
            </BinsRow>
          </>
        ) : null}
      </Container>
    </DndProvider>
  );
}
