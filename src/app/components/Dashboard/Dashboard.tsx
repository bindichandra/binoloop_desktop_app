import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DrawerMenu from "../Drawer/DrawerMenu";
import { RatingCount, Submission } from "../../model/submission";
import Search from "@mui/icons-material/Search";
import Header from "../Header/Header";
import SubmissionStats from "../SubmissionState/SubmissionState";
import {
  colors,
  projects,
  sortingTabs,
  tableHeaders,
} from "../../mocks/mockData";
import useScreenSize from "../../hooks/useScreenSize";

const excludedProperties = [
  "id",
  "name",
  "score",
  "submissionTime",
  "overallScore",
  "overallRating",
  "addToInterviewShortlist",
];

const Dashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<number>(1);
  const [selectedMainTab, setSelectedMainTab] = useState<number>(0);
  const [interviewShortlistCount, setInterviewShortlistCount] =
    useState<number>(0);

  const screenSize = useScreenSize();

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
    filterSubmissions(newValue);
  };

  const filterSubmissions = (selectedTab: number) => {
    switch (selectedTab) {
      case 0: // All
        setFilteredSubmissions(submissions);
        break;
      case 1: // Top 20
        const top20Submissions = [...submissions]
          .sort((a, b) => b.overallScore - a.overallScore)
          .slice(0, 20);
        setFilteredSubmissions(top20Submissions);
        break;
      case 2: // Excellent
        const excellentSubmissions = submissions.filter(
          (submission) => submission.overallRating === "Excellent"
        );
        setFilteredSubmissions(excellentSubmissions);
        break;
      case 3: // Good
        const goodSubmissions = submissions.filter(
          (submission) => submission.overallRating === "Good"
        );
        setFilteredSubmissions(goodSubmissions);
        break;
      case 4: // Satisfactory
        const satisfactorySubmissions = submissions.filter(
          (submission) => submission.overallRating === "Satisfactory"
        );
        setFilteredSubmissions(satisfactorySubmissions);
        break;
      case 5: // Needs Improvement
        const needsImprovementSubmissions = submissions.filter(
          (submission) => submission.overallRating === "Needs Improvement"
        );
        setFilteredSubmissions(needsImprovementSubmissions);
        break;
      default:
        break;
    }
  };

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = e.target.value.toLowerCase();
      setSearchTerm(searchText);
      const filtered = submissions.filter((submission) => {
        const nameMatch = submission.name.toLowerCase().includes(searchText);
        const scoreMatch = submission.overallScore
          .toString()
          .includes(searchText);
        const ratingMatch = submission.overallRating
          .toLowerCase()
          .includes(searchText);
        return nameMatch || scoreMatch || ratingMatch;
      });
      setFilteredSubmissions(filtered);
    },
    [submissions]
  );

  const countOverallRatings = (): RatingCount => {
    const counts = {
      Excellent: 0,
      Good: 0,
      Satisfactory: 0,
      "Needs Improvement": 0,
    };
    filteredSubmissions.forEach((submission: Submission) => {
      counts[submission.overallRating as keyof RatingCount]++;
    });
    return counts;
  };

  const overallRatingCounts: RatingCount = countOverallRatings();

  useEffect(() => {
    async function fetchSubmissionData() {
      try {
        setLoading(true);
        const result = await axios.get("/api/submissionData");
        if (result.status === 200) {
          const updatedSubmissions = result.data.map(
            (submission: Submission) => ({
              ...submission,
              overallScore:
                (submission.ragImplementation +
                  submission.fineTuningLanguageModel +
                  submission.multiModelAIIntegration +
                  submission.python +
                  submission.aIModel +
                  submission.analysingUserFeedback +
                  submission.problemSolving +
                  submission.teamWork +
                  submission.motivation) /
                9,
              overallRating: getOverallRating(
                (submission.ragImplementation +
                  submission.fineTuningLanguageModel +
                  submission.multiModelAIIntegration +
                  submission.python +
                  submission.aIModel +
                  submission.analysingUserFeedback +
                  submission.problemSolving +
                  submission.teamWork +
                  submission.motivation) /
                  9
              ),
            })
          );
          setSubmissions(updatedSubmissions);
          setFilteredSubmissions(updatedSubmissions);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchSubmissionData();
  }, []);

  // Function to get overall rating based on overall score
  const getOverallRating = (score: number) => {
    if (score < 50) return "Needs Improvement";
    if (score < 70) return "Satisfactory";
    if (score < 80) return "Good";
    return "Excellent";
  };

  const handleCheckboxChange = (checked: boolean) => {
    setInterviewShortlistCount((prevCount) =>
      checked ? prevCount + 1 : prevCount - 1
    );
  };

  const LoadingIndicator = () => (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
      Loading...
    </div>
  );

  return (
    <div className="tw-flex tw-mb-8">
      <DrawerMenu open={drawerOpen} setOpen={setDrawerOpen} />
      <Box className="tw-flex tw-flex-col tw-w-full tw-mx-4">
        <Header
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          selectedMainTab={selectedMainTab}
          setSelectedMainTab={setSelectedMainTab}
        />
        <SubmissionStats
          filteredSubmissions={filteredSubmissions}
          overallRatingCounts={overallRatingCounts}
          interviewShortlistCount={interviewShortlistCount}
        />
        <div className="tw-bg-white tw-py-3 tw-items-center tw-flex tw-flex-col md:tw-flex-row sm:tw-flex-col lg:tw-flex-row xl:tw-flex-row tw-justify-between">
          <Tabs
            value={selectedTab}
            orientation={screenSize.width < 1000 ? "vertical" : "horizontal"}
            onChange={(e, newValue) => handleTabChange(newValue)}
            indicatorColor="primary"
            TabIndicatorProps={{ style: { display: "none" } }}
            textColor="primary"
            aria-label="tabs"
            className="tw-bg-white tw-rounded-lg tw-gap-2"
          >
            {sortingTabs.map((tab, index) => (
              <Tab
                key={tab}
                label={tab}
                className={`tw-rounded-lg ${
                  selectedTab === index
                    ? "tw-bg-black tw-text-white"
                    : "tw-bg-transparent tw-text-gray-500"
                }`}
              />
            ))}
          </Tabs>

          <TextField
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Box className="tw-bg-white tw-shadow-md tw-p-4">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell
                      key={header}
                      className="tw-text-center tw-text-grey"
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="tw-text-center tw-text-black tw-w-28">
                      {submission.name}
                    </TableCell>
                    <TableCell className="tw-text-center tw-text-black tw-w-28">
                      {submission.submissionTime}
                    </TableCell>
                    <TableCell className="tw-text-center tw-text-black tw-w-28">
                      {submission.overallScore.toFixed(2)}
                    </TableCell>
                    <TableCell className="tw-text-center tw-text-black tw-w-28">
                      {submission.overallRating}
                    </TableCell>
                    {Object.entries(submission)
                      .filter(([key]) => !excludedProperties.includes(key))
                      .map(([subject, score]) => (
                        <TableCell key={subject} className="tw-text-center">
                          <span
                            className={`tw-inline-block tw-w-2.5 tw-h-2.5 tw-rounded-full`}
                            style={{
                              backgroundColor: colors[getOverallRating(score)],
                            }}
                          ></span>
                        </TableCell>
                      ))}
                    <TableCell className="tw-text-center">
                      <input
                        type="checkbox"
                        className="tw-w-4 tw-h-4 tw-bg-black"
                        onChange={(e) => handleCheckboxChange(e.target.checked)}
                        test-id="interview-shortlist-checkbox"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box></Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
