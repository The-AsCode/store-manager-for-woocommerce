// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { changeBadgeSetting } from '../../../../features/badges/badgesSlice';
import cn from '../../../../utils/cn';

const badgeType = {
  custom: 'Custom',
  image: 'Image',
};

const SelectBadgeType = () => {
  const dispatch = useDispatch();
  const { badge_type } = useSelector((state) => state.badges);

  const handleBadgeType = (badge_type) => {
    dispatch(changeBadgeSetting({ setting: 'badge_type', value: badge_type }));
  };

  return (
    <div className='wmx-mt-6'>
      <p className='wmx-text-base'>Badge Type</p>
      <div className='wmx-flex wmx-gap-4 wmx-mt-2 wmx-bg-primary/10 wmx-p-2 wmx-rounded-lg'>
        {Object.entries(badgeType).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleBadgeType(key)}
            className={cn('wmx-bg-gray-200 wmx-font-semibold wmx-px-4 wmx-py-1.5 wmx-rounded-lg wmx-w-24', {
              'wmx-bg-primary wmx-text-white': badge_type === key,
            })}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SelectBadgeType;
