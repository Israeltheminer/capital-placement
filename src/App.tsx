import {useContext, useState} from 'react';
import AppContext from './AppContext';
import {ApplicationForm, Card, Navbar, Sidenav} from './components';
import QuestionModal from './components/QuestionModal';

type Option = {
  label: string;
};

const options: Option[] = [
  { label: 'Paragraph' },
  { label: 'Short answer' },
  { label: 'Yes/No' },
  { label: 'Dropdown' },
  { label: 'Multiple choice' },
  { label: 'Date' },
  { label: 'Number' },
  { label: 'File upload' },
  { label: 'Video question' },
];

function App() {
   const [activeLink, setActiveLink] = useState("Application Form")
  return (
    <>
    <main className='flex items-stretch mb-auto grow relative'>
      <Sidenav/>
      <div className='flex-1'>
      <Navbar {...{activeLink, setActiveLink}}/>
      {
        activeLink === "Application Form" &&
        <ApplicationForm/>
      }
      </div>
    </main>
      <QuestionModal/>
      </>
  )
}

export default App
