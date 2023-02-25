import { Button } from '@mui/material';
import { useContext } from 'react';
import { Card, DropZone, Questions } from '.';
import AppContext from '../AppContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ApplicationForm() {
  const { questions } = useContext(AppContext);
  return (
    <div className="ApplicationForm grid place-content-center gap-10 my-20">
      <DropZone />
      <Card heading="Personal Information">
        <Questions type="personal" details={questions.personal} />
      </Card>
      <Card heading="Profile">
        <Questions type="profile" details={questions.profile} />
      </Card>
      <Card heading="Additional questions">
        <Questions type="additional" details={questions.additional} />
      </Card>
      <div className="flex flex-row-reverse">
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#21B592',
            ':hover': {
              backgroundColor: '#21B592',
            },
            paddingY: 1.5,
            paddingX: 3,
            fontWeight: '100',
            textTransform: 'none',
          }}
          size="small"
          endIcon={<ArrowForwardIosIcon style={{ fontSize: '15px' }} />}
        >
          Save & continue
        </Button>
      </div>
    </div>
  );
}

export default ApplicationForm;
