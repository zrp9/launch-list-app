import { Container, Typography, CircularProgress } from '@mui/material';

import { useSurvey } from 'src/stores/survey-store';

import { SurveyWizard } from '../wizard';

export function SurveyView() {
  const survey = useSurvey((s) => s.survey);
  return (
    <Container>
      <Typography>Help us improve Alessor</Typography>

      {survey == null && <CircularProgress />}
      {survey != null && <SurveyWizard survey={survey} />}
    </Container>
  );
}
