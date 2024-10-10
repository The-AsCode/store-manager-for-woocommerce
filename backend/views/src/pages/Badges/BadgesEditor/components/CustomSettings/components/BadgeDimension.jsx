// @ts-nocheck
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../../../../components/Input';
import Label from '../../../../../../components/Label';
import { changeBadgeSettingProperties } from '../../../../../../features/badges/badgesSlice';
import SectionContainer from '../../Common/SectionContainer';

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
    <SectionContainer className='wmx-mt-6' title={__('Badge Dimensions')}>
      <div className='wmx-flex wmx-gap-2'>
        {Object.entries(dimensions).map(([key, value]) => (
          <div className='wmx-flex wmx-flex-col wmx-gap-1'>
            <Label htmlFor={key}>{value}:</Label>
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
    </SectionContainer>
  );
};
export default BadgeDimension;
