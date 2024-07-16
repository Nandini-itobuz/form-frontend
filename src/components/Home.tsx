import React, { useEffect, useState } from "react";
import Button from "./Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JobApplication } from "../interfaces/jobApplication";
import { Position } from "../enums/positions";
import TableContent from "./TableContent";
import Swal from 'sweetalert2'
import SelectInput from "./FormInputs/SelectInput";
import { PageSize } from "../enums/pageSize"

const Home = () => {

  const navigate = useNavigate();
  const [page, setPage] = useState<string>('1');
  const [totalPages, setTotalPages] = useState<string>('1');
  const [allForms, setAllForms] = useState<JobApplication[]>([]);
  const [showFilteredPosition, setShowFiltereddPosition] = useState<string>('Sort By')

  const availablePositions = [Position.FRONTEND_DEVELOPER, Position.BACKEND_DEVELOPER, Position.INTERN, Position.QA];
  const pageSizeOptions: string[] =
    [PageSize.FIVE, PageSize.TEN, PageSize.TWLEVE, PageSize.FIFTEEN, PageSize.TWENTY];
  const [pageSize, setPageSize] = useState<string>(pageSizeOptions[0]);


  const getAllUser = async (): Promise<void> => {
    try {
      const response = showFilteredPosition === 'Sort By' ? await axios.get(`http://localhost:4000/view-applications/${page}/${pageSize}`) : await axios.get(`http://localhost:4000/view-applications/${showFilteredPosition}/${page}/${pageSize}`)
      setTotalPages(response.data.data.totalPages)
      setAllForms(response.data.data.applicationData);
    } catch (err) { console.log(err) }
  }

  const handleDeleteAppliaction = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:4000/delete-application/${id}`);
      getAllUser();
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id: string): Promise<void> => {
    Swal.fire({
      title: "Delete item?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton: 'confirm-button-class',
        denyButton: 'confirm-button-class',
        title: 'title-class',
        icon: 'icon-class'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAppliaction(id);
        Swal.fire("Deleted successfully!", "", "success");
      }
    });
  }

  const deleteApplications = async (): Promise<void> => {
    try {
      await axios.delete('http://localhost:4000/delete-all-applications');
      getAllUser();
    } catch (err) { console.log(err) }
  }

  const deleteAllApplications = async (): Promise<void> => {
    Swal.fire({
      title: "Delete All Items?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton: 'confirm-button-class',
        denyButton: 'confirm-button-class',
        title: 'title-class',
        icon: 'icon-class'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApplications();
        Swal.fire("Deleted successfully!", "", "success");
      }
    });
  }

  useEffect(() => {
    getAllUser();
  }, [page, pageSize, showFilteredPosition])

  return (
    <div className=" min-h-[100vh]  flex flex-col gap-3  py-5 justify-between items-center font-[Roboto] bg-[#62abb4] ">
      <div>
        <div className=" grid grid-cols-12 md:gap-10 gap-2 px-2 justify-center items-center">
          <Button handleClick={() => { navigate('/create-edit-form') }}>Add </Button>
          <Button handleClick={() => {setShowFiltereddPosition('Sort By')}}>View All</Button>
          <Button handleClick={deleteAllApplications}>Delete All</Button>
          <div className=" md:col-span-3 px-4 col-span-6 hover:cursor-pointer  bg-[#f5f5f5] font-bold">
            <SelectInput value={showFilteredPosition}
              valueOptions={availablePositions}
              labelOption="Sort By"
              handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {setShowFiltereddPosition(e.target.value)}} name="position" />
          </div>
        </div>

        <div className=" sm:max-h-[70vh] max-h-[60vh] overflow-x-scroll no-scrollbar my-10 max-w-[1200px]  box-border px-4 xl:px-0">
          {allForms.length ? allForms.map((ele) => (
            <TableContent key={ele._id} handleDelete={handleDelete} age={ele?.age} email={ele?.email} position={ele?.position} firstName={ele?.firstName} lastName={ele?.lastName} id={ele?._id} />
          )) : <div className=" xl:w-[1200px] my-2 font-bold text-white px-3 py-1">No data</div>}
        </div>
      </div>

      <div className=" grid grid-cols-12 gap-2 mb-10 p-2">
        <button className=" sm:col-span-3 col-span-4  py-2 px-5 bg-[#f5f5f5] font-bold" onClick={() => { Number(page) - 1 >= 1 && setPage((Number(page) - 1).toString()) }}>Previous</button>
        <button className=" sm:col-span-3 col-span-4 py-2 px-5 bg-[#f5f5f5] font-bold" >{page} of {totalPages}</button>
        <button className=" sm:col-span-3 col-span-4 py-2 px-5 bg-[#f5f5f5] font-bold" onClick={() => { Number(page) + 1 <= Number(totalPages) && setPage((Number(page) + 1).toString()) }}>Next</button>
        <div className=" sm:col-span-3 col-span-12 flex justify-center">
          <span className="py-2 px-5 font-bold">Page Size:</span>
          <SelectInput value={pageSize} handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setPage('1')
            setPageSize(e.target.value)
          }} valueOptions={pageSizeOptions} />
        </div>
      </div>

    </div>
  )
}

export default Home