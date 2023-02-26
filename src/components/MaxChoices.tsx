import { TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import AppContext from '../AppContext';

const MaxChoices = () => {
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
            Max choice allowed
         </Typography>
         <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth={true}
            placeholder="Enter number of choice allowed here"
            type="number"
            InputProps={{
               inputMode: 'numeric',
               sx: {
                  fontSize: '14px',
                  '::placeholder': {
                     color: '#979797',
                  },
               },
            }}
            value={newQuestion?.[modal.parent].maxChoices}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
               editNewQuetion({ parent: modal.parent, key: 'maxChoices', payload: event.target.valueAsNumber });
            }}
         />
      </div>
   );
};

export default MaxChoices;
