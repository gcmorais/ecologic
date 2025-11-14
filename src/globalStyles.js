import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body, #root { height: 100%; }

  body {
    font-family: "Inter", sans-serif;
    background: linear-gradient(180deg, #a8e6ff 0%, #d0f4ff 60%, #c8f7c5 100%);
    overflow: hidden;
    position: relative;
  }

  .cloud {
    position: fixed;
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.85;
    z-index: -1;
  }

  @keyframes cloud-move {
    0% { transform: translateX(-400px); }
    100% { transform: translateX(2000px); }
  }

  .bird {
    position: fixed;
    top: 10%;              
    width: 120px;
    height: 80px;
    background: url("/images/bg/passarinho.gif") no-repeat center/contain;
    z-index: -1;

    opacity: 0;

    animation: bird-fly 35s linear infinite;
    animation-delay: 200s;

    animation-fill-mode: forwards;
    animation-play-state: paused;
    animation: appear 0.1s linear forwards 12s, bird-fly 35s linear infinite 12s;
  }

  @keyframes appear {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes bird-fly {
    0%   { transform: translateX(-300px) translateY(0); }
    20%  { transform: translateX(400px) translateY(-10px); }
    40%  { transform: translateX(900px) translateY(5px); }
    60%  { transform: translateX(1300px) translateY(-10px); }
    100% { transform: translateX(2000px) translateY(0); }
  }
`;

export default GlobalStyle;
