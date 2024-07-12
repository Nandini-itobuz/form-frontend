import { useEffect, useState } from "react"
import { JobApplication } from "../interfaces/jobApplication"
import axios from "axios"

const ApplicationStatus = () => {

  const [formData, setFormData] = useState<JobApplication>(
    {
      firstName: '',
      middleName: '',
      lastName: '',
      age: 0,
      phone: '',
      email: '',
      yearsOfExperience: 0,
      institution: '',
      degree: '',
      score: 0,
      fieldOfStudy: '',
      position: '',
      status: false,
      startDate: new Date()
    })

  const handleSetFormData = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('id'))
    const response = await axios.get(`http://localhost:3007/view-application/${urlParams.get('id')}`);
    setFormData(response.data.data)
  }

  useEffect(() => {
    handleSetFormData();
  }, [])

  return (
    <div className=" my-5">
    <div className=" bg-white ">
      {formData.status ? <span className=" text-bold  flex justify-center ">Your application is under review</span> :
        <span className=" text-bold flex justify-center">Better luck next time</span>}
    </div>

    <div className="  max-w-[600px] mx-auto   flex-col p-5"> 
      <div className="flex justify-between py-1 px-3 my-1 bg-[#f5f5f5]"><span>First Name :
        </span><span>{formData.firstName}</span></div>
      <div className="flex justify-between py-1 px-3 my-1 bg-[#f5f5f5]"><span>Last Name : 
        </span><span>{formData.lastName}</span></div>
      <div className="flex justify-between py-1 px-3 my-1 bg-[#f5f5f5]"><span>Position :
        </span><span>{formData.position}</span></div>
    </div>
    </div>

  )
}

export default ApplicationStatus