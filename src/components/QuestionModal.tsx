import { Button, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { Card, Choices, QuestionBox, QuestionType } from '.';
import AppContext from '../AppContext';
import MaxChoices from './MaxChoices';

const QuestionModal = () => {
   const { modal, hideModal, addQuestion, deleteNewQuestion, newQuestion } = useContext(AppContext);
   const [errorStatus, setErrorStatus] = useState({
      question: false,
      choice: false,
   });
   return (
      <Modal open={modal.open} onClose={hideModal}>
         <div className="w-fit absolute min-w-[450px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Card heading="Create Custom Questions">
               <div className="flex flex-col gap-5 pb-5">
                  <QuestionType />
                  <QuestionBox error={errorStatus.question} />
                  {newQuestion?.[modal.parent].type === 'dropDown' ||
                  newQuestion?.[modal.parent].type === 'multipleChoice' ? (
                     <>
                        <Choices error={errorStatus.choice} />
                        <MaxChoices />
                     </>
                  ) : (
                     <></>
                  )}
                  <div className="flex items-center justify-between mt-2">
                     <span
                        className="flex items-center justify-between gap-1 cursor-pointer"
                        onClick={() => {
                           hideModal();
                           deleteNewQuestion(modal.parent);
                        }}
                     >
                        <img src="/delete.svg" alt="" className="scale-75" />
                        <span className="text-sm text-[#A80000] font-semibold">Delete question</span>
                     </span>
                     <Button
                        variant="contained"
                        sx={{
                           backgroundColor: '#087B2F',
                           ':hover': {
                              backgroundColor: '#087B2F',
                           },
                        }}
                        onClick={() => {
                           const addStatus = addQuestion(modal.parent);
                           setErrorStatus(() => ({
                              choice: addStatus.choiceError,
                              question: addStatus.questionError,
                           }));
                           if (addStatus.closeModal) {
                              hideModal();
                              deleteNewQuestion(modal.parent);
                           }
                        }}
                     >
                        Save
                     </Button>
                  </div>
               </div>
            </Card>
         </div>
      </Modal>
   );
};

export default QuestionModal;
