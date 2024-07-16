import { FC } from 'react'

interface selectInputInterface {
	handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	name?: string;
	value?: string;
	valueOptions?: string[]
	labelOption?: string
}

const SelectInput: FC<selectInputInterface> = ({ handleChange, value, name, labelOption, valueOptions }) => {

	return (
		<div>
			<select name={name} value={value} className=" py-2 gap-1 w-[90%] bg-[#f5f5f5] border-0 outline-none"
				onChange={handleChange}
			>
				{labelOption && <option disabled>{labelOption}</option>}
				{valueOptions?.map((ele) => (
					<option key={ele} value={ele}>{ele}</option>
				))}
			</select>
		</div>
	)
}

export default SelectInput