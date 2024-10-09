// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../../../components/Input';
import { changeBadgeSettingProperties } from '../../../../../../features/badges/badgesSlice';

const dimensions = {
  height: 'Height',
  width: 'Width',
  borderWidth: 'Border Width',
};

const BadgeDimension = () => {
  const dispatch = useDispatch();
  const { badge_settings } = useSelector((state) => state.badges);

  const handleBadgeDimensionChange = (name, value) => {
    dispatch(changeBadgeSettingProperties({ name, value }));
  };

  return (
    <div className='wmx-mt-6'>
      <div className='wmx-bg-primary/10 wmx-py-1 wmx-px-2 wmx-font-bold'>Badge Dimension</div>
      <div className='wmx-flex wmx-gap-2 wmx-mt-2'>
        {Object.entries(dimensions).map(([key, value]) => (
          <div className='wmx-flex wmx-flex-col wmx-gap-0.5'>
            <label className='wmx-font-medium' htmlFor={key}>
              {value}:
            </label>
            <Input
              className='!wmx-outline-none wmx-w-36 !wmx-border-none focus:!wmx-shadow-none'
              id={key}
              type='number'
              value={badge_settings[key]}
              onChange={(e) => handleBadgeDimensionChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default BadgeDimension;
