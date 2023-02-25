import { TextField, Typography } from '@mui/material';

const MaxChoices = () => {
  return (
    <div>
      <Typography
        variant="body1"
        style={{
          fontSize: '16px',
          color: '#000',
          fontWeight: '600',
          marginBottom: '8px',
        }}
      >
        Max choice allowed
      </Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth={true}
        placeholder="Enter number of choice allowed here"
        InputProps={{
          sx: {
            fontSize: '14px',
            '::placeholder': {
              color: '#979797',
            },
          },
        }}
      />
    </div>
  );
};

export default MaxChoices;
