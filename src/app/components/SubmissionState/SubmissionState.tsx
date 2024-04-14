import React from "react";
import { RatingCount, Submission } from "../../model/submission";
import { Box } from "@mui/material";
import { backgroundColors, colors } from "../../mocks/mockData";

interface SubmissionStatsProps {
  filteredSubmissions: Submission[];
  overallRatingCounts: RatingCount;
  interviewShortlistCount: number;
}

const SubmissionStats: React.FC<SubmissionStatsProps> = ({
  filteredSubmissions,
  overallRatingCounts,
  interviewShortlistCount,
}) => {
  return (
    <Box className="tw-flex-col md:tw-flex-row sm:tw-flex-col lg:tw-flex-row xl:tw-flex-row tw-flex tw-gap-4 tw-my-4">
      {/* Total */}
      <Box className="tw-bg-gradient-to-br tw-from-blue-500 tw-to-teal tw-shadow-md tw-w-72 tw-h-40 tw-rounded-xl tw-items-center tw-flex-col tw-flex tw-justify-center">
        <span className={`tw-text-center tw-text-white tw-text-lg tw-mb-2`}>
          Total
        </span>
        <span
          className={`tw-text-center tw-text-white tw-text-5xl tw-font-bold`}
        >
          {filteredSubmissions.length}
        </span>
      </Box>

      {/* Percentage Assessed */}
      <Box className=" tw-shadow-md tw-w-72 tw-h-40 tw-rounded-xl tw-items-center tw-flex-col tw-flex tw-justify-center">
        <span className={`tw-text-center tw-text-grey tw-text-lg tw-mb-2`}>
          Percentage Assessed
        </span>
        <span
          className={`tw-text-center tw-text-blue-500 tw-text-5xl tw-font-bold`}
        >
          100%
          <span
            className={`tw-text-center tw-bg-blue-200 tw-text-blue-100 tw-text-xs tw-p-1 tw-ml-2`}
          >
            18/18
          </span>
        </span>
      </Box>

      {/* Submission Quality */}
      <Box className="tw-bg-white tw-shadow-md tw-flex-grow  md:tw-h-40 sm:tw-h-0 lg:tw-h-40 xl:tw-h-40 tw-rounded-xl tw-justify-center tw-flex tw-flex-col ">
        <span className="tw-text-center tw-text-grey tw-text-lg">
          Submission Quality
        </span>

        <div className="tw-grid tw-grid-cols-2 tw-gap-0 tw-m-4 md:tw-grid-cols-4 sm:tw-grid-cols-2 lg:tw-grid-cols-4 xl:tw-grid-cols-4">
          {Object.entries(overallRatingCounts).map(([rating, count]) => (
            <div
              key={rating}
              className={`tw-flex tw-bg-opacity-200 tw-items-center tw-justify-center tw-p-4 tw-flex-col `}
              style={{
                backgroundColor: backgroundColors[rating],
                color: colors[rating],
              }}
            >
              <span className={`tw-text-center tw-text-md `}>{rating}</span>
              <span className={`tw-text-center tw-text-md`}>{count}</span>
            </div>
          ))}
        </div>
      </Box>

      {/* Interview Shortlist */}
      <Box className=" tw-shadow-md tw-w-72 tw-h-40 tw-rounded-xl tw-items-center tw-flex-col tw-flex tw-justify-center">
        <span className={`tw-text-center tw-text-grey tw-text-lg tw-mb-2`}>
          Interview Shortlist
        </span>
        <span
          className={`tw-text-center tw-text-blue-500 tw-text-5xl tw-font-bold`}
        >
          {interviewShortlistCount}
        </span>
      </Box>
    </Box>
  );
};

export default SubmissionStats;
