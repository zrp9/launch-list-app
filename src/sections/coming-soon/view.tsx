import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { varAlpha } from 'minimal-shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBoolean, useCountdownDate } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

import { useRouter } from 'src/routes/hooks';

import { _socials } from 'src/_mock';
import { ComingSoonIllustration } from 'src/assets/illustrations';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export const SubscribeSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});

type SubscribeSchemaType = z.infer<typeof SubscribeSchema>;

export function ComingSoonView() {
  const countdown = useCountdownDate(new Date('2026-08-20 20:30'));
  const mtheme = useTheme();
  const router = useRouter();
  const onSubscribe = () => {};
  const defaultValue = { email: '' };
  const methods = useForm<SubscribeSchemaType>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: defaultValue,
    mode: 'onTouched',
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const loading = useBoolean(isSubmitting);

  return (
    <Container>
      <Typography variant="body1" sx={{ mb: 1 }}>
        V1 Coming soon!
      </Typography>

      <Typography variant="h3" sx={{ color: 'text.primary', mb: 1 }}>
        <Box component="span" sx={{ color: `${mtheme.palette.primary.main}` }}>
          Restoration{' '}
        </Box>{' '}
        and
        <Box component="span" sx={{ color: `${mtheme.palette.primary.main}` }}>
          {' '}
          property{' '}
        </Box>{' '}
        management made
        <Box component="span" sx={{ color: `${mtheme.palette.primary.main}` }}>
          {' '}
          simple.
        </Box>
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>
        Alessor centralizes every project from bidding to completion, helping you work faster and
        stay organized.
      </Typography>

      <ComingSoonIllustration sx={{ my: { xs: 4, sm: 6 } }} />

      <Stack
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2', justifyContent: 'center', flexDirection: 'row' }}
      >
        <TimeBlock label="days" value={countdown.days} />
        <TimeBlock label="hours" value={countdown.hours} />
        <TimeBlock label="minutes" value={countdown.minutes} />
        <TimeBlock label="seconds" value={countdown.seconds} />
      </Stack>

      <Form onSubmit={handleSubmit(onSubscribe)} methods={methods}>
        <TextField
          fullWidth
          placeholder="Enter your email"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" size="large">
                    Notify me
                  </Button>
                </InputAdornment>
              ),
              sx: [
                (theme) => ({
                  pr: 0.5,
                  [`&.${outlinedInputClasses.focused}`]: {
                    boxShadow: theme.vars.customShadows.z20,
                    transition: theme.transitions.create(['box-shadow'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                    [`& .${outlinedInputClasses.notchedOutline}`]: {
                      border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
                    },
                  },
                }),
              ],
            },
          }}
          sx={{ mt: 5, mb: 3 }}
        />
      </Form>
      <Button variant="soft" fullWidth sx={{ mb: 2 }} onClick={() => router.push('/about-us')}>
        Learn More
      </Button>
      <Box sx={{ gap: 1, display: 'flex', justifyContent: 'center' }}>
        {_socials.map((social) => (
          <IconButton key={social.label}>
            {social.value === 'twitter' && <Iconify icon="socials:twitter" />}
            {social.value === 'facebook' && <Iconify icon="socials:facebook" />}
            {social.value === 'instagram' && <Iconify icon="socials:instagram" />}
            {social.value === 'linkedin' && <Iconify icon="socials:linkedin" />}
          </IconButton>
        ))}
      </Box>
    </Container>
  );
}

type TimeBlockProps = {
  label: string;
  value: string;
};

function TimeBlock({ label, value }: TimeBlockProps) {
  return (
    <div>
      <div> {value} </div>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
