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
         { question: 'First Name', default: true },
         { question: 'Last Name', default: true },
         { question: 'Email', default: true },
         { question: 'Phone' },
         { question: 'Nationality' },
         { question: 'Current Residence' },
         { question: 'ID Number' },
         { question: 'Date of Birth ' },
         { question: 'Gender' },
      ],
      additional: [
         {
            type: 'paragraph',
            question: 'Please tell me about yourself in less than 500 words',
         },
         {
            type: 'dropDown',
            question: 'Please select the year of graduation from the list below',
         },
         {
            type: 'yesNo',
            question: 'Have you ever been rejected by the UK embassy?',
         },
      ],
      profile: [{ question: 'Education' }, { question: 'Experience' }, { question: 'Resume' }],
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
         choices: ['AAAAAAAAA', 'BBBBBBBBBB'],
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
      addQuestion: (question, type) =>
         setQuestions((prev) => ({
            ...prev,
            [type]: [...prev?.[type], { ...question, id: generateUUID() }],
         })),
      removeQuestion: (id, type) =>
         setQuestions((prev) => ({
            ...prev,
            [type]: prev?.[type].filter((question) => {
               question.id !== id;
            }),
         })),
      deleteNewQuestion: (key) => {
         setNewQuestion((prev) => {
            return {
               ...prev,
               [key]: {
                  type: '',
                  question: '',
                  choices: [],
                  other: true,
                  maxChoices: 1,
               },
            };
         });
      },
      editNewQuetion: <PropKey extends QuestionKey>({ parent, key, payload }: NewQuestionProps<PropKey>) => {
         setNewQuestion((prev) => {
            let editedQuestion = prev?.[parent];
            if (key === 'choices') {
               editedQuestion.choices = payload as string[];
            } else if (key === 'maxChoices') {
               editedQuestion.maxChoices = payload as Number;
            } else if (key === 'other') {
               editedQuestion.other = !editedQuestion.other;
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
