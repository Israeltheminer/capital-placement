import { Autocomplete, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import { QuestionType } from '../ts';

const QuestionType = () => {
   const { options, editNewQuetion, newQuestion, modal } = useContext(AppContext);
   const [displayType, setDisplayType] = useState<string>('Paragraph');
   useEffect(() => {
      setDisplayType(() => {
         switch (newQuestion?.[modal.parent].type) {
            case 'paragraph': {
               return 'Paragraph';
               break;
            }
            case 'dropDown': {
               return 'Dropdown';
               break;
            }
            case 'yesNo': {
               return 'Yes/No';
               break;
            }
            case 'video': {
               return 'Video question';
               break;
            }
            case 'shortAnswer': {
               return 'Short answer';
               break;
            }
            case 'multipleChoice': {
               return 'Multiple choice';
               break;
            }
            case 'date': {
               return 'Date';
               break;
            }
            case 'number': {
               return 'Number';
               break;
            }
            case 'file': {
               return 'File upload';
               break;
            }
            default:
               return 'Paragraph';
               break;
         }
      });
   }, [newQuestion?.[modal.parent].type]);
   const changeType = (value: string) => {
      setDisplayType(value);
      let newValue = (): QuestionType => {
         switch (value) {
            case 'Paragraph': {
               return 'paragraph';
               break;
            }
            case 'Dropdown': {
               return 'dropDown';
               break;
            }
            case 'Yes/No': {
               return 'yesNo';
               break;
            }
            case 'Video question': {
               return 'video';
               break;
            }
            case 'Short answer': {
               return 'shortAnswer';
               break;
            }
            case 'Multiple choice': {
               return 'multipleChoice';
               break;
            }
            case 'Date': {
               return 'date';
               break;
            }
            case 'Number': {
               return 'number';
               break;
            }
            case 'File upload': {
               return 'file';
               break;
            }
            default:
               return 'paragraph';
               break;
         }
      };
      editNewQuetion({
         parent: modal.parent,
         key: 'type',
         payload: newValue(),
      });
   };
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
            id="question-type-box"
            options={options}
            fullWidth={true}
            sx={{
               input: {
                  color: '#979797',
                  fontSize: '14px',
               },
            }}
            value={displayType}
            onChange={(event, newValue) => {
               if (newValue !== null) {
                  changeType(newValue);
               }
            }}
            renderInput={(params) => <TextField {...params} />}
         />
      </div>
   );
};

export default QuestionType;
