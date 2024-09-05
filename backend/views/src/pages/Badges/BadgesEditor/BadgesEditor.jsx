import Input from '../../../components/Input';

const BadgesEditor = () => {
  return (
    <div className='wmx-flex '>
      <div className='wmx-flex-grow'>
        <div className=''>
          <label className='wmx-block wmx-mb-1' htmlFor=''>
            Badge Name
          </label>
          <Input className='wmx-w-96' onChange={() => {}} placeholder='Summer Sale Badge' />
        </div>
      </div>
      <div className='wmx-w-64 wmx-min-h-[calc(100vh-120px)]'>
        <div className='wmx-border wmx-bg-white  wmx-p-4 wmx-sticky wmx-top-14'>
          <h3 className='wmx-font-semibold wmx-mb-2 wmx-text-center'>Preview</h3>
          <div className='wmx-aspect-square wmx-bg-gray-200'></div>
        </div>
      </div>
    </div>
  );
};
export default BadgesEditor;
