// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../../components/Input';
import { changeBadgeSetting, updateStyles } from '../../../../../features/badges/badgesSlice';
import BadgeColors from './components/BadgeColors';
import BadgeDimension from './components/BadgeDimension';
import BadgePosition from './components/BadgePosition';

const borderRadiusInputs = [
  { name: 'Top Left', value: 'borderTopLeftRadius' },
  { name: 'Top Right', value: 'borderTopRightRadius' },
  { name: 'Bottom Left', value: 'borderBottomLeftRadius' },
  { name: 'Bottom Right', value: 'borderBottomRightRadius' },
];
const CustomSettings = () => {
  const dispatch = useDispatch();
  const { badge_styles, badgeText } = useSelector((state) => state.badges);

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
      <BadgePosition />
      <BadgeDimension />
      <BadgeColors />

      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-2'>
        <label htmlFor='margin'>Margin:</label>
        <Input
          id='margin'
          type='number'
          value={badge_styles.margin}
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
            value={badge_styles[input.value]}
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
          value={badge_styles.fontSize}
          onChange={(e) => handleStyleChange('fontSize', e.target.value)}
        />
      </div>

      <div className='wmx-flex wmx-gap-2 wmx-items-center wmx-mt-2'>
        <label htmlFor='fontWeight'>Font Weight:</label>
        <select
          className='wmx-bg-gray-200 wmx-text-sm wmx-font-semibold wmx-p-1.5 wmx-rounded wmx-outline-none'
          id='fontWeight'
          value={badge_styles.fontWeight}
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
