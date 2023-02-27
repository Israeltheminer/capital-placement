import { useContext } from 'react';
import { QuestionDetails } from '../ts';
import { Question } from '.';
import AppContext, { ParentKey, QuestionKey } from '../AppContext';

interface Props {
   type: ParentKey;
   details: QuestionDetails[];
}

export default function BasicCard({ type, details }: Props) {
   const { openModal } = useContext(AppContext);

   return (
      <>
         <ul className="divide-y question-list">
            {details.length ? details.map((detail, index) => <Question {...{ detail, type }} key={index} />) : ''}
         </ul>
         <div className="cursor-pointer flex gap-5 py-6 pt-8 w-fit items-center" onClick={() => openModal(type)}>
            <img src="/Group 653.svg" alt="add" className="scale-75" />
            <span className="text-sm">Add a question</span>
         </div>
      </>
   );
}
