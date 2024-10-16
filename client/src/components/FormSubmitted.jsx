import { Snackbar, SnackbarContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function FormSubmitted({ open, setOpen, message }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <SnackbarContent
        message={message}
        action={action}
        sx={{ backgroundColor: 'white', color: 'black' }}
      />
    </Snackbar>
  );
}

export default FormSubmitted;