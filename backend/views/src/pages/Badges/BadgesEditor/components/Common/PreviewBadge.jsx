// @ts-nocheck
import { __ } from '@wordpress/i18n';
import { useSelector } from 'react-redux';
import productDemoImage from '../../../../../../assets/images/demo_product.jpg';
const PreviewBadge = () => {
  const { badge_style } = useSelector((state) => state.badges);

  return (
    <div className='wmx-w-72 2xl:wmx-w-80 '>
      <div className='wmx-border wmx-bg-white  wmx-p-5 wmx-pt-3 wmx-sticky wmx-shadow-sm wmx-top-[52px] wmx-rounded-lg'>
        <h3 className='wmx-font-semibold wmx-mb-3 wmx-text-lg wmx-text-center'>{__('Live Preview')}</h3>
        <div className='wmx-relative wmx-h-80 2xl:wmx-h-96'>
          <div
            className='wmx-h-80 2xl:wmx-h-96 wmx-z-10 wmx-relative'
            dangerouslySetInnerHTML={{ __html: badge_style }}
          />
          <img
            className=' wmx-absolute wmx-inset-0 w-full wmx-h-80 2xl:wmx-h-96 wmx-object-cover'
            src={productDemoImage}
            alt='Demo Product'
          />
        </div>
      </div>
    </div>
  );
};
export default PreviewBadge;
