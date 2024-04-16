import "@testing-library/jest-dom";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import axios from "axios";
import { TabsProps } from "@mui/material";

jest.mock("axios");

describe("Dashboard component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock calls after each test case
  });

  test("Renders correctly", () => {
    const { container } = render(<Dashboard />);
    expect(container).toMatchSnapshot();
  });

  test("Fetch data correctly", async () => {
    const mockData = [
      {
        project: "Project 1",
        submissions: [
          {
            id: 1,
            name: "Rhea Johnson",
            submissionTime: "2021-09-01T12:00:00Z",
            overallScore: 0,
            overallRating: "",
            ragImplementation: 40,
            fineTuningLanguageModel: 39,
            multiModelAIIntegration: 30,
            python: 70,
            aIModel: 45,
            analysingUserFeedback: 65,
            problemSolving: 35,
            teamWork: 25,
            motivation: 30,
          },
        ],
      },
    ];

    // Mock axios.get method
    const mockedAxiosGet = jest.spyOn(axios, "get");
    mockedAxiosGet.mockResolvedValueOnce({ data: mockData });

    // Render the component
    render(<Dashboard />);

    // Wait for the loading spinner or UI element to disappear
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // Restore the mocked axios.get method
    mockedAxiosGet.mockRestore();
  });

  test("Handles fetch error", async () => {
    const errorMessage = "Failed to fetch data";
    // Mock axios.get method to throw an error
    const mockedAxiosGet = jest.spyOn(axios, "get");
    mockedAxiosGet.mockRejectedValueOnce(new Error(errorMessage));
    render(<Dashboard />);
    mockedAxiosGet.mockRestore();
  });

  test("Handle tab change function", async () => {
    const { getByTestId, getByText } = render(<Dashboard />);
    expect(getByTestId("sorting-tabs")).toBeInTheDocument();
    fireEvent.click(getByText("All"));
  });
  test("Handle search function", async () => {
    const { getByPlaceholderText } = render(<Dashboard />);
    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "John" } });
  });
});
