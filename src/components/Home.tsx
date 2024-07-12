import { useEffect, useState } from "react";
import Button from "./Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JobApplication, Position } from "../interfaces/jobApplication";
import TableContent from "./TableContent";
import Swal from 'sweetalert2'

const Home = () => {
  const [allForms, setAllForms] = useState<JobApplication[]>([]);

  const [page, setPage] = useState<string>('1');
  const [pageSize, setPageSize] = useState<string>('5');
  const [totalPages, setTotalPages] = useState(1);

  const [showFilteredPosition, setShowFiltereddPosition] = useState<string>('Sort By')
  const navigate = useNavigate();

  const getAllUser = async (): Promise<void> => {
    const response = await axios.get(`http://localhost:3007/view-applications/${page}/${pageSize}`);
    setTotalPages(response.data.data.totalPages)
    setAllForms(response.data.data.applicationData);
    console.log(response)
  }

  const handleDeleteAppliaction = async (id: string): Promise<void> => {
    await axios.delete(`http://localhost:3007/delete-application/${id}`);
    getAllUser();
  }

  const handleDelete = async (id: string): Promise<void> => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAppliaction(id);
        Swal.fire("Deleted successfully!", "", "success");
      }
    });
  }

  const deleteApplications = async (): Promise<void> => {
    await axios.delete('http://localhost:3007/delete-all-applications');
    getAllUser();
  }

  const handlePositionChange = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setShowFiltereddPosition(e.target.value)
    const response = await axios.get(`http://localhost:3007/view-applications/${e.target.value}`)
    setAllForms(response.data.data);
  }

  const deleteAllApplications = async (): Promise<void> => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApplications();
        Swal.fire("Deleted successfully!", "", "success");
      }
    });
  }

  useEffect(() => {
    getAllUser();
  }, [page])

  return (
    <div className=" h-[100vh]  flex flex-col gap-3  py-5 justify-between items-center  font-[forum] bg-[#62abb4] ">
      <div>
        <div className=" grid grid-cols-12 md:gap-10 gap-2 px-2 justify-center items-center">
          <Button handleClick={() => { navigate('/form') }}>Add </Button>
          <Button handleClick={getAllUser}>View All</Button>
          <Button handleClick={deleteAllApplications}>Delete All</Button>
          <div className=" md:col-span-3 col-span-6 hover:cursor-pointer py-2 px-10 bg-[#f5f5f5] font-bold">
            <select name="Sort By" value={showFilteredPosition} onChange={handlePositionChange} className=" bg-[#f5f5f5]   w-[100%] outline-none" >
              <option disabled >Sort By</option>
              <option value={Position.FRONTEND_DEVELOPER} >{Position.FRONTEND_DEVELOPER}</option>
              <option value={Position.BACKEND_DEVELOPER} >{Position.BACKEND_DEVELOPER}</option>
              <option value={Position.QA} >{Position.QA}</option>
              <option value={Position.INTERN} >{Position.INTERN}</option>
            </select>
          </div>
        </div>

        <div className=" my-10 xl:px-10 ">
          {allForms.length ? allForms.map((ele) => (
            <TableContent key={ele._id} handleDelete={handleDelete} age={ele.age} email={ele.email} position={ele.position} firstName={ele.firstName} lastName={ele.lastName} id={ele._id} />
          )) : <span className=" font-bold text-[20px] text-white">No Data Available</span>}
        </div>
      </div>

      <div className=" flex gap-2 mb-10">
        <button className="py-2 px-5 bg-[#f5f5f5] font-bold" onClick={() => { Number(page) - 1 >=1 && setPage((Number(page) - 1).toString())}}>Previous</button>
        <button className="py-2 px-5 bg-[#f5f5f5] font-bold" >{page}</button>
        <button className="py-2 px-5 bg-[#f5f5f5] font-bold" onClick={() => { Number(page) + 1 <= totalPages && setPage((Number(page) + 1).toString())}}>Next</button>
      </div>

    </div>
  )
}

export default Home