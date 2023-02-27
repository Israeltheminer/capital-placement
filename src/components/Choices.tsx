import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useCallback, useContext, useState, useEffect } from 'react';
import AppContext from '../AppContext';

const choiceCheckboxLabel = { inputProps: { 'aria-label': 'choice' } };

export const FormLabel = ({ label }: { label: string }) => {
   return (
      <Typography variant="body1" style={{ fontSize: '12px', color: '#000', marginLeft: '6px' }}>
         {label}
      </Typography>
   );
};

const Choices = ({ error }: { error: boolean }) => {
   const { editNewQuetion, newQuestion, modal } = useContext(AppContext);
   const [newChoice, setNewChoice] = useState('');
   const [checked, setChecked] = useState(false);
   const [choices, setChoices] = useState<string[]>(newQuestion?.[modal.parent].choices);
   const addChoice = useCallback(() => {
      if (newChoice.trim().length) {
         setChoices((prev) => [...prev, newChoice]);
         setNewChoice(() => '');
      }
   }, [newChoice]);
   const removeChoice = useCallback((pointId: number) => {
      setChoices((prev) => {
         const newChoices = prev.filter((_, index) => {
            return index !== pointId;
         });
         return newChoices;
      });
   }, []);
   useEffect(() => {
      editNewQuetion({ parent: modal.parent, key: 'choices', payload: choices });
   }, [choices]);
   return (
      <div className="relative">
         <img src="/unorderedList.svg" alt="" className="absolute left-0 bottom-[60px] scale-90" />
         <img
            src="/plus.svg"
            alt=""
            className="absolute right-0 bottom-[60px] scale-90 cursor-pointer z-10"
            onClick={addChoice}
         />
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
                  {choices.map((item, index) => (
                     <div className="flex items-center justify-between max-h-6" key={index}>
                        <Typography
                           variant="body1"
                           style={{
                              fontSize: '12px',
                              color: '#000',
                              fontWeight: '400',
                              display: 'inline',
                           }}
                        >
                           {item}
                        </Typography>
                        <img
                           src="/delete.svg"
                           alt=""
                           className="scale-[0.6] cursor-pointer"
                           onClick={() => removeChoice(index)}
                        />
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
               error={error}
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
                  checked={checked}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                     setChecked(event.target.checked);
                     editNewQuetion({ parent: modal.parent, key: 'other', payload: checked });
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
            label={<FormLabel label="Enable “Other” option" />}
         />
      </div>
   );
};

export default Choices;
