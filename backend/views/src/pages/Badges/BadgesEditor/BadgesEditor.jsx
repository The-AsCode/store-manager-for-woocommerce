import { useSelector } from 'react-redux';
import Input from '../../../components/Input';
import CustomSettings from './components/CustomSettings';
import ImageSettings from './components/ImageSettings';
import SelectBadgeType from './components/SelectBadgeType';

const BadgesEditor = () => {
  const { type, styles, position } = useSelector((state) => state.badges);

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
    return `<div style="
        margin:${styles.margin}px;
        color: ${styles.color};
        background-color: ${styles.backgroundColor};
        height: ${styles.height}px;
        width: ${styles.width}px;
        ${getPositionStyles()}
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
      ">
        Hello
    </div>`;
  };

  console.log(generateBadgeHtml());
  return (
    <div className='wmx-flex '>
      <div className='wmx-flex-grow'>
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
      <div className='wmx-w-64 wmx-min-h-[calc(100vh-120px)]'>
        <div className='wmx-border wmx-bg-white  wmx-p-4 wmx-sticky wmx-top-[52px]'>
          <h3 className='wmx-font-semibold wmx-mb-2 wmx-text-center'>Preview</h3>
          <div
            className='wmx-aspect-square wmx-bg-gray-200 wmx-relative'
            dangerouslySetInnerHTML={{ __html: generateBadgeHtml() }}
          />
        </div>
      </div>
    </div>
  );
};
export default BadgesEditor;
