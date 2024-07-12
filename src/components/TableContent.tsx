
import { MdEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface TableContent {
	firstName: string;
	id?: string;
	lastName: string;
	age: number;
	email: string;
	position: string
	handleDelete: (id: any) => Promise<void>
}

const TableContent: FC<TableContent> = ({ handleDelete, firstName, lastName, id, age, email, position }) => {

	const navigate = useNavigate();
	const handleEdit = () => {
		navigate(`/form?id=${id}`)
	}

	return (
		<div className=' my-2 grid grid-cols-12 bg-[#f5f5f5] justify-between items-center w-[70vw] px-3 py-1 '>
			<div className=" col-span-8 grid grid-cols-12 justify-center gap-5">
				<div className=" col-span-3" >{firstName} {lastName}</div>
				<div className=" col-span-3" >{email}</div>
				<div className=" col-span-3" >{age}</div>
				<div className=" col-span-3" >{position}</div>
			</div>
			<div className=" col-span-4  my-3 flex justify-end gap-4">
				<div className=" hover:cursor-pointer" onClick={() => { handleEdit() }}><MdEdit /></div>
				<div className=" hover:cursor-pointer" onClick={() => { handleDelete(id) }}><MdDeleteSweep /></div>
			</div>
		</div>
	)
}

export default TableContent