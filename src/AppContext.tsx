import React, { createContext, useState } from 'react';
import { Option, QuestionDetails } from './types/interfaces';

export type AppContextType = {
  questions: {
    personal: QuestionDetails[];
    additional: QuestionDetails[];
    profile: QuestionDetails[];
  };
  modal: {
    open: boolean;
    type: 'personal' | 'additional' | 'profile';
  };
  options: Option[];
  hideModal: () => void;
  openModal: (type: 'personal' | 'additional' | 'profile') => void;
  addQuestion: (
    question: QuestionDetails,
    type: 'personal' | 'additional' | 'profile'
  ) => void;
  removeQuestion: (
    id: string,
    type: 'personal' | 'additional' | 'profile'
  ) => void;
};

const AppContext = createContext<AppContextType>({
  questions: {
    personal: [],
    additional: [],
    profile: [],
  },
  modal: {
    open: false,
    type: 'personal',
  },
  options: [],
  hideModal: () => {},
  openModal: () => {},
  addQuestion: () => {},
  removeQuestion: () => {},
});

export default AppContext;
