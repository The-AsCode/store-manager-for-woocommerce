// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../../../components/Input';
import Label from '../../../../../../components/Label';
import { updateStyles } from '../../../../../../features/badges/badgesSlice';

const borderRadiusInputs = [
  { name: 'Top Left', value: 'borderTopLeftRadius' },
  { name: 'Top Right', value: 'borderTopRightRadius' },
  { name: 'Bottom Left', value: 'borderBottomLeftRadius' },
  { name: 'Bottom Right', value: 'borderBottomRightRadius' },
];
const OtherProperty = () => {
  const dispatch = useDispatch();
  const { badge_styles } = useSelector((state) => state.badges);

  const handleStyleChange = (property, value) => {
    dispatch(updateStyles({ property, value }));
  };

  return (
    <div className='wmx-mt-6'>
      <div className='wmx-bg-primary/10 wmx-py-1 wmx-px-2 wmx-font-bold'>Other Property</div>
      <div className='wmx-flex wmx-items-center wmx-gap-4 wmx-mt-3'>
        <div className='wmx-flex wmx-flex-col wmx-gap-0.5'>
          <Label htmlFor='margin'>Margin:</Label>
          <Input
            id='margin'
            type='number'
            value={badge_styles.margin}
            onChange={(e) => handleStyleChange('margin', e.target.value)}
          />
        </div>

        <div className='wmx-flex wmx-flex-col wmx-gap-0.5'>
          <Label>Border Radius:</Label>
          <div className='wmx-flex wmx-gap-2'>
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
        </div>
      </div>
    </div>
  );
};
export default OtherProperty;
