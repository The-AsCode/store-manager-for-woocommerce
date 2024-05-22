import cn from '../utils/cn';

type InputType = {
	type: 'text' | 'number';
	className?: string | ( () => string );
	onChange: ( e: React.ChangeEvent< HTMLInputElement > ) => void;
	placeholder?: string;
};

const Input = ( {
	type,
	className,
	onChange,
	placeholder = 'Placeholder',
}: InputType ) => {
	return (
		<input
			onChange={ onChange }
			className={ cn(
				'!wmx-rounded !wmx-border !wmx-border-gray-200 !wmx-bg-white !wmx-py-1 !wmx-shadow-none focus:!wmx-outline-none focus:!wmx-border-primary',
				className
			) }
			type={ type }
			placeholder={ placeholder }
		/>
	);
};
export default Input;
