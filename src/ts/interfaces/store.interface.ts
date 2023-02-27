import { QuestionType } from '../types/store.type';

export interface QuestionDetails {
   default?: boolean;
   mandatory?: boolean;
   type?: QuestionType;
   choices?: string[];
   other?: boolean;
   question: string;
   maxChoices?: number;
   description?: string;
   id?: string;
}
