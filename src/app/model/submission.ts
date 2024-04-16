export interface Submission {
  project: string;
  submissions: SubmissionData[];
}

export interface SubmissionData {
  id: number;
  name: string;
  submissionTime: string;
  overallScore: number;
  overallRating: string;
  ragImplementation: number;
  fineTuningLanguageModel: number;
  multiModelAIIntegration: number;
  python: number;
  aIModel: number;
  analysingUserFeedback: number;
  problemSolving: number;
  teamWork: number;
  motivation: number;
}
export interface RatingCount {
  Excellent: number;
  Good: number;
  Satisfactory: number;
  "Needs Improvement": number;
}
