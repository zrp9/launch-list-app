import { CONFIG } from 'src/global-config';

import { OverviewCourseView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

const metadata = { title: `Course | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <OverviewCourseView />
    </>
  );
}
