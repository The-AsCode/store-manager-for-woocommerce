// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { changeBadgeSetting } from '../../../../../../features/badges/badgesSlice';
import cn from '../../../../../../utils/cn';

const positionsButtons = [
  { name: 'Top Right', value: 'top-right' },
  { name: 'Top Left', value: 'top-left' },
  { name: 'Bottom Left', value: 'bottom-left' },
  { name: 'Bottom Right', value: 'bottom-right' },
  { name: 'Center', value: 'center' },
];

const BadgePosition = () => {
  const dispatch = useDispatch();
  const { position } = useSelector((state) => state.badges);

  const handleBadgeSettingChange = (setting, value) => {
    dispatch(changeBadgeSetting({ setting, value }));
  };

  return (
    <div className='wmx-mt-6'>
      <div className='wmx-bg-primary/10 wmx-py-1 wmx-px-2 wmx-font-bold'>Badge Position</div>
      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-3'>
        {positionsButtons.map((button) => (
          <button
            key={button.value}
            onClick={() => handleBadgeSettingChange('position', button.value)}
            className={cn('wmx-px-2.5 wmx-py-2 wmx-bg-white wmx-text-sm wmx-font-semibold', {
              'wmx-bg-primary wmx-text-white': position === button.value,
            })}
          >
            {button.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default BadgePosition;