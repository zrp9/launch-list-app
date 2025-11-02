export type StepDef = { id: string; label: string; questionIds: string[] };

export function makeSteps(survey: Survey): StepDef[] {
  const ids = survey.questions.sort((a, b) => a.position - b.position).map((q) => q.id);
  const chunk = (arr: string[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, (i + 1) * size)
    );

  const groups = chunk(ids, 3);
  return groups.map((g, i) => ({ id: `s${i + 1}`, label: `Step ${i + 1}`, questionIds: g }));
}
