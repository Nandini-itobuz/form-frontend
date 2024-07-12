import { useEffect, useState } from "react"
import GenericInput from "./GenericInput"
import { JobApplication,Position } from "../interfaces/jobApplication"
import { FC } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useNavigate } from "react-router-dom"


const ApplicationPage: FC = () => {

    const navigate = useNavigate();
    const [id, setId] = useState<string | null>(null);
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
            position: Position.INTERN,
            status: false,
            startDate: new Date()
        })


    const handleFormEdit = async (): Promise<void> => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get('id') === null) {
            return ;
        }
        const response = await axios.get(`http://localhost:3007/view-application/${urlParams.get('id')}`);
        setFormData(response.data.data)
        setId(urlParams.get('id'))
    }

    useEffect(() => {
        handleFormEdit();
    }, [])

    const handleFormFeilds = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev => ({ ...prev, [e.target.name]: e.target.value })))
    }

    const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();
        if (formData.firstName === '' || formData.lastName === '' || formData.age === 0 || 
            formData.email === ''  || formData.score === 0 || formData.institution === '') 
            { toast("Enter requied feilds!"); return; }

        const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const emailResult: boolean = emailExpression.test(formData.email);
        if (!emailResult) { toast("Incorrect E-mail!"); return; }

        const phoneExpression: RegExp = /^[6-9]\d{9}$/;
        const phoneResult: boolean = phoneExpression.test(String(formData.phone));
        if (!phoneResult) { toast("Incorrect Phone!"); return; }

        if (id === null) {
            const response = await axios.post('http://localhost:3007/create-application', formData);
            response.statusText === "OK" && navigate('/')
        }
        else {
            const response = await axios.put(`http://localhost:3007/update-application/${id}`, formData);
            response.statusText === "OK" && navigate('/')
        }
    }

    return (
        <>
            <ToastContainer />
            <form>
                <div className=" bg-[#dedddd] p-5 ">
                    <h2 className=" flex justify-center sm:text-[35px] text-[20px] font-bold">
                        Job Application Form</h2>
                    <div className="bg-white  max-w-[1200px] mx-auto sm:p-10 p-5 my-5">
                        <p className=" font-bold" >Personal Information</p>
                        <br />
                        <div className="  grid grid-cols-12 gap-5 ">
                            <div className=" sm:col-span-6 col-span-12 ">
                                <GenericInput name="firstName" typeOf="text" title="First Name" 
                                req={true} value={formData.firstName} handleChange={handleFormFeilds} />
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="middleName" typeOf="text" title="Middle Name"
                                 req={false} value={formData.middleName} handleChange={handleFormFeilds} />
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="lastName" typeOf="text" title="Last Name"
                                 req={true} value={formData.lastName} handleChange={handleFormFeilds} />
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="age" typeOf="number" title="Age" 
                                req={true} value={formData.age} handleChange={handleFormFeilds} />
                            </div>

                        </div>
                    </div>

                    <div className="bg-white  max-w-[1200px] mx-auto sm:p-10 p-5 my-5">
                        <p className=" font-bold">Contact Information</p>
                        <br />
                        <div className="  grid grid-cols-12 gap-5 ">
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="phone" typeOf="tel" title="Phone Number" 
                                req={true} value={formData.phone} handleChange={handleFormFeilds} />
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="email" typeOf="email" title="Email" 
                                req={true} value={formData.email} handleChange={handleFormFeilds} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white  max-w-[1200px] mx-auto sm:p-10 p-5 my-5">
                        <p className=" font-bold" >Eductaional Qualifications Details</p>
                        <br />
                        <div className="  grid grid-cols-12 gap-5 ">
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="institution" typeOf="text"
                                 title="Institution/University" req={true} value={formData.institution} handleChange={handleFormFeilds} />
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="degree" typeOf="text" title="Degree" 
                                req={true} value={formData.degree} handleChange={handleFormFeilds} />
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="fieldOfStudy" typeOf="text" title="Specification" 
                                req={false} value={formData.fieldOfStudy} handleChange={handleFormFeilds} />
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="score" typeOf="number" title="Score" 
                                req={true} value={formData.score} handleChange={handleFormFeilds} />
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="startDate" typeOf="date" title="Start Date" 
                                req={true} value={formData.startDate} handleChange={handleFormFeilds} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white  max-w-[1200px] mx-auto sm:p-10 p-5 my-5">
                        <p className=" font-bold" >Job Details</p>
                        <br />
                        <div className="  grid grid-cols-12 gap-5 ">
                            <div className=" sm:col-span-6 col-span-12">

                                <div className=" flex flex-col ">
                                    <div className=" font-medium">what postion are you looking for?
                                        <sup >*</sup></div>
                                    <select name="position" value={formData.position} className=" py-2 gap-1 w-[90%] bg-[#f5f5f5] border-0 outline-none" onChange={handleFormFeilds}>
                                    <option >Positions</option>
                                        <option value={Position.FRONTEND_DEVELOPER}>Frontend Developer</option>
                                        <option value={Position.BACKEND_DEVELOPER}>Backend Developer</option>
                                        <option value={Position.INTERN}>Intern</option>
                                        <option value={Position.QA}>QA</option>
                                    </select>
                                </div>
                            </div>
                            <div className=" sm:col-span-6 col-span-12">
                                <GenericInput name="yearsOfExperience" typeOf="number" title="Years of experience" req={true} value={formData.yearsOfExperience} handleChange={handleFormFeilds} />
                            </div>
                        </div>
                    </div>

                    <div className=" flex justify-center mb-5">
                        <button className=" py-2 px-10 bg-[#f5f5f5] font-bold" onClick={handleFormSubmit}>Submit</button>
                    </div>


                </div>
            </form>
        </>
    )
}

export default ApplicationPage