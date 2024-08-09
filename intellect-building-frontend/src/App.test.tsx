import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header of first section", () => {
  render(<App />);
  const header = screen.getByText(/What We Do/i);
  expect(header).toBeDefined();
});
