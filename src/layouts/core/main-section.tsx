import { useRef, useEffect } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import { styled } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useSurvey } from 'src/stores/survey-store';
import { useFeatures } from 'src/stores/feature-store';
import { useTestimonials } from 'src/stores/testimonial-store';

import { layoutClasses } from './classes';

export type MainSectionProps = React.ComponentProps<typeof MainRoot>;

export function MainSection({ children, className, sx, ...other }: MainSectionProps) {
  const featureStatus = useFeatures((s) => s.status);
  const loadFeatures = useFeatures((s) => s.actions.loadOnce);
  const executed = useRef(false);
  const surveyStatus = useSurvey((s) => s.status);
  const loadSurvey = useSurvey((s) => s.actions.loadOnce);
  const testimonialStatus = useTestimonials((s) => s.status);
  const loadTestimonials = useTestimonials((s) => s.actions.loadOnce);
  const features = useFeatures((s) => s.features);
  const survey = useSurvey((s) => s.survey);
  const testies = useTestimonials((s) => s.testimonials);
  const loading =
    featureStatus == 'loading' ||
    featureStatus === 'idle' ||
    surveyStatus === 'loading' ||
    surveyStatus === 'idle' ||
    testimonialStatus === 'loading' ||
    testimonialStatus === 'idle';

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!executed.current) {
        executed.current = true;
        await loadFeatures();
        await loadSurvey();
        await loadTestimonials();
      }
    };

    fetchData();
  }, [loadFeatures, loadSurvey, loadTestimonials]);

  console.log('features ', features);
  console.log('survey ', survey);
  console.log('testies ', testies);

  useEffect(() => {
    if (featureStatus === 'error' || surveyStatus === 'error' || testimonialStatus === 'error') {
      router.replace('/error/500');
    }
  }, [featureStatus, surveyStatus, testimonialStatus, router]);

  return (
    <MainRoot className={mergeClasses([layoutClasses.main, className])} sx={sx} {...other}>
      {!loading && children}
    </MainRoot>
  );
}

// ----------------------------------------------------------------------

const MainRoot = styled('main')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
});
