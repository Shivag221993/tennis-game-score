import { MESSAGES } from "../constants/constants";
import { useTennisGame } from "../hooks/useTennisGame";
import "./TennisGame.css";

export default function TennisGame() {
  const { score, gameOver, handleP1Score, handleP2Score, resetGame } =
    useTennisGame();

  return (
    <div className="tennis-container">
      <h1 className="score">{score}</h1>
      <div className="buttons">
        <button onClick={handleP1Score} disabled={gameOver}>
          {MESSAGES.BUTTON_P1}
        </button>
        <button onClick={handleP2Score} disabled={gameOver}>
          {MESSAGES.BUTTON_P2}
        </button>
        {gameOver && (
          <button className="reset-btn" onClick={resetGame}>
            {MESSAGES.RESET}
          </button>
        )}
      </div>
    </div>
  );
}
