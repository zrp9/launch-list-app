import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Collapse } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/global-config';
import { getFeatureImages } from 'src/lib/utils';
import { useFeatures } from 'src/stores/feature-store';
import { ArrowUpIcon } from 'src/theme/core/components/mui-x-data-grid';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { varFade, MotionViewport } from 'src/components/animate';
import { RotateButton } from 'src/components/rotate-button/RotateButton';
import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';

export function AboutFeatures({ sx, ...other }: BoxProps) {
  const router = useRouter();
  const features = useFeatures((state) => state.features);
  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
    },
  });

  return (
    <Box
      component="section"
      sx={[{ overflow: 'hidden' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Container component={MotionViewport} sx={{ textAlign: 'center', py: { xs: 10, md: 15 } }}>
        <m.div variants={varFade('inDown')}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Features
          </Typography>
        </m.div>

        <m.div variants={varFade('inUp')}>
          <Typography variant="h2" sx={{ my: 3 }}>
            Lessor — Simple property and project management for landlords who do it all.
          </Typography>
        </m.div>

        <m.div variants={varFade('inUp')}>
          <Typography sx={{ mx: 'auto', maxWidth: 640, color: 'text.secondary' }}>
            A lightweight platform built for small landlords and restoration pros who manage rentals
            and get their hands dirty. Track expenses, create bids, collect rent, and handle taxes —
            all in one place.
          </Typography>
        </m.div>

        <Box sx={{ position: 'relative' }}>
          <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

          <Carousel carousel={carousel} sx={{ px: 0.5 }}>
            {features.map((feat, index) => (
              <Box
                key={feat.id}
                component={m.div}
                variants={varFade('in')}
                sx={{ py: { xs: 8, md: 10 } }}
              >
                <FeatureCard feature={feat} index={index} />
              </Box>
            ))}
          </Carousel>
        </Box>

        <Button
          size="large"
          color="inherit"
          variant="outlined"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={24} />}
          sx={{ mx: 'auto' }}
          onClick={() => router.push('/features')}
        >
          All features
        </Button>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type FeatureCardProps = {
  feature: Feature;
  index: number;
};

function FeatureCard({ feature, index }: FeatureCardProps) {
  const expanded = useBoolean(false);
  // maybe pass icon and color in
  const icon = `${CONFIG.assetsDir}/assets/icons/courses/ic-courses-certificates.svg`;
  return (
    <Card>
      <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
        {feature.name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {feature.title}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {feature.quickDescription}
      </Typography>

      <Box
        sx={(theme) => ({
          top: -44,
          width: 160,
          zIndex: -1,
          height: 160,
          right: -104,
          opacity: 0.12,
          borderRadius: 3,
          position: 'absolute',
          transform: 'rotate(40deg)',
          background: `linear-gradient(to right, ${theme.vars.palette['warning'].main}, transparent)`,
        })}
      />

      <Box sx={{ px: 1 }}>
        <Collapse in={expanded.value} timeout="auto" unmountOnExit>
          <Image
            alt={feature.name}
            src={getFeatureImages(feature.img)}
            ratio="1/1"
            sx={{ borderRadius: 2 }}
          />
        </Collapse>
      </Box>

      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button onClick={() => expanded.onToggle()}>Learn More</Button>
        <RotateButton
          rotate={expanded.value}
          aria-expanded={expanded.value}
          aria-label="show more"
          onClick={() => expanded.onToggle()}
        >
          <ArrowUpIcon />
        </RotateButton>
      </Box>
    </Card>
  );
}
