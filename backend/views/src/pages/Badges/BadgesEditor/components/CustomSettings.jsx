// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../components/Input';
import { changeBadgeSetting, updateStyles } from '../../../../features/badges/badgesSlice';
import cn from '../../../../utils/cn';

const positionsButtons = [
  { name: 'Top Right', value: 'top-right' },
  { name: 'Top Left', value: 'top-left' },
  { name: 'Bottom Left', value: 'bottom-left' },
  { name: 'Bottom Right', value: 'bottom-right' },
  { name: 'Center', value: 'center' },
];

const borderRadiusInputs = [
  { name: 'Top Left', value: 'borderTopLeftRadius' },
  { name: 'Top Right', value: 'borderTopRightRadius' },
  { name: 'Bottom Left', value: 'borderBottomLeftRadius' },
  { name: 'Bottom Right', value: 'borderBottomRightRadius' },
];
const CustomSettings = () => {
  const dispatch = useDispatch();
  const { styles, position, badgeText } = useSelector((state) => state.badges);

  const handleStyleChange = (property, value) => {
    dispatch(updateStyles({ property, value }));
  };

  const handleBadgeSettingChange = (setting, value) => {
    dispatch(changeBadgeSetting({ setting, value }));
  };

  return (
    <div>
      <div className='wmx-mt-4'>
        <label htmlFor='badge-text' className='wmx-font-semibold wmx-text-base wmx-mb-1'>
          Badge Text
        </label>
        <Input
          id='badge-text'
          placeholder='Summer Sell'
          className='wmx-w-full'
          type='text'
          value={badgeText}
          onChange={(e) => handleBadgeSettingChange('badgeText', e.target.value)}
        />
      </div>

      <div className='wmx-mt-4'>
        <p className='wmx-font-semibold wmx-text-base wmx-mb-1'>Badge Position</p>
        <div className='wmx-flex wmx-gap-2 wmx-items-center'>
          {positionsButtons.map((button) => (
            <button
              key={button.value}
              onClick={() => handleBadgeSettingChange('position', button.value)}
              className={cn('wmx-px-2 wmx-rounded wmx-py-1.5 wmx-bg-gray-200 wmx-text-sm wmx-font-semibold', {
                'wmx-bg-primary wmx-text-white': position === button.value,
              })}
            >
              {button.name}
            </button>
          ))}
        </div>
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-2'>
        <label htmlFor='height'>Height:</label>
        <Input
          className='!wmx-outline-none !wmx-border-none focus:!wmx-shadow-none'
          id='height'
          type='number'
          value={styles.height}
          onChange={(e) => handleStyleChange('height', e.target.value)}
        />
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center'>
        <label htmlFor='width'>Width:</label>
        <Input
          className='!wmx-outline-none !wmx-border-none focus:!wmx-shadow-none'
          id='width'
          type='number'
          value={styles.width}
          onChange={(e) => handleStyleChange('width', e.target.value)}
        />
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center'>
        <label htmlFor='borderWidth'>Border Width:</label>
        <Input
          className='!wmx-outline-none !wmx-border-none focus:!wmx-shadow-none'
          id='borderWidth'
          type='number'
          value={styles.borderWidth}
          onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
        />
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-2'>
        <label htmlFor='backgroundColor'>Background Color:</label>
        <input
          className='!wmx-outline-none !wmx-border-none focus:!wmx-shadow-none'
          id='backgroundColor'
          type='color'
          value={styles.backgroundColor}
          onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
        />
      </div>
      <div className='wmx-flex wmx-gap-2 wmx-items-center'>
        <label>Text Color:</label>
        <input
          className='!wmx-outline-none !wmx-border-none focus:!wmx-shadow-none'
          type='color'
          value={styles.color}
          onChange={(e) => handleStyleChange('color', e.target.value)}
        />
      </div>
      <div className='wmx-flex wmx-gap-2 wmx-items-center'>
        <label>Border Color:</label>
        <input
          className='!wmx-outline-none !wmx-border-none focus:!wmx-shadow-none'
          type='color'
          value={styles.borderColor}
          onChange={(e) => handleStyleChange('borderColor', e.target.value)}
        />
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-2'>
        <label htmlFor='margin'>Margin:</label>
        <Input
          id='margin'
          type='number'
          value={styles.margin}
          onChange={(e) => handleStyleChange('margin', e.target.value)}
        />
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-2'>
        <label>Border Radius:</label>
        {borderRadiusInputs.map((input) => (
          <Input
            className='wmx-w-20'
            key={input.value}
            id={input.value}
            type='number'
            value={styles[input.value]}
            placeholder={input.name}
            onChange={(e) => handleStyleChange(input.value, e.target.value)}
          />
        ))}
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-2'>
        <label htmlFor='fontSize'>Font Size:</label>
        <Input
          id='fontSize'
          type='number'
          min={0}
          value={styles.fontSize}
          onChange={(e) => handleStyleChange('fontSize', e.target.value)}
        />
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-2'>
        <label htmlFor='fontWeight'>Font Weight:</label>
        <select
          className='wmx-bg-gray-200 wmx-text-sm wmx-font-semibold wmx-p-1.5 wmx-rounded wmx-outline-none'
          id='fontWeight'
          value={styles.fontWeight}
          onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
        >
          <option value='400'>Normal</option>
          <option value='500'>Medium</option>
          <option value='600'>Semi Bold</option>
          <option value='700'>Bold</option>
        </select>
      </div>
    </div>
  );
};
export default CustomSettings;
