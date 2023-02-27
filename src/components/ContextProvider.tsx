import { useState, ReactNode } from 'react';
import AppContext, { AppContextType, NewQuestion, NewQuestionProps, QuestionKey } from '../AppContext';
import { QuestionDetails, QuestionType } from '../ts';
import generateUUID from '../utils/uuid';

const ContextProvider = ({ children }: { children: ReactNode }) => {
   const [questions, setQuestions] = useState<{
      personal: QuestionDetails[];
      additional: QuestionDetails[];
      profile: QuestionDetails[];
   }>({
      personal: [
         { question: 'First Name', default: true, mandatory: true },
         { question: 'Last Name', default: true, mandatory: true },
         { question: 'Email', default: true, mandatory: true },
         { question: 'Phone', default: true },
         { question: 'Nationality', default: true },
         { question: 'Current Residence', default: true },
         { question: 'ID Number', default: true },
         { question: 'Date of Birth ', default: true },
         { question: 'Gender', default: true },
      ],
      additional: [
         {
            type: 'paragraph',
            question: 'Please tell me about yourself in less than 500 words',
            id: '12-kmf-g-134t31n324-23r23r',
         },
         {
            type: 'dropDown',
            question: 'Please select the year of graduation from the list below',
            id: '12-kmf-g-451fg1g-23r23r',
            choices: ['2023', '2022', '2021', '2020'],
            maxChoices: 2,
         },
         {
            type: 'yesNo',
            question: 'Have you ever been rejected by the UK embassy?',
            id: '12-kmf-g-1dfds9t31-23r75r',
         },
      ],
      profile: [
         { question: 'Education', default: true },
         { question: 'Experience', default: true },
         { question: 'Resume', default: true },
      ],
   });
   const [modal, setModal] = useState<{
      open: boolean;
      parent: 'personal' | 'additional' | 'profile';
   }>({
      open: false,
      parent: 'personal',
   });
   const [newQuestion, setNewQuestion] = useState<{
      personal: NewQuestion;
      additional: NewQuestion;
      profile: NewQuestion;
   }>({
      personal: {
         type: 'paragraph',
         question: '',
         choices: [],
         other: true,
         maxChoices: 1,
      },
      additional: {
         type: 'paragraph',
         question: '',
         choices: [],
         other: true,
         maxChoices: 1,
      },
      profile: {
         type: 'paragraph',
         question: '',
         choices: [],
         other: true,
         maxChoices: 1,
      },
   });
   const [options] = useState<string[]>([
      'Paragraph',
      'Short answer',
      'Yes/No',
      'Dropdown',
      'Multiple choice',
      'Date',
      'Number',
      'File upload',
      'Video question',
   ]);
   const contextValue: AppContextType = {
      questions,
      modal,
      options,
      newQuestion,
      hideModal: () => setModal((prev) => ({ ...prev, open: false })),
      openModal: (parent) => setModal(() => ({ parent, open: true })),
      addQuestion: (parent) => {
         const { choices, maxChoices, other, question, type, position, id } = newQuestion?.[parent];
         console.log(position);
         const questionError = question.trim().length < 1;
         if (type === 'dropDown' || type === 'multipleChoice') {
            const choiceError = choices.length < 2;
            if (!choiceError && !questionError) {
               const newQuestion = id
                  ? { choices, maxChoices, position, other, question, type, id }
                  : { choices, maxChoices, other, question, type, id: generateUUID() };
               const newQuestions = id
                  ? questions?.[parent].filter((question) => question.id !== id)
                  : questions?.[parent];
               typeof position === 'number'
                  ? newQuestions.splice(position, 0, newQuestion)
                  : newQuestions.push(newQuestion);
               setTimeout(() => {
                  setQuestions({
                     ...questions,
                     [parent]: [...newQuestions],
                  });
               }, 0.1);
            }
            return {
               choiceError,
               questionError,
               closeModal: !questionError && !choiceError,
            };
         } else {
            if (!questionError) {
               const newQuestion = id ? { position, question, type, id } : { question, type, id: generateUUID() };
               const newQuestions = id
                  ? questions?.[parent].filter((question) => question.id !== id)
                  : questions?.[parent];
               typeof position === 'number'
                  ? newQuestions.splice(position, 0, newQuestion)
                  : newQuestions.push(newQuestion);
               setTimeout(() => {
                  setQuestions({
                     ...questions,
                     [parent]: [...newQuestions],
                  });
               }, 0.1);
            }
            return {
               choiceError: false,
               questionError,
               closeModal: !questionError,
            };
         }
      },
      removeQuestion: (id, type) =>
         setQuestions((prev) => ({
            ...prev,
            [type]: prev?.[type].filter((question) => question.id !== id),
         })),
      editQuestion: (id, type) => {
         let position: number = 0;
         const editedQuestions = questions?.[type].filter((question, index) => {
            if (question.id === id) position = index;
            return question.id === id;
         });
         setNewQuestion((prev) => ({
            ...prev,
            [type]: {
               ...editedQuestions[0],
               position,
            },
         }));
         setModal(() => ({
            open: true,
            parent: type,
         }));
      },
      deleteNewQuestion: (key) => {
         const { id } = newQuestion?.[key];
         setQuestions((prev) => ({
            ...prev,
            [key]: prev?.[key].filter((question) => question.id !== id),
         }));
         setNewQuestion((prev) => ({
            ...prev,
            [key]: {
               type: '',
               question: '',
               choices: [],
               other: true,
               maxChoices: 1,
            },
         }));
      },
      editNewQuetion: <PropKey extends QuestionKey>({ parent, key, payload }: NewQuestionProps<PropKey>) => {
         setNewQuestion((prev) => {
            let editedQuestion = prev?.[parent];
            if (key === 'choices') {
               editedQuestion.choices = payload as string[];
            } else if (key === 'maxChoices') {
               editedQuestion.maxChoices = payload as number;
            } else if (key === 'other') {
               editedQuestion.other = payload as boolean;
            } else if (key === 'disqualify') {
               editedQuestion.disqualify = payload as boolean;
            } else if (key === 'type') {
               editedQuestion.type = payload as QuestionType;
            } else if (key === 'question') {
               editedQuestion.question = payload as string;
            }
            return { ...prev, [parent]: { ...editedQuestion } };
         });
      },
   };

   return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default ContextProvider;
