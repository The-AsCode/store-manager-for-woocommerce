// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/Input';
import { changeBadgeSetting } from '../../../features/badges/badgesSlice';
import CustomSettings from './components/CustomSettings/CustomSettings';
import ImageSettings from './components/ImageSettings';
import PreviewBadge from './components/PreviewBadge';
import SelectBadgeType from './components/SelectBadgeType';

const BadgesEditor = () => {
  const dispatch = useDispatch();
  const { badge_type, badge_name } = useSelector((state) => state.badges);

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
          <Input
            value={badge_name}
            className='wmx-w-96'
            onChange={(e) => {
              dispatch(changeBadgeSetting({ setting: 'badge_name', value: e.target.value }));
            }}
            placeholder='Summer Sale Badge'
          />
        </div>

        <div>
          <SelectBadgeType />

          <div>{badge_type === 'custom' ? <CustomSettings /> : <ImageSettings />}</div>
        </div>
      </div>

      <PreviewBadge />
    </div>
  );
};
export default BadgesEditor;
