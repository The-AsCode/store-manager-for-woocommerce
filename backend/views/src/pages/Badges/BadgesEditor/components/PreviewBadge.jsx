// @ts-nocheck
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import { useAddBadgeMutation } from '../../../../features/badges/badgesApi';

const PreviewBadge = () => {
  const { badge_type, badge_name, badge_settings, position, badgeText, valid_from, valid_to, badge_style } =
    useSelector((state) => state.badges);
  const [addBadge] = useAddBadgeMutation();

  const handleSaveBadge = async () => {
    const dataForSave = {
      badge_name,
      badge_type,
      filter: 'all',
      badge_style: generateBadgeHtml(),
      valid_from,
      valid_to,
      badge_settings: { name: 'Tarek', email: 'tarek@wp.com' },
    };
    const result = await addBadge(dataForSave).unwrap();
  };

  return (
    <div className='wmx-w-72 2xl:wmx-w-80'>
      <div className='wmx-border wmx-bg-white  wmx-p-4 wmx-sticky wmx-top-[52px]'>
        <h3 className='wmx-font-semibold wmx-mb-2 wmx-text-center'>Preview</h3>
        <div
          className='wmx-h-80 2xl:wmx-h-96 wmx-bg-gray-200 wmx-relative'
          dangerouslySetInnerHTML={{ __html: badge_style }}
        />

        <div className='wmx-mt-4'>
          <Button onClick={handleSaveBadge}>Save Badge</Button>
        </div>
      </div>
    </div>
  );
};
export default PreviewBadge;
