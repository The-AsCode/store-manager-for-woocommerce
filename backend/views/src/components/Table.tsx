import { ReactNode } from 'react';
import cn from '../utils/cn';

type TableElementType = {
  children: ReactNode;
  className?: string;
};

const Table = ({ children }: TableElementType) => {
  return <table className='wmx-min-w-full wmx-table-fixed wmx-divide-y wmx-divide-gray-200'>{children}</table>;
};

const Heading = ({ children, className }: TableElementType) => {
  return (
    <th scope='col' className={cn('wmx-text-left wmx-text-sm wmx-px-2 wmx-py-3', className)}>
      {children}
    </th>
  );
};

const Data = ({ children, className }: TableElementType) => {
  return <td className={`wmx-py-1.5 wmx-px-2 wmx-text-sm wmx-font-medium ${className}`}>{children}</td>;
};

Table.Heading = Heading;
Table.Data = Data;

export default Table;
