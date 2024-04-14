import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  test("renders correctly", () => {
    const { container } = render(
      <Header
        projects={[]}
        selectedProject={0}
        setSelectedProject={jest.fn()}
        selectedMainTab={1}
        setSelectedMainTab={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
