import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { QuestionDetails } from '../ts';

interface Props {
   type: 'personal' | 'additional' | 'profile';
   detail: QuestionDetails;
}

const FormLabel = ({ label }: { label: string }) => {
   return (
      <Typography variant="body1" style={{ fontSize: '12px', color: '#666666', marginLeft: '6px' }}>
         {label}
      </Typography>
   );
};

const AntSwitch = styled(Switch)(({ theme }) => ({
   width: 28,
   height: 16,
   marginRight: 8,
   padding: 0,
   display: 'flex',
   '&:active': {
      '& .MuiSwitch-thumb': {
         width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
         transform: 'translateX(-9px)',
      },
   },
   '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
         transform: 'translateX(-12px)',
         color: '#fff',
         '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#087B2F',
            border: 'none',
         },
      },
   },
   '& .MuiSwitch-thumb': {
      width: 12,
      height: 12,
      borderRadius: 6,
      boxShadow: 'none',
      position: 'relative',
      left: '12px',
      backgroundColor: '#f4f4f4',
      transition: theme.transitions.create(['width'], {
         duration: 200,
      }),
      border: '1px solid #D4D9E4',
      '&.Mui-checked': {
         backgroundColor: '#FFF',
      },
   },
   '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(255,255,255)',
      boxSizing: 'border-box',
      border: '1px solid #D4D9E4',
   },
}));

const internalCheckboxLabel = { inputProps: { 'aria-label': 'internal' } };
const mandatoryCheckboxLabel = { inputProps: { 'aria-label': 'mandatory' } };

const Question = ({ type, detail }: Props) => {
   return (
      <li className="pt-[20px] mb-[20px]" style={{ maxHeight: detail.type ? '90px' : '70px' }}>
         {detail.type && (
            <span className="block text-xs w-full opacity-75 text-slate-600 mb-1">
               {detail.type === 'date'
                  ? 'Date'
                  : detail.type === 'dropDown'
                  ? 'Dropdown'
                  : detail.type === 'file'
                  ? 'File Upload'
                  : detail.type === 'multipleChoice'
                  ? 'Multiple Choice'
                  : detail.type === 'number'
                  ? 'Number'
                  : detail.type === 'paragraph'
                  ? 'Paragraph'
                  : detail.type === 'shortAnswer'
                  ? 'Short Answer'
                  : detail.type === 'video'
                  ? 'Video question'
                  : detail.type === 'yesNo'
                  ? 'Yes/No questions'
                  : ''}
            </span>
         )}
         <div className="flex items-center justify-between">
            <p className="font-semibold text-base max-w-[320px]">{detail.question}</p>
            {!detail.default && (
               <div className="flex gap-7 items-center">
                  {type === 'personal' && (
                     <FormControlLabel
                        {...internalCheckboxLabel}
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
                        label={<FormLabel label="Internal" />}
                     />
                  )}
                  {type === 'profile' && (
                     <FormControlLabel
                        {...mandatoryCheckboxLabel}
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
                        label={<FormLabel label="Mandatory" />}
                     />
                  )}
                  {type !== 'additional' && <FormControlLabel control={<AntSwitch />} label={<FormLabel label="Hide" />} />}
                  {type === 'additional' && <img src="/pen.svg" alt="" className="scale-80" />}
               </div>
            )}
         </div>
      </li>
   );
};

export default Question;
