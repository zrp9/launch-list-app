import z from 'zod';

export const SurveySchema = z.object({
  question: z.string(),
});
