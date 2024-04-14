import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import SubmissionState from "./SubmissionState";

describe("SubmissionState component", () => {
  test("renders correctly", () => {
    const { container } = render(
      <SubmissionState
        filteredSubmissions={[]}
        overallRatingCounts={{
          Excellent: 1,
          Good: 1,
          Satisfactory: 2,
          "Needs Improvement": 2,
        }}
        interviewShortlistCount={1}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
