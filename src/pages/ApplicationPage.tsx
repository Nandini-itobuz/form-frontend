import { Dispatch, FC, SetStateAction } from "react"
import GenericInput from "../components/FormInputs/GenericInput";
import SelectInput from "../components/FormInputs/SelectInput";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { JobApplication } from "../interfaces/jobApplication";
import { Position } from "../enums/positions";
import { validateInputValues } from "../validator/formInputsValues";
import { ValidationResponse } from "../interfaces/validationResponse";
import { ApplicationClient } from "../config/axiosInstance";
import { useForm } from "react-hook-form";

interface ApplicationPageInterface {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    getAllUser: () => void;
    editableId?: string | null | undefined
}

const ApplicationPage: FC<ApplicationPageInterface> = ({ setShowModal, getAllUser, editableId }) => {

    const method = useForm<JobApplication>();
    const [formData, setFormData] = useState<JobApplication>({
        firstName: "",
        lastName: "",
        age: 0,
        phone: "",
        email: "",
        yearsOfExperience: 0,
        institution: "",
        degree: "",
        score: 0,
        position: Position.INTERN,
        status: false,
        startDate: "",
    });
    const notifyFunction = (message: string) => {
        toast(message);
        return;
    }

    const personalInputFields = [
        {
            name: "firstName",
            title: "First Name",
            value: formData?.firstName,
        },
        {
            name: "middleName",
            required: false,
            title: "Middle Name",
            value: formData?.middleName,
        },
        {
            name: "lastName",
            title: "Last Name",
            value: formData?.lastName,
        },
        {
            name: "age",
            type: "number",
            title: "Age",
            value: formData?.age,
        },
    ];

    const contactInputFields = [
        {
            name: "phone",
            type: "tel",
            title: "Phone Number",
            value: formData?.phone,
        },
        {
            name: "email",
            title: "Email Id",
            value: formData?.email,
        },
    ];

    const educaionalInputFields = [
        {
            name: "institution",
            title: "Institution/University",
            value: formData?.institution,
        },
        {
            name: "degree",
            title: "Degree",
            value: formData?.degree,
        },
        {
            name: "fieldOfStudy",
            title: "Feild of Study",
            required: false,
            value: formData?.fieldOfStudy,
        },
        {
            name: "score",
            type: "number",
            title: "Score",
            value: formData?.score,
        },
        {
            name: "startDate",
            type: "date",
            title: "Start Date",
            required: false,
            value: formData?.startDate?.slice(0, 10),
        },
    ];

    const jobInputFields = [
        {
            name: "yearsOfExperience",
            type: "number",
            title: "Years Of Experience",
            value: formData?.yearsOfExperience,
        },
    ];

    const availablePositions = [
        Position.FRONTEND_DEVELOPER,
        Position.BACKEND_DEVELOPER,
        Position.INTERN,
        Position.QA,
    ];

    const handleFormEdit = async (): Promise<void> => {
        try {
            if (!editableId) {
                return;
            }
            const response = await ApplicationClient.get(
                `/view-application/${editableId}`
            );
            setFormData(response.data.application);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFormFeilds = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };



    const handleFormSubmit = async ( data: JobApplication) => {
        try {
            console.log(data)
            const validate: ValidationResponse = validateInputValues(formData);
            !validate.success && notifyFunction(validate.message);

            if (!validateInputValues(formData)) { return; }
            const response = await ApplicationClient.post(
                `/create-application/${editableId}`, formData
            );
            response.data.data && setShowModal(false);
            getAllUser();
        } catch (err: any) {
            toast(err.response.data.message);
        }
    };

    useEffect(() => {
        handleFormEdit();
    }, []);

    return (
        <>
            <ToastContainer />
            <form className="w-[100%] rounded-lg" onSubmit={method.handleSubmit(handleFormSubmit)}>

                <div className="bg-[#62abb4]  max-w-[1200px] mx-auto sm:p-10 p-2 my-5 rounded-lg">
                    <p className=" font-bold mb-5">Personal Information</p>
                    <div className="  grid grid-cols-12 gap-5 ">
                        {personalInputFields.map((ele) => (
                            <GenericInput
                                key={ele?.name}
                                inputProps={ele}
                                handleChange={handleFormFeilds}
                                register={ method.register }
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-[#62abb4]  max-w-[1200px] mx-auto sm:p-10 p-2 my-5 rounded-lg">
                    <p className=" font-bold mb-5 text-whi">Contact Details</p>
                    <div className="  grid grid-cols-12 gap-5 ">
                        {contactInputFields.map((ele) => (
                            <GenericInput
                                key={ele?.name}
                                inputProps={ele}
                                handleChange={handleFormFeilds}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-[#62abb4]  max-w-[1200px] mx-auto sm:p-10 p-2 my-5 rounded-lg">
                    <p className=" font-bold mb-5">Educational History</p>
                    <div className="  grid grid-cols-12 gap-5 ">
                        {educaionalInputFields.map((ele) => (
                            <GenericInput
                                key={ele?.name}
                                inputProps={ele}
                                handleChange={handleFormFeilds}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-[#62abb4]  max-w-[1200px] mx-auto sm:p-10 p-2 my-5 rounded-lg">
                    <p className=" font-bold mb-5">Job Details</p>
                    <div className="  grid grid-cols-12 gap-5 ">
                        <div className=" sm:col-span-6 col-span-12">
                            <div className=" flex flex-col ">
                                <div className=" font-medium">
                                    What position are you looking for?<sup>*</sup>
                                </div>
                                <SelectInput
                                    value={formData?.position}
                                    valueOptions={availablePositions}
                                    labelOption="Positions"
                                    handleChange={handleFormFeilds}
                                    name="position"
                                />
                            </div>
                        </div>
                        {jobInputFields.map((ele) => (
                            <GenericInput
                                key={ele?.name}
                                inputProps={ele}
                                handleChange={handleFormFeilds}
                            />
                        ))}
                    </div>
                </div>

                <div className=" flex justify-center mb-5">
                    <input type="submit"   className=" py-2 px-10 bg-[#62abb4] text-white rounded-sm font-bold"/>
                </div>

            </form>
        </>
    );
};

export default ApplicationPage;
