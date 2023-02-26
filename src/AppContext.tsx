import { createContext } from 'react';
import { QuestionDetails, QuestionType } from './ts';

export interface NewQuestion {
   type: QuestionType;
   question: string;
   choices: string[];
   other: boolean;
   maxChoices: Number;
}
export type ParentKey = 'personal' | 'additional' | 'profile';
export type QuestionKey = 'type' | 'question' | 'choices' | 'other' | 'maxChoices';

type PropPayload<PropKey extends QuestionKey> = PropKey extends 'choices'
   ? string[]
   : PropKey extends 'other'
   ? boolean
   : PropKey extends 'maxChoices'
   ? number
   : string;

export type NewQuestionProps<PropKey extends QuestionKey> = {
   parent: ParentKey;
   key: PropKey;
   payload?: PropPayload<PropKey>;
};

export type AppContextType = {
   questions: {
      personal: QuestionDetails[];
      additional: QuestionDetails[];
      profile: QuestionDetails[];
   };
   modal: {
      open: boolean;
      parent: ParentKey;
   };
   options: string[];
   hideModal: () => void;
   openModal: (parent: ParentKey) => void;
   addQuestion: (question: QuestionDetails, parent: ParentKey) => void;
   removeQuestion: (id: string, parent: ParentKey) => void;
   newQuestion: {
      personal: NewQuestion;
      additional: NewQuestion;
      profile: NewQuestion;
   };
   deleteNewQuestion: (key: ParentKey) => void;
   editNewQuetion: <PropKey extends QuestionKey>({ parent, key, payload }: NewQuestionProps<PropKey>) => void;
};

const AppContext = createContext<AppContextType>({
   questions: {
      personal: [],
      additional: [],
      profile: [],
   },
   modal: {
      open: false,
      parent: 'personal',
   },
   options: [],
   newQuestion: {
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
   },
   hideModal: () => {},
   openModal: () => {},
   addQuestion: () => {},
   removeQuestion: () => {},
   deleteNewQuestion: () => {},
   editNewQuetion: () => {},
});

export default AppContext;
