import React, { useEffect } from 'react'
import {Snackbar} from '@mui/material';
import { Alert } from '@mui/material';

const ErrorPrompt = ({message}: {message: string}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ErrorPrompt;