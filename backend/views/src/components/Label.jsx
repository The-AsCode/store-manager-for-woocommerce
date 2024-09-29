// @ts-nocheck
const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className='wmx-font-semibold wmx-text-base'>
      {children}
    </label>
  );
};
export default Label;
