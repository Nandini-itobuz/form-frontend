
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
		navigate(`/create-edit-form?id=${id}`)
	}

	return (
		<div className='w-[100%] xl:w-[1200px] my-2 grid grid-cols-12 bg-[#f5f5f5] justify-between  items-center px-3 py-1 '>
			<div className=" col-span-8 grid grid-cols-12 justify-center lg:gap-5">
				<div className=" lg:col-span-3 col-span-12" >{firstName} {lastName}</div>
				<div className=" lg:col-span-4 col-span-12" >{email}</div>
				<div className=" lg:col-span-1 col-span-12" >{age}</div>
				<div className=" lg:col-span-4 col-span-12" >{position}</div>
			</div>
			<div className=" lg:col-span-4 col-span-12  my-3 flex justify-end gap-4">
				<div className=" hover:cursor-pointer" onClick={() => { handleEdit() }}><MdEdit /></div>
				<div className=" hover:cursor-pointer" onClick={() => { handleDelete(id) }}><MdDeleteSweep /></div>
			</div>
		</div>
	)
}

export default TableContent