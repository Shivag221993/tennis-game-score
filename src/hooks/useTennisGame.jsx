import { useReducer, useCallback } from "react";
import { SCORE_NAMES, MESSAGES } from "../constants/constants";

// Initial state of the game
// p1 = Player 1 score, p2 = Player 2 score
const initialState = { p1: 0, p2: 0 };

// Reducer function to handle all state transitions
// Centralizes updates instead of multiple useState calls
function reducer(state, action) {
  switch (action.type) {
    case "P1": // Player 1 scores a point
      return { ...state, p1: state.p1 + 1 };
    case "P2": // Player 2 scores a point
      return { ...state, p2: state.p2 + 1 };
    case "RESET": // Reset both scores back to 0
      return initialState;
    default: // Unknown action → return unchanged state
      return state;
  }
}

// Custom hook encapsulating tennis game logic
export function useTennisGame() {
  // useReducer manages both players’ scores in one place
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to calculate the current score string
  const getScore = () => {
    const { p1, p2 } = state;

    // Handle deuce/advantage/win scenarios when both players reach 3+
    if (p1 >= 3 && p2 >= 3) {
      if (p1 === p2) return MESSAGES.DEUCE; // Equal → Deuce
      if (p1 === p2 + 1) return MESSAGES.ADV_P1; // Player 1 advantage
      if (p2 === p1 + 1) return MESSAGES.ADV_P2; // Player 2 advantage
      if (p1 >= p2 + 2) return MESSAGES.WIN_P1; // Player 1 wins
      if (p2 >= p1 + 2) return MESSAGES.WIN_P2; // Player 2 wins
    }

    // Handle win conditions if one player reaches 4 points first
    if (p1 >= 4) return MESSAGES.WIN_P1;
    if (p2 >= 4) return MESSAGES.WIN_P2;

    // Default case: show score names (Love, Fifteen, etc.)
    return `${SCORE_NAMES[p1]} - ${SCORE_NAMES[p2]}`;
  };

  // Current score string
  const score = getScore();

  // Check if the game is over (someone has won)
  const gameOver = score.includes("Wins!");

  // Memoized event handlers using useCallback
  // Prevents unnecessary re-creations on re-renders
  const handleP1Score = useCallback(() => dispatch({ type: "P1" }), []);
  const handleP2Score = useCallback(() => dispatch({ type: "P2" }), []);
  const resetGame = useCallback(() => dispatch({ type: "RESET" }), []);

  // Return all useful values and handlers to the component
  return {
    score, // Current score string
    gameOver, // Boolean → true if someone has won
    handleP1Score, // Function → Player 1 scores
    handleP2Score, // Function → Player 2 scores
    resetGame, // Function → Reset game
  };
}
