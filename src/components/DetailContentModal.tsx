import { GiCancel } from 'react-icons/gi';
import { JobApplication } from '../interfaces/jobApplication';
import { FC, Dispatch, SetStateAction } from 'react';


interface DetailContent {
	inputProps: JobApplication;
	setShowDetailModal: Dispatch<SetStateAction<boolean>>;
}

interface DetailValueInterface {
	name: string;
	value: string | number | undefined
}

const DetailContentModal: FC<DetailContent> = ({ setShowDetailModal, inputProps }) => {

	const detailValues: DetailValueInterface[] = [
		{
			name: 'First Name',
			value: inputProps?.firstName
		},
		{
			name: 'Middle Name',
			value: inputProps?.middleName
		},
		{
			name: 'Last Name',
			value: inputProps?.lastName
		},
		{
			name: 'Age',
			value: inputProps?.age
		},
		{
			name: 'Email Id',
			value: inputProps?.email
		},
		{
			name: 'Phone',
			value: inputProps?.phone
		},
		{
			name: 'Position',
			value: inputProps?.position
		},
		{
			name: 'Institution',
			value: inputProps?.institution
		},
		{
			name: 'Degree',
			value: inputProps?.degree
		},
		{
			name: 'Start Date',
			value: inputProps?.startDate?.slice(0, 10)
		},
		{
			name: 'Years of Experience',
			value: inputProps?.yearsOfExperience
		}
	]


	return (
		<div className=" z-10 bg-[#000] bg-opacity-50 top-0 bottom-0 right-0 left-0 absolute flex justify-center items-center">
			<div className="  bg-[#f5f5f5] rounded-lg flex flex-col items-start xl:w-[50vw] sm:h-[75vh] md:h-[80vh] h-[90vh] w-[85vw] md:w-[80vw] sm:p-8 p-4  gap-2">
				<div className=" flex justify-between items-center w-[100%]">
					<div className="flex justify-center sm:text-[25px] text-[20px] font-bold">
						Hello, {`${inputProps?.firstName} ${inputProps?.lastName}`}
					</div>
					<div
						className=" hover:cursor-pointer"
						onClick={() => {
							setShowDetailModal(false)
						}}
					>
						<GiCancel size={"20px"} />
					</div>
				</div>


				<div className="bg-[#62abb4] w-[100%] mx-auto sm:p-10 p-2 my-5 rounded-lg overflow-y-scroll no-scrollbar">

					{detailValues.map((ele) => (
						ele.value && <div className=" flex flex-col sm:flex-row w-[100%] sm:items-center sm:gap-5 justify-between my-3 ">
							<div className=" font-medium">{ele.name}</div>
							<div
								className=" p-2 gap-1  xl:w-[50%] sm:w-[60%] w-[100%] bg-[#fff] border-0 outline-none" >{ele.value}</div>
						</div>
					))}

				</div>


			</div>
		</div>
	)
}

export default DetailContentModal