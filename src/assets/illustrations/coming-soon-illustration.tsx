import type { SvgIconProps } from '@mui/material/SvgIcon';

import { memo } from 'react';

import SvgIcon from '@mui/material/SvgIcon';

import { CONFIG } from 'src/global-config';

import { BackgroundShape } from './background-shape';

// ----------------------------------------------------------------------

type SvgProps = SvgIconProps & { hideBackground?: boolean };

function ComingSoonIllustration({ hideBackground, sx, ...other }: SvgProps) {
  const renderCharacterImage = () => (
    <image
      href={`${CONFIG.assetsDir}/assets/images/house-illustration-2-tp.webp`}
      height="550"
      x="-40"
      y="-90"
    />
  );

  return (
    <SvgIcon
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      sx={[
        (theme) => ({
          '--primary-light': theme.vars.palette.primary.light,
          '--primary-main': theme.vars.palette.primary.main,
          '--primary-dark': theme.vars.palette.primary.dark,
          '--primary-darker': theme.vars.palette.primary.darker,
          width: 320,
          maxWidth: 1,
          flexShrink: 0,
          height: 'auto',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {!hideBackground && <BackgroundShape />}

            <defs>
        <linearGradient
          id="paint0_linear_1_79"
          x1="296.527"
          x2="105.126"
          y1="186.371"
          y2="167.19"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--primary-main)" />
          <stop offset="1" stopColor="var(--primary-dark)" />
        </linearGradient>
      </defs>

      {renderCharacterImage()}
    </SvgIcon>
  );
}

export default memo(ComingSoonIllustration);
