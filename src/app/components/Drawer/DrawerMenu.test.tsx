import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import DrawerMenu from "./DrawerMenu";

describe("DrawerMenu component", () => {
  test("renders correctly", () => {
    const { container } = render(
      <DrawerMenu open={false} setOpen={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
