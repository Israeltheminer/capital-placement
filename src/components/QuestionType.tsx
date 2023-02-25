import { Autocomplete, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import AppContext from '../AppContext';
import { Option } from '../types/interfaces';

const QuestionType = () => {
  const { options } = useContext(AppContext);
  const [value, setValue] = useState<Option>({ label: 'Paragraph' });

  return (
    <div className="question-type">
      <Typography
        variant="body1"
        style={{
          fontSize: '16px',
          color: '#000',
          fontWeight: '600',
          marginBottom: '8px',
        }}
      >
        Type
      </Typography>
      <Autocomplete
        disablePortal
        id="type-box"
        options={options}
        fullWidth={true}
        sx={{
          input: {
            color: '#979797',
            fontSize: '14px',
          },
        }}
        value={value}
        onChange={(event, newValue) => {
          if (newValue !== null) {
            setValue(newValue);
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};

export default QuestionType;
