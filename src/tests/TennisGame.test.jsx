import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TennisGame from "../components/TennisGame";
import { SCORE_NAMES, MESSAGES } from "../constants/constants";

describe("TennisGame scoring", () => {
  it("initial score is Love - Love", () => {
    render(<TennisGame />);
    expect(
      screen.getByText(`${SCORE_NAMES[0]} - ${SCORE_NAMES[0]}`),
    ).toBeInTheDocument();
  });

  it("player one scores first point", () => {
    render(<TennisGame />);
    fireEvent.click(screen.getByText(MESSAGES.BUTTON_P1));
    expect(
      screen.getByText(`${SCORE_NAMES[1]} - ${SCORE_NAMES[0]}`),
    ).toBeInTheDocument();
  });

  it("player two scores twice", () => {
    render(<TennisGame />);
    fireEvent.click(screen.getByText(MESSAGES.BUTTON_P2));
    fireEvent.click(screen.getByText(MESSAGES.BUTTON_P2));
    expect(
      screen.getByText(`${SCORE_NAMES[0]} - ${SCORE_NAMES[2]}`),
    ).toBeInTheDocument();
  });

  it("deuce situation at 40-40", () => {
    render(<TennisGame />);
    const p1 = screen.getByText(MESSAGES.BUTTON_P1);
    const p2 = screen.getByText(MESSAGES.BUTTON_P2);

    for (let i = 0; i < 3; i++) {
      fireEvent.click(p1);
      fireEvent.click(p2);
    }
    expect(screen.getByText(MESSAGES.DEUCE)).toBeInTheDocument();
  });

  it("advantage situation", () => {
    render(<TennisGame />);
    const p1 = screen.getByText(MESSAGES.BUTTON_P1);
    const p2 = screen.getByText(MESSAGES.BUTTON_P2);

    for (let i = 0; i < 3; i++) {
      fireEvent.click(p1);
      fireEvent.click(p2);
    }
    fireEvent.click(p1);
    expect(screen.getByText(MESSAGES.ADV_P1)).toBeInTheDocument();
  });

  it("player wins after advantage", () => {
    render(<TennisGame />);
    const p1 = screen.getByText(MESSAGES.BUTTON_P1);
    const p2 = screen.getByText(MESSAGES.BUTTON_P2);

    for (let i = 0; i < 3; i++) {
      fireEvent.click(p1);
      fireEvent.click(p2);
    }
    fireEvent.click(p1);
    fireEvent.click(p1);
    expect(screen.getByText(MESSAGES.WIN_P1)).toBeInTheDocument();
  });

  it("reset button appears after win", () => {
    render(<TennisGame />);
    const p1 = screen.getByText(MESSAGES.BUTTON_P1);
    for (let i = 0; i < 4; i++) fireEvent.click(p1);
    expect(screen.getByText(MESSAGES.WIN_P1)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES.RESET)).toBeInTheDocument();
  });

  it("reset button restores initial state", () => {
    render(<TennisGame />);
    const p1 = screen.getByText(MESSAGES.BUTTON_P1);
    for (let i = 0; i < 4; i++) fireEvent.click(p1);
    fireEvent.click(screen.getByText(MESSAGES.RESET));
    expect(
      screen.getByText(`${SCORE_NAMES[0]} - ${SCORE_NAMES[0]}`),
    ).toBeInTheDocument();
  });
});
