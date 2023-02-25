import { TextField, Typography } from '@mui/material';

const QuestionBox = () => {
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
        Questions
      </Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth={true}
        placeholder="Type here"
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

export default QuestionBox;
