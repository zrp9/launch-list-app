import react from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import * as material from '@mui/material';

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
  const [active, setActive] = react.useState(0);
  const isLoading = useBoolean(false);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = react.useState<string | null>(null);
  const onNext = async () => {
    const ok = await trigger(steps[active].questionIds as any, { shouldFocus: true });
    if (ok) setActive((i) => Math.min(i + 1, steps.length - 1));
  };
  const onBack = () => setActive((i) => Math.max(i - 1, 0));
  const isStepFailed = (step: number) => /* do some form check*/ step === 3;
  const onReset = () => setActive(0);
  const onSubmit = handleSubmit(async (vals) => {
    const anwsers = toAnwsers(vals, questionMap);
    isLoading.setValue(true);
    // send to api
    try {
      // username is user email just without domain
      await anwserSurvey(getValues('email'), anwsers)
        .then((res) => {
          // show a thank you card
          if (res) {
            enqueueSnackbar('Thank you for filling out our survye', { variant: 'success' });
          }
        })
        .finally(() => isLoading.setValue(false));
    } catch (err: any) {
      enqueueSnackbar(err?.error || err || 'Could not save survey please try again', {
        variant: 'error',
      });
    }
  });
  const questionMap = react.useMemo(
    () => new Map(survey.questions.map((q) => [q.id, q] as const)),
    [survey.questions]
  );

  return (
    <material.Container maxWidth="md" sx={{ py: 3 }}>
      <material.Card>
        <material.CardHeader
          title={<material.Typography>{`Step ${active} of ${steps.length}`}</material.Typography>}
        />
        <Form onSubmit={onSubmit} methods={methods}>
          <material.Stepper activeStep={active}>
            {steps.map((step, index) => {
              const labelProps: {
                optional?: react.ReactNode;
                error?: boolean;
              } = {};
              if (isStepFailed(index)) {
                labelProps.optional = (
                  <material.Typography variant="caption" color="error">
                    {error}
                  </material.Typography>
                );
              }
              return (
                <material.Step key={step.id}>
                  <material.StepLabel>{step.label}</material.StepLabel>
                </material.Step>
              );
            })}
          </material.Stepper>
          <material.Divider />
          <material.CardContent>
            <StepBody questions={questionMap} questionIds={steps[active].questionIds} />
          </material.CardContent>
          <material.CardActions>
            <material.Stack direction="row">
              {active === steps.length ? (
                <react.Fragment>
                  <material.Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </material.Typography>
                  <material.Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <material.Box sx={{ flex: '1 1 auto' }} />
                    <material.Button variant="soft" onClick={() => onReset()}>
                      Reset
                    </material.Button>
                    <material.Button variant="contained" onClick={onSubmit}>
                      Submit
                    </material.Button>
                  </material.Box>
                </react.Fragment>
              ) : (
                <react.Fragment>
                  <material.Typography sx={{ mt: 2, mb: 1 }}>Step {active + 1}</material.Typography>
                  <material.Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <material.Button
                      color="inherit"
                      variant="soft"
                      disabled={active === 0}
                      onClick={onBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </material.Button>
                    <material.Box sx={{ flex: '1 1 auto' }} />
                    <material.Button onClick={onNext} variant="contained">
                      {active === steps.length - 1 ? 'Finish' : 'Next'}
                    </material.Button>
                  </material.Box>
                </react.Fragment>
              )}
            </material.Stack>
          </material.CardActions>
        </Form>
      </material.Card>
    </material.Container>
  );
}
