import { useEffect, useState } from "react";
import Button from "./Button"
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { JobApplication, Position } from "../interfaces/jobApplication";
import TableContent from "./TableContent";

const Home = () => {
  const [show, setShow] = useState<boolean>(false);
  const [allForms, setAllForms] = useState<JobApplication[]>([]);
  const [showFilteredPosition, setShowFiltereddPosition] = useState<string>('Sort By')
  const [id, setId] = useState<string>('');
  const navigate = useNavigate();

  const handleViewStatus = (): void => {
    navigate(`/status?id=${id}`)
  }

  const getAllUser = async (): Promise<void> => {
    const response = await axios.get('http://localhost:3007/view-applications');
    setAllForms(response.data.data);
  }

  const handleDelete = async (id: string): Promise<void> => {
    await axios.delete(`http://localhost:3007/delete-application/${id}`);
    getAllUser();
  }

  const handlePositionChange = async (e: React.ChangeEvent<HTMLSelectElement>): Promise<void> => {
    setShowFiltereddPosition(e.target.value)
    const response = await axios.get(`http://localhost:3007/view-applications/${e.target.value}`)
    setAllForms(response.data.data);
  }

  useEffect(() => {
    getAllUser();
  }, [])

  return (
    <div className=" h-[100vh] w-[100vw] flex flex-col gap-3  py-5 items-center font-[forum]">
      <div className=" flex gap-10">
        <Button handleClick={() => { navigate('/form') }}>Add job Application</Button>
        <Button handleClick={() => { setShow(true) }}>View Status</Button>
        <Button handleClick={getAllUser}>All</Button>
        <div className="hover:cursor-pointer py-2 px-10 bg-[#f5f5f5] font-bold">
          <select title="Sort By" value={showFilteredPosition} onChange={handlePositionChange} className=" bg-[#f5f5f5]  outline-none" >
            <option value=''>Sort By</option>
            <option value={Position.FRONTEND_DEVELOPER}  >{Position.FRONTEND_DEVELOPER}</option>
            <option value={Position.BACKEND_DEVELOPER} >{Position.BACKEND_DEVELOPER}</option>
            <option value={Position.QA}  >{Position.QA}</option>
            <option value={Position.INTERN} >{Position.INTERN}</option>
          </select>
        </div>
      </div>

      <div  className=" my-10">
        <span className=" font-bold">Applications</span>
        {allForms.map((ele) => (
          <TableContent key={ele._id} handleDelete={handleDelete} age={ele.age} email={ele.email} position={ele.position} firstName={ele.firstName} lastName={ele.lastName} id={ele._id} />
        ))}
      </div>

      {show &&
        <div className=" flex gap-2 justify-center items-center bg-[#f5f5f5] px-2 w-[100vw] 
        max-w-[400px]">
          <h2>Enter your id :</h2>
          <input value={id} className="py-2 gap-1  bg-[#f5f5f5] border-0 outline-none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setId(e.target.value) }} type="text" />
          <button className=" bg-white px-4" onClick={handleViewStatus}>View</button>
          <div className=" hover:cursor-pointer" onClick={(): void => { setShow(false) }}><MdCancel />
          </div>
        </div>
      }

    </div>
  )
}

export default Home