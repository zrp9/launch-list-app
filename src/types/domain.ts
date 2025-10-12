type User = {
  id: string;
  email: string; // vchar 150
  username: string; // vchar 150
  phone: string; // varchar 12
  firstName: string; // vchar 100
  lastName: string; // vchar 100
  role: Role;
  wouldUse: boolean;
  comments: string; // text
  companyName: string; // vchar150
  quePosition: number;
  surveys: Survey;
  //referals: []Referal
  referalUrl: string; // vchar 255
};

type Role = {
  id: string;
  name: string; // vchar 255
  permissions: string; // enum
};

type Feature = {
  id: string;
  title: string; // vchar150
  name: string; // vchar150
  details: string; // text
  quickDescription: string; // text
};

type Survey = {
  id: string;
  questions: SurveyQuestion[];
  version: string; // vchar 75
  name: string; // vchar 255
  active: boolean;
};

type SurveyQuestion = {
  id: string;
  surveyId: string;
  questionType: 'check' | 'multi-check' | 'drop-down' | 'text'; // question type
  options: SurveyQuestionOption[];
  prompt: string; // text
  position: number;
  active: boolean;
  metaData: Record<string, any>;
};

type SurveyQuestionOption = {
  id: string;
  questionId: string;
  position: number;
  label: string; // vchar 255
  value: string; // vchar 255
};

type SurveyResponse = {
  id: string;
  questionId: string;
  userId: string;
  optionId: string;
  question: SurveyQuestion;
  User: User;
  questionOption: SurveyQuestionOption;
  writtenResponse: string; // text
};
