import { TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import AppContext from '../AppContext';

const QuestionBox = () => {
   const { options, editNewQuetion, newQuestion, modal } = useContext(AppContext);

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
            value={newQuestion?.[modal.parent].question}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               editNewQuetion({ parent: modal.parent, key: 'question', payload: event.target.value });
            }}
         />
      </div>
   );
};

export default QuestionBox;
