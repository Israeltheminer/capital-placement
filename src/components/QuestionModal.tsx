import { Button, Modal } from '@mui/material';
import { useContext } from 'react';
import { Card, Choices, QuestionBox, QuestionType } from '.';
import AppContext from '../AppContext';
import MaxChoices from './MaxChoices';

const QuestionModal = () => {
  const { modal, hideModal } = useContext(AppContext);
  return (
    <Modal open={modal.open} onClose={hideModal}>
      <div className="w-fit mx-auto mt-20 min-w-[450px] ">
        <Card heading="Create Custom Questions">
          <div className="flex flex-col gap-5 pb-5">
            <QuestionType />
            <QuestionBox />
            <Choices />
            <MaxChoices />
            <div className="flex items-center justify-between mt-2">
              <span className="flex items-center justify-between gap-1">
                <img src="/delete.svg" alt="" className="scale-75" />
                <span className="text-sm text-[#A80000] font-semibold">
                  Delete question
                </span>
              </span>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#087B2F',
                  ':hover': {
                    backgroundColor: '#087B2F',
                  },
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
