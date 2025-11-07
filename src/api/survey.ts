import axiosInstance, { endpoints } from 'src/lib/axios';

type SurveyData = {
  survey: Survey;
};

export async function getSurvey() {
  const url = `${endpoints.survey.fetch}`;
  const { data } = await axiosInstance.get<SurveyData>(url);
  return data?.survey ?? null;
}

// either create a token for user when they register or just make a single "app" token for all usrs
export async function anwserSurvey(
  usrname: string,
  anwsers: Omit<SurveyResponse, 'id' | 'question' | 'User' | 'questionOption'>[]
) {
  const token = sessionStorage.getItem('token');
  const url = `${endpoints.survey.respond}${usrname}`;
  const { data } = await axiosInstance.post(url, anwsers, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
