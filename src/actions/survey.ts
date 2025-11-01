import axiosInstance, { endpoints } from 'src/lib/axios';

type SurveyData = {
  survey: Survey;
};

export async function getSurvey() {
  const url = `${endpoints.survey.fetch}`;
  const { data } = await axiosInstance.get<SurveyData>(url);
  return data?.survey ?? null;
}

export async function anwserSurvey(usrname: string) {
  const url = `${endpoints.survey.respond}${usrname}`;
  const { data } = await axiosInstance.post(url);
  return data;
}
