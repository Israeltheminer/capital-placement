import { Button } from '@mui/material';
import { useContext } from 'react';
import { Card, Questions } from '.';
import AppContext from '../AppContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ApplicationForm() {
  const { questions } = useContext(AppContext);
  return (
    <div className="ApplicationForm grid place-content-center gap-10 my-20">
      <Card heading="Upload cover image">
        <div className="border text-center border-black border-dashed my-4 rounded-md px-12 pt-10 pb-12">
          <img
            src="/image 308.svg"
            alt="upload"
            className="mx-auto scale-[0.8]"
          />
          <p className="text-xs font-bold leading-loose">Upload cover image</p>
          <p className="text-xs font-[#979797] leading-loose opacity-60">
            16:9 ratio is recommended. Max image size 1mb
          </p>
        </div>
      </Card>
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
