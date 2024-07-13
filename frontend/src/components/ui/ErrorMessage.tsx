import { Box, Typography } from '@mui/material';

const ErrorMessage = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="body1"
        color="error"
        sx={{ textAlign: 'center' }}
      >
        Something went wrong. Please try again later.
      </Typography>
    </Box>
  );
};

export default ErrorMessage;