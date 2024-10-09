// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../../../components/Input';
import Label from '../../../../../../components/Label';
import { changeBadgeSettingProperties } from '../../../../../../features/badges/badgesSlice';

const BadgeContents = () => {
  const dispatch = useDispatch();
  const { badgeText, badge_settings } = useSelector((state) => state.badges);

  const handleBadgeContentChange = (name, value) => {
    dispatch(changeBadgeSettingProperties({ name, value }));
  };

  return (
    <div className='wmx-mt-6'>
      <div className='wmx-bg-primary/10 wmx-py-1 wmx-px-2 wmx-font-bold'>Badge Content</div>

      <div className='wmx-flex wmx-items-center wmx-gap-4 wmx-mt-3'>
        <div className='wmx-flex wmx-flex-col wmx-gap-1'>
          <Label htmlFor='badge-text'>Badge Text:</Label>
          <Input
            id='badge-text'
            placeholder='Summer Sell'
            className='wmx-w-full'
            type='text'
            value={badge_settings.text}
            onChange={(e) => handleBadgeContentChange('text', e.target.value)}
          />
        </div>

        <div className='wmx-flex wmx-flex-col wmx-gap-1'>
          <Label htmlFor='fontSize'>Font Size:</Label>
          <Input
            id='fontSize'
            type='number'
            min={0}
            value={badge_settings.fontSize}
            className='wmx-w-full'
            onChange={(e) => handleBadgeContentChange('fontSize', e.target.value)}
          />
        </div>

        <div className='wmx-flex wmx-flex-col wmx-gap-1'>
          <Label htmlFor='fontWeight'>Font Weight:</Label>
          <select
            className='!wmx-border !wmx-w-32 !wmx-shadow-none !wmx-border-gray-200 focus:!wmx-border-primary !wmx-bg-white !wmx-py-1.5 wmx-rounded'
            id='fontWeight'
            value={badge_settings.fontWeight}
            onChange={(e) => handleBadgeContentChange('fontWeight', e.target.value)}
          >
            <option value='400'>Normal</option>
            <option value='500'>Medium</option>
            <option value='600'>Semi Bold</option>
            <option value='700'>Bold</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default BadgeContents;
