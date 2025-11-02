import { z } from 'zod';

export type SurveyFormValues = Record<string, string | string[]>;

type FieldRule = { required?: boolean; min?: number; max?: number; pattern?: string };

function rules(q: SurveyQuestion): FieldRule {
  return (q.metaData as FieldRule) ?? {};
}

export function buildSurveySchema(survey: Survey) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const q of survey.questions) {
    const rule = rules(q);
    switch (q.questionType) {
      case 'text': {
        const min = rule?.min ? rule.min : 1;
        const max = rule?.max ? rule.max : 255;
        let s = z.string();
        s = s.min(min, `Min ${rule.min}`);
        s = s.max(max, `Max ${rule.max}`);
        if (rule.pattern) s = s.regex(new RegExp(rule.pattern), `Invalid format`);
        shape[q.id] = s.default('');
        break;
      }
      case 'multi-check': {
        const min = rule?.min ? rule.min : 1;
        const max = rule?.max ? rule.max : 3;
        let s = z.array(z.string());
        s = s.min(min, `Pick at least ${min}`);
        s = s.max(max, `Pick at most ${rule.max}`);
        shape[q.id] = s.default([]);
        break;
      }
      case 'drop-down': {
        //select single
        shape[q.id] = z.string().default('');
        break;
      }
      //default checkbox
      default: {
        const s = z.string().default('');
        shape[q.id] = s;
      }
    }
  }

  return z.object(shape);
}

export function buildDefaultValues(survey: Survey): Record<string, any> {
  const val: Record<string, any> = {};
  for (const q of survey.questions) {
    if (q.questionType === 'multi-check') val[q.id] = [];
    else val[q.id] = '';
  }
  return val;
}

export function toAnwsers(
  payload: Record<string, any>,
  questionsMap: Map<string, SurveyQuestion>
): Omit<SurveyResponse, 'id' | 'question' | 'User' | 'questionOption'>[] {
  const anwsers: any[] = [];
  for (const [questionId, val] of Object.entries(payload)) {
    const q = questionsMap.get(questionId) as SurveyQuestion;
    if (!q) continue;
    if (q.questionType === 'text') {
      if (String(val ?? '').length) {
        anwsers.push({
          questionId,
          optionId: '',
          writtenResponse: String(val),
        });
      }
    } else if (q.questionType === 'multi-check') {
      for (const optionId of (val as string[]) ?? []) {
        anwsers.push({ questionId, optionId, writtenResponse: '' });
      }
    } else {
      if (val) anwsers.push({ questionId, optionId: String(val), writtenResponse: '' });
    }
  }
  return anwsers;
}
