import { FC } from "react"
import axios from "axios"
import GenericInput from "./FormInputs/GenericInput";
import SelectInput from "./FormInputs/SelectInput";
import { useEffect, useState } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { JobApplication } from "../interfaces/jobApplication"


const ApplicationPage: FC = () => {

    const navigate = useNavigate();
    const [id, setId] = useState<string | null>(null);
    const [formData, setFormData] = useState<JobApplication>()

    const personalInputFields = [
        {
            name: 'firstName',
            title: 'First Name',
            value: formData?.firstName,
        },
        {
            name: 'middleName',
            required: false,
            title: 'Middle Name',
            value: formData?.middleName,
        },
        {
            name: 'lastName',
            title: 'Last Name',
            value: formData?.lastName,
        },
        {
            name: 'age',
            type: 'number',
            title: 'Age',
            value: formData?.age,
        }
    ]

    const contactInputFields = [
        {
            name: 'phone',
            type: 'tel',
            title: 'Phone Number',
            value: formData?.phone,
        },
        {
            name: 'email',
            title: 'Email Id',
            value: formData?.email,
        }
    ]

    const educaionalInputFields =
        [
            {
                name: 'institution',
                title: 'Institution/University',
                value: formData?.institution,
            },
            {
                name: 'degree',
                title: 'Degree',
                value: formData?.degree,
            }, {
                name: 'fieldOfStudy',
                type: 'text',
                title: 'Feild of Study',
                required: false,
                value: formData?.fieldOfStudy,
            }, {
                name: 'score',
                type: 'number',
                title: 'Score',
                value: formData?.score,
            }, {
                name: 'startDate',
                type: 'date',
                title: 'Start Date',
                required: false,
                value: formData?.startDate?.slice(0, 10),
            }
        ]

    const jobInputFields =
        [
            {
                name: 'yearsOfExperience',
                type: 'number',
                title: 'Years Of Experience',
                value: formData?.yearsOfExperience,
            }
        ]


    const handleFormEdit = async (): Promise<void> => {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.get('id')) { return; }
        const response = await axios.get(`http://localhost:4000/view-application/${urlParams.get('id')}`);
        setFormData(response.data.data)
        setId(urlParams.get('id'))
    }

    const handleFormFeilds = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev => (prev && { ...prev, [e.target.name]: e.target.value })))
    }

    const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!formData?.firstName || !formData?.lastName || !formData?.age ||
            !formData?.email || !formData?.score || !formData?.institution) { return toast("Enter requied feilds!"); }

        const emailExpression: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const emailResult: boolean = emailExpression.test(String(formData?.email));
        if (!emailResult) { return toast("Incorrect E-mail!") }

        // const phoneExpression: RegExp = /^[6-9]\d{9}$/;
        // const phoneResult: boolean = phoneExpression.test(String(formData?.phone));
        // if (!phoneResult) { return toast("Incorrect Phone!"); }

        const currentDate = new Date();
        const formDate = new Date(String(formData?.startDate));
        if (formDate > currentDate) { return toast('Invalid date') }

        const response = !id ? await axios.post('http://localhost:4000/create-application', formData) :
            await axios.put(`http://localhost:4000/update-application/${id}`, formData);
        response.data.data && navigate('/')
    }

    useEffect(() => {
        handleFormEdit();
    }, [])

    return (
        <>
            <ToastContainer />
            <div className=" bg-[#62abb4] p-5 ">
                <h2 className=" flex justify-center sm:text-[35px] text-[20px] font-bold">
                    Job Application Form</h2>

                <div className="bg-white  max-w-[1200px] mx-auto sm:p-10 p-5 my-5">
                    <p className=" font-bold" >Personal Information</p>
                    <br />
                    <div className="  grid grid-cols-12 gap-5 ">
                        {personalInputFields.map((ele) => (
                                <GenericInput key={ele?.name} inputProps={ele} handleChange={handleFormFeilds} />
                        ))}
                    </div>
                </div>

                <div className="bg-white  max-w-[1200px] mx-auto sm:p-10 p-5 my-5">
                    <p className=" font-bold" >Contact Details</p>
                    <br />
                    <div className="  grid grid-cols-12 gap-5 ">
                        {contactInputFields.map((ele) => (
                                <GenericInput key={ele?.name} inputProps={ele} handleChange={handleFormFeilds} />
                        ))}
                    </div>
                </div>

                <div className="bg-white  max-w-[1200px] mx-auto sm:p-10 p-5 my-5">
                    <p className=" font-bold" >Educational History</p>
                    <br />
                    <div className="  grid grid-cols-12 gap-5 ">
                        {educaionalInputFields.map((ele) => (
                                <GenericInput key={ele?.name} inputProps={ele} handleChange={handleFormFeilds} />
                        ))}
                    </div>
                </div>

                <div className="bg-white  max-w-[1200px] mx-auto sm:p-10 p-5 my-5">
                    <p className=" font-bold" >Job Details</p>
                    <br />
                    <div className="  grid grid-cols-12 gap-5 ">
                        <div className=" sm:col-span-6 col-span-12">

                            <div className=" flex flex-col ">
                                <SelectInput value={formData?.position} title="What position are you looking for?" req={false} handleChange={handleFormFeilds} name="position" />
                            </div>
                        </div>
                        {jobInputFields.map((ele) => (
                                <GenericInput key={ele?.name} inputProps={ele} handleChange={handleFormFeilds} />
                        ))}
                    </div>
                </div>

                <div className=" flex justify-center mb-5">
                    <button className=" py-2 px-10 bg-[#f5f5f5] font-bold" onClick={handleFormSubmit}>Submit</button>
                </div>

            </div>
        </>
    )
}

export default ApplicationPage