import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';

const choiceCheckboxLabel = { inputProps: { 'aria-label': 'choice' } };
const FormLabel = ({ label }: { label: string }) => {
  return (
    <Typography
      variant="body1"
      style={{ fontSize: '14px', color: '#000', marginLeft: '6px' }}
    >
      {label}
    </Typography>
  );
};

const Choices = () => {
  return (
    <div>
      <div className="px-7 mb-4 relative">
        <img
          src="/unorderedList.svg"
          alt=""
          className="absolute left-0 top-12 scale-90"
        />
        <img
          src="/plus.svg"
          alt=""
          className="absolute right-0 top-12 scale-90"
        />
        <Typography
          variant="body1"
          style={{
            fontSize: '16px',
            color: '#000',
            fontWeight: '500',
            marginBottom: '8px',
          }}
        >
          Choice
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
      <FormControlLabel
        {...choiceCheckboxLabel}
        control={
          <Checkbox
            size="small"
            sx={{
              padding: 0,
              color: '#D4D9E4',
              '&.Mui-checked': {
                color: '#087B2F',
              },
            }}
          />
        }
        label={<FormLabel label="Enable “Other” option" />}
      />
    </div>
  );
};

export default Choices;
