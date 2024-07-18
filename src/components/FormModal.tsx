import { Dispatch, FC, SetStateAction } from "react"
import { GiCancel } from "react-icons/gi";
import ApplicationPage from "../pages/ApplicationPage";

interface FormModalInterface {
	setShowModal: Dispatch<SetStateAction<boolean>>;
	getAllUser : () => void;
	editableId? : string | null | undefined;
	setEditableId : Dispatch<SetStateAction<string | null | undefined>>
}

const FormModal: FC<FormModalInterface> = ({ setShowModal, getAllUser, editableId, setEditableId }) => {

	const handleFormClose = () =>{
		setShowModal(false);
		setEditableId(null)
	}

	return (
		<div className=" z-10 bg-[#000] bg-opacity-50 top-0 bottom-0 right-0 left-0 absolute flex justify-center items-center">
			<div className="  bg-[#f5f5f5] rounded-lg flex flex-col items-start xl:w-[50vw] sm:h-[90vh] h-[90vh] w-[85vw] md:w-[80vw] sm:p-8 p-4  gap-2">
				<div className=" flex justify-between items-center w-[100%]">
					<div className="flex justify-center sm:text-[25px] text-[20px] font-bold">Job Application Form</div>
					<div className=" hover:cursor-pointer" onClick={() => {  handleFormClose() }}><GiCancel size={'20px'} /></div>
				</div>

				<div className="overflow-y-scroll no-scrollbar w-[100%]">
					<ApplicationPage setShowModal={setShowModal} getAllUser={getAllUser} editableId={editableId}  />
				</div>
			</div>
		</div>
	)
}

export default FormModal