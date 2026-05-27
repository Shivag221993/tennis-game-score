import { MESSAGES } from "../constants/constants";
import { useTennisGame } from "../hooks/useTennisGame";
import "./TennisGame.css";

export default function TennisGame() {
  const { gameOver, resetGame } = useTennisGame();

  return (
    <div className="tennis-container">
      <div className="buttons">
        <button>{MESSAGES.BUTTON_P1}</button>
        <button>{MESSAGES.BUTTON_P2}</button>
        {gameOver && (
          <button className="reset-btn" onClick={resetGame}>
            {MESSAGES.RESET}
          </button>
        )}
      </div>
    </div>
  );
}
