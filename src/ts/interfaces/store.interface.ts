import { QuestionType } from '../types/store.type';

export interface QuestionDetails {
   default?: boolean;
   type?: QuestionType;
   choices?: string[];
   question?: string;
   file?: File;
   description?: string;
   id?: string;
}
