export interface QuestionDetails {
  default?: boolean;
  type?:
    | 'paragraph'
    | 'dropDown'
    | 'yesNo'
    | 'video'
    | 'shortAnswer'
    | 'multipleChoice'
    | 'date'
    | 'number'
    | 'file';
  choices?: string[];
  question?: string;
  file?: File;
  description?: string;
  id?: string;
}
export interface Option {
  label: string;
}
