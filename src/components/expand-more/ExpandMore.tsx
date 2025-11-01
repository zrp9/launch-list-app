import type { IconButtonProps } from '@mui/material';

import { styled, IconButton } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(90deg)',
        animationDuration: 'initial',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
  ],
}));
