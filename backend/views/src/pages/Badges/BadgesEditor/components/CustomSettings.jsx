import { useDispatch, useSelector } from 'react-redux';
import { changeBadgeSetting, updateStyles } from '../../../../features/badges/badgesSlice';
import cn from '../../../../utils/cn';

const CustomSettings = () => {
  const dispatch = useDispatch();
  const { styles, position } = useSelector((state) => state.badges);

  const handleStyleChange = (property, value) => {
    dispatch(updateStyles({ property, value }));
  };

  const handleBadgePositionChange = (value) => {
    dispatch(changeBadgeSetting({ setting: 'position', value }));
  };

  return (
    <div>
      <div>
        <label htmlFor='backgroundColor'>Background Color:</label>
        <input
          className='!wmx-outline-none !wmx-border-none focus:!wmx-shadow-none'
          id='backgroundColor'
          type='color'
          value={styles.backgroundColor}
          onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
        />
      </div>
      <div>
        <label>Text Color:</label>
        <input type='color' value={styles.color} onChange={(e) => handleStyleChange('color', e.target.value)} />
      </div>
      <div>
        <p className='wmx-font-semibold wmx-text-base'>Badge Position</p>
        <div className='wmx-flex wmx-gap-2 wmx-items-center'>
          <button
            onClick={() => handleBadgePositionChange('top-right')}
            className={cn('wmx-px-2 wmx-rounded wmx-py-1.5 wmx-bg-gray-200 wmx-text-sm wmx-font-semibold', {
              'wmx-bg-primary wmx-text-white': position === 'top-right',
            })}
          >
            Top Right
          </button>
          <button
            onClick={() => handleBadgePositionChange('top-left')}
            className={cn('wmx-px-2 wmx-rounded wmx-py-1.5 wmx-bg-gray-200 wmx-text-sm wmx-font-semibold', {
              'wmx-bg-primary wmx-text-white': position === 'top-left',
            })}
          >
            Top Left
          </button>
          <button
            onClick={() => handleBadgePositionChange('bottom-left')}
            className={cn('wmx-px-2 wmx-rounded wmx-py-1.5 wmx-bg-gray-200 wmx-text-sm wmx-font-semibold', {
              'wmx-bg-primary wmx-text-white': position === 'bottom-left',
            })}
          >
            Bottom Left
          </button>
          <button
            onClick={() => handleBadgePositionChange('bottom-right')}
            className={cn('wmx-px-2 wmx-rounded wmx-py-1.5 wmx-bg-gray-200 wmx-text-sm wmx-font-semibold', {
              'wmx-bg-primary wmx-text-white': position === 'bottom-right',
            })}
          >
            Bottom Right
          </button>
          <button
            onClick={() => handleBadgePositionChange('center')}
            className={cn('wmx-px-2 wmx-rounded wmx-py-1.5 wmx-bg-gray-200 wmx-text-sm wmx-font-semibold', {
              'wmx-bg-primary wmx-text-white': position === 'center',
            })}
          >
            Center
          </button>
        </div>
      </div>
    </div>
  );
};
export default CustomSettings;
