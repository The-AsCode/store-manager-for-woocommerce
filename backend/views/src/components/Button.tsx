import { ReactNode } from 'react';
import cn from '../utils/cn';

type ButtonType = {
	children: ReactNode;
	onClick: () => void;
	type?: 'primary' | 'secondary';
	className?: string | ( () => string );
};

const Button = ( {
	children,
	onClick,
	className,
	type = 'primary',
}: ButtonType ) => {
	return (
		<button
			className={ cn(
				'wmx-bg-primary wmx-py-1 wmx-px-4 !wmx-outline-none !wmx-border-none wmx-text-white wmx-font-semibold wmx-rounded wmx-leading-[2]',
				className
			) }
			onClick={ onClick }
		>
			{ children }
		</button>
	);
};
export default Button;
