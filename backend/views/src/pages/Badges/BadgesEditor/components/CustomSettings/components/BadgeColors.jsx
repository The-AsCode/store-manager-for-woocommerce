// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import { updateStyles } from '../../../../../../features/badges/badgesSlice';

const colors = {
  backgroundColor: 'Background Color',
  color: 'Text Color',
  borderColor: 'Border Color',
};

const BadgeColors = () => {
  const dispatch = useDispatch();
  const { badge_styles } = useSelector((state) => state.badges);

  const handleStyleChange = (property, value) => {
    dispatch(updateStyles({ property, value }));
  };

  return (
    <div className='wmx-mt-6'>
      <div className='wmx-bg-primary/10 wmx-py-1 wmx-px-2 wmx-font-bold'>Badge Colors</div>
      <div className='wmx-flex wmx-gap-4 wmx-items-center wmx-mt-3'>
        {Object.entries(colors).map(([key, value]) => (
          <div key={key} className='wmx-flex wmx-gap-1 wmx-items-center'>
            <label htmlFor={key}>{value}:</label>
            <input
              className='!wmx-outline-none !wmx-border-none focus:!wmx-shadow-none'
              id={key}
              type='color'
              value={badge_styles[key]}
              onChange={(e) => handleStyleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default BadgeColors;
