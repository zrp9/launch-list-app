import type { IconButtonProps } from '@mui/material';

import { styled, IconButton } from '@mui/material';

interface RotateButtonProps extends IconButtonProps {
  rotate: boolean;
}

export const RotateButton = styled((props: RotateButtonProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { rotate, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ rotate }) => !rotate,
      style: {
        transform: 'rotate(90deg)',
        animationDuration: 'initial',
      },
    },
    {
      props: ({ rotate }) => !!rotate,
      style: {
        transform: 'rotate(0deg)',
      },
    },
  ],
}));
