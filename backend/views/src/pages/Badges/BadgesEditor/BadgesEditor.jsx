// @ts-nocheck
import { useSelector } from 'react-redux';
import Input from '../../../components/Input';
import CustomSettings from './components/CustomSettings';
import ImageSettings from './components/ImageSettings';
import SelectBadgeType from './components/SelectBadgeType';

const BadgesEditor = () => {
  const { type, styles, position, badgeText } = useSelector((state) => state.badges);

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
    return `<div data-position="${position}" style="
        margin:${styles.margin}px;
        color: ${styles.color};
        background-color: ${styles.backgroundColor};
        height: ${styles.height}px;
        width: ${styles.width}px;
        border-top-left-radius: ${styles.borderTopLeftRadius}px;
        border-top-right-radius: ${styles.borderTopRightRadius}px;
        border-bottom-left-radius: ${styles.borderBottomLeftRadius}px;
        border-bottom-right-radius: ${styles.borderBottomRightRadius}px;
        font-size: ${styles.fontSize}px;
        font-weight: ${styles.fontWeight};
        border: ${styles.borderWidth}px solid ${styles.borderColor};
        ${getPositionStyles()}
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
        ${badgeText}
    </div>`;
  };

  console.log(generateBadgeHtml());
  return (
    <div className='wmx-flex wmx-gap-4'>
      <div className='wmx-flex-grow'>
        <div className='wmx-py-2 wmx-border-b wmx-sticky wmx-top-8 wmx-border-gray-400 wmx-mb-4 wmx-bg-[#ddd]'>
          <h3 className='wmx-text-2xl wmx-font-bold'>Create Badge</h3>
        </div>
        <div className=''>
          <label className='wmx-block wmx-mb-1' htmlFor=''>
            Badge Name
          </label>
          <Input className='wmx-w-96' onChange={() => {}} placeholder='Summer Sale Badge' />
        </div>

        <div>
          <SelectBadgeType />

          <div>{type === 'custom' ? <CustomSettings /> : <ImageSettings />}</div>
        </div>
      </div>
      <div className='wmx-w-72 2xl:wmx-w-80'>
        <div className='wmx-border wmx-bg-white  wmx-p-4 wmx-sticky wmx-top-[52px]'>
          <h3 className='wmx-font-semibold wmx-mb-2 wmx-text-center'>Preview</h3>
          <div
            className='wmx-h-80 2xl:wmx-h-96 wmx-bg-gray-200 wmx-relative'
            dangerouslySetInnerHTML={{ __html: generateBadgeHtml() }}
          />
        </div>
      </div>
    </div>
  );
};
export default BadgesEditor;
