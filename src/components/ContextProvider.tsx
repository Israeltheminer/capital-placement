import { useState, ReactNode } from 'react';
import AppContext, { AppContextType } from '../AppContext';
import { Option, QuestionDetails } from '../types/interfaces';

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
    profile: [
      { question: 'Education' },
      { question: 'Experience' },
      { question: 'Resume' },
    ],
  });
  const [modal, setModal] = useState<{
    open: boolean;
    type: 'personal' | 'additional' | 'profile';
  }>({
    open: false,
    type: 'personal',
  });
  const [options] = useState<Option[]>([
    { label: 'Paragraph' },
    { label: 'Short answer' },
    { label: 'Yes/No' },
    { label: 'Dropdown' },
    { label: 'Multiple choice' },
    { label: 'Date' },
    { label: 'Number' },
    { label: 'File upload' },
    { label: 'Video question' },
  ]);
  const contextValue: AppContextType = {
    questions,
    modal,
    options,
    hideModal: () => setModal((prev) => ({ ...prev, open: false })),
    openModal: (type) => setModal(() => ({ type, open: true })),
    addQuestion: (question, type) =>
      setQuestions((prev) => ({
        ...prev,
        [type]: [...prev?.[type], question],
      })),
    removeQuestion: (id, type) =>
      setQuestions((prev) => ({
        ...prev,
        [type]: prev?.[type].filter((question) => {
          question.id !== id;
        }),
      })),
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
