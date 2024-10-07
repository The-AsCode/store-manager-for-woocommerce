// @ts-nocheck
import BadgeColors from './components/BadgeColors';
import BadgeContents from './components/BadgeContents';
import BadgeDimension from './components/BadgeDimension';
import BadgePosition from './components/BadgePosition';
import BadgeValidity from './components/BadgeValidity';
import OtherProperty from './components/OtherProperty';

const CustomSettings = () => {
  return (
    <div>
      <BadgeValidity />
      <BadgeContents />
      <BadgeDimension />
      <BadgeColors />
      <BadgePosition />
      <OtherProperty />
    </div>
  );
};
export default CustomSettings;
