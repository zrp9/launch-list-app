import { CONFIG } from 'src/global-config';

import { SurveyView } from 'src/sections/survey/view';

const metadata = { title: `Survey - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>
      <SurveyView />
    </>
  );
}
