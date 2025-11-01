import 'src/global.css';

import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';

import { usePathname } from 'src/routes/hooks';

import { themeConfig, ThemeProvider } from 'src/theme';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

import { UserStoreProvider } from './stores/user-store';
import { SurveyStoreProvider } from './stores/survey-store';
import { FeatureStoreProvider } from './stores/feature-store';
import { TestimonialStoreProvider } from './stores/testimonial-store';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();

  return (
    <AuthProvider>
      <SettingsProvider defaultSettings={defaultSettings}>
        <SnackbarProvider>
          <FeatureStoreProvider>
            <UserStoreProvider>
              <SurveyStoreProvider>
                <TestimonialStoreProvider>
                  <ThemeProvider
                    modeStorageKey={themeConfig.modeStorageKey}
                    defaultMode={themeConfig.defaultMode}
                  >
                    <MotionLazy>
                      <ProgressBar />
                      <SettingsDrawer defaultSettings={defaultSettings} />
                      {children}
                    </MotionLazy>
                  </ThemeProvider>
                </TestimonialStoreProvider>
              </SurveyStoreProvider>
            </UserStoreProvider>
          </FeatureStoreProvider>
        </SnackbarProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
