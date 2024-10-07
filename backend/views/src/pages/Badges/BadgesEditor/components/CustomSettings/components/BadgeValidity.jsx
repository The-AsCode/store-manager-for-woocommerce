// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../../../components/Input';
import Label from '../../../../../../components/Label';
import { changeBadgeSetting } from '../../../../../../features/badges/badgesSlice';

const BadgeValidity = () => {
  const dispatch = useDispatch();
  const { badge_styles } = useSelector((state) => state.badges);

  const handleBadgeSettingChange = (setting, value) => {
    dispatch(changeBadgeSetting({ setting, value }));
  };

  return (
    <div className='wmx-mt-6'>
      <div className='wmx-bg-primary/10 wmx-py-1 wmx-px-2 wmx-font-bold'>Badge Validity</div>
      <div className='wmx-flex wmx-items-center wmx-gap-4 wmx-mt-3'>
        <div className='wmx-flex wmx-flex-col wmx-gap-1'>
          <Label htmlFor='validFrom'>Start Date:</Label>
          <Input
            id='validFrom'
            className='wmx-w-full'
            type='datetime-local'
            value={badge_styles.valid_from}
            onChange={(e) => handleBadgeSettingChange('valid_from', e.target.value)}
          />
        </div>

        <div className='wmx-flex wmx-flex-col wmx-gap-1'>
          <Label htmlFor='validTo'>End Date:</Label>
          <Input
            id='validTo'
            type='datetime-local'
            min={0}
            value={badge_styles.valid_to}
            className='wmx-w-full'
            onChange={(e) => handleBadgeSettingChange('valid_to', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
export default BadgeValidity;
