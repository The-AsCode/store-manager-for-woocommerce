// @ts-nocheck
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import productDemoImage from '../../../../assets/images/demo_product.jpg';
import Button from '../../../components/Button';
import { resetBadgeState } from '../../../features/badges/badgesSlice';
import BadgesTable from './components/BadgesTable';

const BadgesManager = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNewBadge = () => {
    dispatch(resetBadgeState());
    navigate('editor');
  };

  return (
    <div>
      <div className='wmx-flex wmx-justify-end wmx-mb-6'>
        <Button onClick={handleNewBadge}>New Badge</Button>
      </div>
      <div className='wmx-flex wmx-gap-4'>
        <div className='wmx-flex-grow'>
          <BadgesTable setSelectedBadge={setSelectedBadge} selectedBadge={selectedBadge} />
        </div>

        <div className='wmx-w-64 2xl:wmx-w-80 '>
          <div className='wmx-border wmx-bg-white  wmx-p-5 wmx-pt-3 wmx-sticky wmx-shadow-sm wmx-top-[52px] wmx-rounded-lg'>
            <h3 className='wmx-font-semibold wmx-mb-3 wmx-text-lg wmx-text-center'>{__('Badge Preview')}</h3>
            <div className='wmx-relative wmx-h-72 2xl:wmx-h-96'>
              <div
                className='wmx-h-72 2xl:wmx-h-96 wmx-z-10 wmx-relative'
                dangerouslySetInnerHTML={{ __html: selectedBadge?.badge_style || '' }}
              />
              <img
                className=' wmx-absolute wmx-inset-0 w-full wmx-h-72 2xl:wmx-h-96 wmx-object-cover'
                src={productDemoImage}
                alt='Demo Product'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BadgesManager;
