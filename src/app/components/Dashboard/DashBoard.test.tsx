import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import axios from "axios";

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
        id: 1,
        name: "John Doe",
        submissionTime: "2021-09-01T12:00:00Z",
        overallScore: 0,
        overallRating: "",
        ragImplementation: 40,
        fineTuningLanguageModel: 35,
        multiModelAIIntegration: 40,
        python: 30,
        aIModel: 25,
        analysingUserFeedback: 35,
        problemSolving: 40,
        teamWork: 40,
        motivation: 35,
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

  test("handles fetch error", async () => {
    const errorMessage = "Failed to fetch data";
    // Mock axios.get method to throw an error
    const mockedAxiosGet = jest.spyOn(axios, "get");
    mockedAxiosGet.mockRejectedValueOnce(new Error(errorMessage));
    render(<Dashboard />);
    mockedAxiosGet.mockRestore();
  });
});
