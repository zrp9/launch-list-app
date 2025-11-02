import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  Stack,
  Button,
  Divider,
  Container,
  CardHeader,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material';

import { anwserSurvey } from 'src/api/survey';

import { Form } from 'src/components/hook-form';

import { makeSteps } from './steps';
import { StepBody } from './step-body';
import { toAnwsers, buildSurveySchema, buildDefaultValues } from '../schema';

export function SurveyWizard({ survey }: { survey: Survey }) {
  const schema = buildSurveySchema(survey);
  const methods = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
    defaultValues: buildDefaultValues(survey),
    mode: 'onTouched',
  });
  const { trigger, handleSubmit, getValues } = methods;
  const steps = makeSteps(survey);
  const [active, setActive] = useState(0);
  const isLoading = useBoolean(false);
  const { enqueueSnackbar } = useSnackbar();
  const onNext = async () => {
    const ok = await trigger(steps[active].questionIds as any, { shouldFocus: true });
    if (ok) setActive((i) => Math.min(i + 1, steps.length - 1));
  };
  const onBack = () => setActive((i) => Math.max(i - 1, 0));
  const onSubmit = handleSubmit(async (vals) => {
    const anwsers = toAnwsers(vals, questionMap);
    isLoading.setValue(true);
    // send to api
    try {
      // username is user email just withut domain

      await anwserSurvey(getValues('email'), anwsers)
        .then((res) => {
          // show a thank you card
        })
        .finally(() => isLoading.setValue(false));
    } catch (err: any) {
      enqueueSnackbar(err?.error || err || 'Could not save survey please try again', {
        variant: 'error',
      });
    }
  });
  const questionMap = useMemo(
    () => new Map(survey.questions.map((q) => [q.id, q] as const)),
    [survey.questions]
  );

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Card>
        <CardHeader title={<Typography>{`Step ${active} of ${steps.length}`}</Typography>} />
        <Divider />
        <CardContent>
          <Form onSubmit={onSubmit} methods={methods}>
            <StepBody questions={questionMap} questionIds={steps[active].questionIds} />
          </Form>
        </CardContent>
        <CardActions>
          <Stack direction="row">
            <Button type="button" variant="soft" onClick={onBack} disabled={active === 0}>
              Back
            </Button>
            {active < steps.length - 1 ? (
              <Button type="button" variant="contained" onClick={onNext}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={onSubmit}>
                Submit
              </Button>
            )}
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
}
