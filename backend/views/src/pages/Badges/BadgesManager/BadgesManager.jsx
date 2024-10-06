import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import BadgesTable from './components/BadgesTable';

const BadgesManager = () => {
  const navigate = useNavigate();
  const handleNewBadge = () => {
    navigate('editor');
  };
  return (
    <div>
      <div className='wmx-flex wmx-justify-end wmx-mb-6'>
        <Button onClick={handleNewBadge}>New Badge</Button>
      </div>
      <div className='wmx-flex wmx-gap-4'>
        <div className='wmx-flex-grow'>
          <BadgesTable />
        </div>
        <div className='wmx-w-64 wmx-border wmx-p-4 wmx-bg-white'>
          <h3 className='wmx-font-semibold wmx-mb-2 wmx-text-center'>Preview</h3>
          <div className='wmx-aspect-square wmx-bg-gray-200'></div>
        </div>
      </div>
    </div>
  );
};
export default BadgesManager;
