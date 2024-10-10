// @ts-nocheck
import { __ } from '@wordpress/i18n';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBadgeBaseProperties } from '../../../../../features/badges/badgesSlice';
import { badgeCustomSettings, generateBadgeHtml } from '../../../../../utils/badgeUtils';
import cn from '../../../../../utils/cn';
import SectionContainer from './SectionContainer';

const badgeType = {
  custom: 'Custom',
  image: 'Image',
  html: 'Custom HTML',
};

const SelectBadgeType = () => {
  const dispatch = useDispatch();
  const { badge_type, badge_settings, id } = useSelector((state) => state.badges);

  const handleBadgeType = (badge_type) => {
    dispatch(changeBadgeBaseProperties({ name: 'badge_type', value: badge_type }));
  };

  useEffect(() => {
    if (badge_type === 'custom' && !id) {
      dispatch(changeBadgeBaseProperties({ name: 'badge_settings', value: { ...badgeCustomSettings } }));
    }
  }, [badge_type]);

  useEffect(() => {
    dispatch(changeBadgeBaseProperties({ name: 'badge_style', value: generateBadgeHtml(badge_settings) }));
  }, [badge_settings]);

  return (
    <SectionContainer className='wmx-mt-6' title={__('Badge Type')}>
      <div className='wmx-flex wmx-justify-center wmx-gap-4'>
        {Object.entries(badgeType).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleBadgeType(key)}
            className={cn('wmx-bg-white wmx-font-semibold wmx-w-32 wmx-h-12 wmx-rounded-lg', {
              'wmx-bg-primary wmx-text-white': badge_type === key,
            })}
          >
            {value}
          </button>
        ))}
      </div>
    </SectionContainer>
  );
};
export default SelectBadgeType;
