import {FC} from 'react'
import { Position } from '../../interfaces/jobApplication';

interface selectInputInterface {
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void ;
  title?: string;
  req?: boolean;
  name?: string
  placeholder?: string;
  value?: string

}

const SelectInput: FC<selectInputInterface> = ({ handleChange, title, req, value, name}) => {
	return (
		<div>
			<div className=" font-medium">{title}{ req && <sup >*</sup>}</div>
			<select name={name} value={value} className=" py-2 gap-1 w-[90%] bg-[#f5f5f5] border-0 outline-none" 
				onChange={handleChange}
			>
				<option  disabled>Positions</option>
				<option value={Position.FRONTEND_DEVELOPER}>Frontend Developer</option>
				<option value={Position.BACKEND_DEVELOPER}>Backend Developer</option>
				<option value={Position.INTERN}>Intern</option>
				<option value={Position.QA}>QA</option>
			</select>
		</div>
	)
}

export default SelectInput