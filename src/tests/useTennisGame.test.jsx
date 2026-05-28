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
});
