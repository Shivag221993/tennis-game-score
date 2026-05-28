import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTennisGame } from "../hooks/useTennisGame";
import { SCORE_NAMES, MESSAGES } from "../constants/constants";

describe("useTennisGame hook", () => {
  it("initial score is Love - Love", () => {
    const { result } = renderHook(() => useTennisGame());
    expect(result.current.score).toBe(`${SCORE_NAMES[0]} - ${SCORE_NAMES[0]}`);
    expect(result.current.gameOver).toBe(false);
  });

  it("player one scores first point", () => {
    const { result } = renderHook(() => useTennisGame());
    act(() => result.current.handleP1Score());
    expect(result.current.score).toBe(`${SCORE_NAMES[1]} - ${SCORE_NAMES[0]}`);
  });

  it("player two scores twice", () => {
    const { result } = renderHook(() => useTennisGame());
    act(() => result.current.handleP2Score());
    act(() => result.current.handleP2Score());
    expect(result.current.score).toBe(`${SCORE_NAMES[0]} - ${SCORE_NAMES[2]}`);
  });

  it("deuce situation at 40-40", () => {
    const { result } = renderHook(() => useTennisGame());
    for (let i = 0; i < 3; i++) {
      act(() => result.current.handleP1Score());
      act(() => result.current.handleP2Score());
    }
    expect(result.current.score).toBe(MESSAGES.DEUCE);
  });

  it("advantage situation for Player 1", () => {
    const { result } = renderHook(() => useTennisGame());
    for (let i = 0; i < 3; i++) {
      act(() => result.current.handleP1Score());
      act(() => result.current.handleP2Score());
    }
    act(() => result.current.handleP1Score());
    expect(result.current.score).toBe(MESSAGES.ADV_P1);
  });

  it("player wins after advantage", () => {
    const { result } = renderHook(() => useTennisGame());
    for (let i = 0; i < 3; i++) {
      act(() => result.current.handleP1Score());
      act(() => result.current.handleP2Score());
    }
    act(() => result.current.handleP1Score()); // Advantage
    act(() => result.current.handleP1Score()); // Win
    expect(result.current.score).toBe(MESSAGES.WIN_P1);
    expect(result.current.gameOver).toBe(true);
  });

  it("reset restores initial state", () => {
    const { result } = renderHook(() => useTennisGame());
    for (let i = 0; i < 4; i++) {
      act(() => result.current.handleP1Score());
    }
    expect(result.current.score).toBe(MESSAGES.WIN_P1);
    act(() => result.current.resetGame());
    expect(result.current.score).toBe(`${SCORE_NAMES[0]} - ${SCORE_NAMES[0]}`);
    expect(result.current.gameOver).toBe(false);
  });
});
