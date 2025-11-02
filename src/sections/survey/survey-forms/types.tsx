import z from 'zod'

export type SurveySchema = z.object({
  'question': z.string()
})

