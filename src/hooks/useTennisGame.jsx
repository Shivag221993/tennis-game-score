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
  // Return all useful values and handlers to the component
  return {
    score, // Current score string
    gameOver, // Boolean → true if someone has won
    handleP1Score, // Function → Player 1 scores
    handleP2Score, // Function → Player 2 scores
    resetGame, // Function → Reset game
  };
}
