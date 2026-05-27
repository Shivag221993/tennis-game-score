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
});
