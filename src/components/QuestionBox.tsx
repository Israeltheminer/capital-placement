import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import AppContext from '../AppContext';
import { FormLabel } from './Choices';

const disqualifyCheckboxLabel = { inputProps: { 'aria-label': 'choice' } };

const QuestionBox = ({ error }: { error: boolean }) => {
   const { options, editNewQuetion, newQuestion, modal } = useContext(AppContext);
   const [checked, setChecked] = useState(false);

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
            Question
         </Typography>
         <TextField
            id="outlined-basic"
            variant="outlined"
            error={error}
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
            value={newQuestion?.[modal.parent].question}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               editNewQuetion({ parent: modal.parent, key: 'question', payload: event.target.value });
            }}
         />
         {newQuestion?.[modal.parent].type === 'yesNo' ? (
            <div className="ml-5 mt-2">
               <FormControlLabel
                  {...disqualifyCheckboxLabel}
                  control={
                     <Checkbox
                        size="small"
                        checked={checked}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                           setChecked(event.target.checked);
                           editNewQuetion({ parent: modal.parent, key: 'disqualify', payload: checked });
                        }}
                        sx={{
                           padding: 0,
                           color: '#D4D9E4',
                           '&.Mui-checked': {
                              color: '#087B2F',
                           },
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                     />
                  }
                  label={<FormLabel label="Disqualify candidate if the answer is no" />}
               />
            </div>
         ) : (
            <></>
         )}
      </div>
   );
};

export default QuestionBox;
