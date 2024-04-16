import React from "react";
import { Box, Select, MenuItem, Tabs, Tab, Avatar } from "@mui/material";
import { ExpandMore, Person } from "@mui/icons-material";
import useScreenSize from "../../hooks/useScreenSize";

interface HeaderProps {
  projects: string[];
  selectedProject: string;
  handleProjectChange: (name: string) => void;
  selectedMainTab: number;
  setSelectedMainTab: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  projects,
  selectedProject,
  handleProjectChange,
  selectedMainTab,
  setSelectedMainTab,
}) => {
  const screenSize = useScreenSize();
  return (
    <Box className="tw-bg-white tw-py-4 tw-mb-4 tw-flex tw-justify-between tw-items-center tw-flex-row">
      <Select
        value={selectedProject}
        onChange={(e) => handleProjectChange(e.target.value as string)}
        variant="standard"
        className="tw-text-22 tw-font-bold tw-w-48"
        disableUnderline={true}
        IconComponent={() => <ExpandMore fontSize="large" />}
      >
        {projects.map((project) => (
          <MenuItem key={project} value={project}>
            {project}
          </MenuItem>
        ))}
      </Select>

      <Tabs
        value={selectedMainTab}
        orientation={screenSize.width < 1000 ? "vertical" : "horizontal"}
        onChange={(e, newValue) => setSelectedMainTab(newValue)}
        indicatorColor="primary"
        TabIndicatorProps={{ style: { display: "none" } }}
        textColor="primary"
        aria-label="tabs"
        className="tw-bg-white tw-shadow-sm tw-rounded-lg"
      >
        {["Dashboard", "Submission"].map((tab, index) => (
          <Tab
            key={tab}
            label={tab}
            className={`tw-rounded-lg ${
              selectedMainTab === index
                ? "tw-bg-blue-100 tw-text-white"
                : "tw-bg-transparent tw-text-gray-500"
            }`}
          />
        ))}
      </Tabs>
      <Avatar>
        <Person />
      </Avatar>
    </Box>
  );
};

export default Header;
