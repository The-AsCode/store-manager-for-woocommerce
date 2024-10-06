// @ts-nocheck
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { useAddBadgeMutation } from '../../../../features/badges/badgesApi';

const PreviewBadge = () => {
  const { badge_type, badge_name, badge_styles, position, badgeText } = useSelector((state) => state.badges);
  const [addBadge] = useAddBadgeMutation();

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top: 0; left: 0;';
      case 'top-right':
        return 'top: 0; right: 0;';
      case 'bottom-left':
        return 'bottom: 0; left: 0;';
      case 'bottom-right':
        return 'bottom: 0; right: 0;';
      case 'center':
        return 'top: 50%; left: 50%; transform: translate(-50%, -50%);';
      default:
        return '';
    }
  };

  const generateBadgeHtml = () => {
    return `<div data-position='${position}' style='
        display: flex;
        margin:${badge_styles.margin}px;
        color: ${badge_styles.color};
        background-color: ${badge_styles.backgroundColor};
        height: ${badge_styles.height}px;
        width: ${badge_styles.width}px;
        border-top-left-radius: ${badge_styles.borderTopLeftRadius}px;
        border-top-right-radius: ${badge_styles.borderTopRightRadius}px;
        border-bottom-left-radius: ${badge_styles.borderBottomLeftRadius}px;
        border-bottom-right-radius: ${badge_styles.borderBottomRightRadius}px;
        font-size: ${badge_styles.fontSize}px;
        font-weight: ${badge_styles.fontWeight};
        border: ${badge_styles.borderWidth}px solid ${badge_styles.borderColor};
        ${getPositionStyles()}
        position: absolute;
        justify-content: center;
        align-items: center;
      '>${badgeText}</div>`;
  };

  const handleSaveBadge = async () => {
    const dataForSave = {
      badge_name,
      badge_type,
      filter: 'all',
      badge_style: generateBadgeHtml(),
      valid_from: '',
      valid_to: '',
    };
    const result = await addBadge(dataForSave).unwrap();
  };

  return (
    <div className='wmx-w-72 2xl:wmx-w-80'>
      <div className='wmx-border wmx-bg-white  wmx-p-4 wmx-sticky wmx-top-[52px]'>
        <h3 className='wmx-font-semibold wmx-mb-2 wmx-text-center'>Preview</h3>
        <div
          className='wmx-h-80 2xl:wmx-h-96 wmx-bg-gray-200 wmx-relative'
          dangerouslySetInnerHTML={{ __html: generateBadgeHtml() }}
        />

        <div className='wmx-mt-4'>
          <Button onClick={handleSaveBadge}>Save Badge</Button>
        </div>
      </div>
    </div>
  );
};
export default PreviewBadge;
