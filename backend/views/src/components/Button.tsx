import { ReactNode } from 'react';
import cn from '../utils/cn';

type ButtonType = {
  children: ReactNode;
  onClick: () => void;
  type?: 'primary' | 'secondary';
  className?: string | (() => string);
  disabled?: boolean;
};

const Button = ({ children, onClick, className, type = 'primary', disabled }: ButtonType) => {
  const getTypeClassNames = () => {
    switch (type) {
      case 'primary':
        return cn(
          'wmx-text-white',
          'wmx-bg-primary',
          'wmx-border-primary',
          'hover:wmx-bg-primary-dark',
          'hover:wmx-border-primary-dark'
        );
      case 'secondary':
        return cn(
          'wmx-text-grey-dark',
          'wmx-bg-gray-200',
          'wmx-border-gray-200',
          'hover:wmx-bg-gray-200',
          'hover:wmx-border-gray-300'
        );
      default:
        return 'wmx-text-white wmx-bg-primary wmx-border-primary hover:wmx-bg-primary-dark hover:wmx-border-primary-dark';
    }
  };

  return (
    <button
      disabled={disabled}
      className={cn(
        'wmx-py-1 wmx-px-4 !wmx-outline-none wmx-font-semibold wmx-rounded-md wmx-leading-[2]',
        getTypeClassNames(),
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
