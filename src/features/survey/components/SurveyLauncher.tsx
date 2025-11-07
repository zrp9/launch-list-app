import { Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

export function SurveyLauncher() {
  const router = useRouter();
  return (
    <Button variant="soft" onClick={() => router.push('/survey')}>
      Take Our Survey
    </Button>
  );
}
