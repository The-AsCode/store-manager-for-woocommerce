// @ts-nocheck
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import Input from '../../../components/Input';
import { useGetBadgeQuery } from '../../../features/badges/badgesApi';
import { changeBadgeSetting } from '../../../features/badges/badgesSlice';
import CustomSettings from './components/CustomSettings/CustomSettings';
import ImageSettings from './components/ImageSettings';
import PreviewBadge from './components/PreviewBadge';
import SelectBadgeType from './components/SelectBadgeType';

const BadgesEditor = () => {
  const dispatch = useDispatch();
  const { badge_type, badge_name } = useSelector((state) => state.badges);
  const [skip, setSkip] = useState(true);
  const [editedData, setEditedData] = useState(null);

  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const badgeId = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const { data, isLoading } = useGetBadgeQuery(badgeId, { skip });

  if (!badgeId) {
    setLoading(false);
  }

  useEffect(() => {
    const badgeFromState = state?.badge;

    if (badgeFromState) {
      setEditedData(badgeFromState);
      setLoading(false);
    } else if (badgeId) {
      setSkip(false);
      setLoading(false);
    }
  }, [state, badgeId]);

  useEffect(() => {
    if (data) {
      setEditedData(data);
    }
  }, [data]);

  useEffect(() => {
    if (editedData) {
      dispatch(changeBadgeSetting({ setting: 'badge_name', value: editedData.badge_name }));
      console.log('Edited Data:', editedData);
    }
  }, [editedData, dispatch]);

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

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
