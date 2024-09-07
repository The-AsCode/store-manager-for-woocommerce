import { useDispatch, useSelector } from 'react-redux';
import { changeBadgeSetting } from '../../../../features/badges/badgesSlice';
import cn from '../../../../utils/cn';

const SelectBadgeType = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.badges);
  console.log(type);

  const handleBadgeType = (type) => {
    dispatch(changeBadgeSetting({ setting: 'type', value: type }));
  };

  return (
    <div className='wmx-mt-6'>
      <p className='wmx-text-base'>Badge Type</p>
      <div className='wmx-flex wmx-gap-4 wmx-mt-2'>
        <button
          onClick={() => handleBadgeType('custom')}
          className={cn('wmx-bg-gray-200 wmx-font-semibold wmx-px-4 wmx-py-2 wmx-rounded-lg wmx-w-24', {
            'wmx-bg-primary wmx-text-white': type === 'custom',
          })}
        >
          Custom
        </button>
        <button
          onClick={() => handleBadgeType('image')}
          className={cn('wmx-bg-gray-200 wmx-px-4 wmx-py-2 wmx-rounded-lg wmx-w-24', {
            'wmx-bg-primary wmx-text-white': type === 'image',
          })}
        >
          Image
        </button>
      </div>
    </div>
  );
};
export default SelectBadgeType;
