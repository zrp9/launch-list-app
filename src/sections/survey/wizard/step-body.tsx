import type { ReactNode } from 'react';

import { Grid, Divider, MenuItem } from '@mui/material';

import { Field } from 'src/components/hook-form';

export type StepBodyProps = {
  questions: Map<string, SurveyQuestion>;
  questionIds: string[];
};
export function StepBody({ questions, questionIds }: StepBodyProps) {
  return (
    <Grid container spacing={2}>
      {questionIds.map((qid) => {
        const question = questions.get(qid)!;
        const options = question.options.map((op) => ({
          label: op.label,
          value: op.value,
        }));
        let field: ReactNode;
        switch (question.questionType) {
          case 'text':
            field = <Field.Text name={qid} label={question.prompt} />;
            break;
          case 'multi-check':
            field = <Field.MultiCheckbox name={qid} label={question.prompt} options={options} />;
            break;
          case 'drop-down':
            field = (
              <Field.Select name="singleSelect" label="Single select">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
            );
            break;
          default:
            field = <Field.RadioGroup name={qid} label={question.prompt} options={options} />;
            break;
        }
        return (
          <Grid key={qid} size={{ xs: 12, sm: 6 }}>
            {field}
          </Grid>
        );
      })}
    </Grid>
  );
}
