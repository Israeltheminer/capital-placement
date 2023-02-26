import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useCallback, useContext, useState, useEffect } from 'react';
import AppContext from '../AppContext';
import generateUUID from '../utils/uuid';

const choiceCheckboxLabel = { inputProps: { 'aria-label': 'choice' } };
const FormLabel = ({ label }: { label: string }) => {
   return (
      <Typography variant="body1" style={{ fontSize: '14px', color: '#000', marginLeft: '6px' }}>
         {label}
      </Typography>
   );
};

const Choices = () => {
   const { editNewQuetion, newQuestion, modal } = useContext(AppContext);
   const [newChoice, setNewChoice] = useState('');
   const [choices, setChoices] = useState<{ id: string; choice: string }[]>([]);
   useEffect(() => {
      const newChoices = newQuestion?.[modal.parent].choices.map((choice) => {
         return {
            choice,
            id: generateUUID(),
         };
      });
      setChoices(() => [...newChoices]);
   }, []);
   const addChoice = useCallback(() => {
      if (newChoice.trim().length) {
         setChoices((prev) => [
            ...prev,
            {
               id: generateUUID(),
               choice: newChoice,
            },
         ]);
         setNewChoice(() => '');
      }
   }, [newChoice]);
   const removeChoice = useCallback((pointId: string) => {
      setChoices((prev) => {
         const newChoices = prev.filter((choice) => {
            console.log(pointId, choice.id);
            return choice.id !== pointId;
         });
         return newChoices;
      });
   }, []);

   return (
      <div className="relative">
         <img src="/unorderedList.svg" alt="" className="absolute left-0 bottom-[60px] scale-90" />
         <img src="/plus.svg" alt="" className="absolute right-0 bottom-[60px] scale-90 cursor-pointer z-10" onClick={addChoice} />
         <div className="px-7 mb-4 relative">
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
            {choices.length ? (
               <div className="my-2 w-full max-h-[60px] overflow-y-auto">
                  {choices.map((item) => (
                     <div className="flex items-center justify-between max-h-6" key={item.id}>
                        <Typography
                           variant="body1"
                           style={{
                              fontSize: '12px',
                              color: '#000',
                              fontWeight: '400',
                              display: 'inline',
                           }}
                        >
                           {item.choice}
                        </Typography>
                        <img src="/delete.svg" alt="" className="scale-[0.6] cursor-pointer" onClick={() => removeChoice(item.id)} />
                     </div>
                  ))}
               </div>
            ) : (
               ''
            )}
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
               value={newChoice}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setNewChoice(() => event.target.value);
               }}
            />
         </div>
         <FormControlLabel
            {...choiceCheckboxLabel}
            control={
               <Checkbox
                  size="small"
                  checked={newQuestion?.[modal.parent].other}
                  onChange={() => {
                     editNewQuetion({ parent: modal.parent, key: 'other' });
                  }}
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
