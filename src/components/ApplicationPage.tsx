import { Dispatch, FC, SetStateAction } from "react";
import GenericInput from "./FormInputs/GenericInput";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JobApplication } from "../interfaces/jobApplication";
import { Position } from "../enums/positions";
import { ApplicationClient } from "../config/axiosInstance";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormInput from "./FormInputs/SelectFormInput";
import { successSwalFire } from "../helper/swal";
import { applicationZodSchema } from "../validator/validationFormSchmea";

interface ApplicationPageInterface {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<JobApplication | null>>;
  editableId?: string | null | undefined;
}

const ApplicationPage: FC<ApplicationPageInterface> = ({
  setShowModal,
  editableId,
  setFormData,
}) => {
  const notify = (message: string) => toast(message);
  const method = useForm<JobApplication>({
    resolver: zodResolver(applicationZodSchema),
  });

  const inputDetails = [
    {
      subTitle: "Personal Information",
      data: [
        {
          name: "firstName",
          title: "First Name",
        },
        {
          name: "middleName",
          required: false,
          title: "Middle Name",
        },
        {
          name: "lastName",
          title: "Last Name",
        },
        {
          name: "age",
          type: "number",
          title: "Age",
        },
      ],
    },
    {
      subTitle: "Contact Details",
      data: [
        {
          name: "phone",
          type: "tel",
          title: "Phone Number",
        },
        {
          name: "email",
          title: "Email Id",
        },
      ],
    },
    {
      subtitle: "Educational History",
      data: [
        {
          name: "institution",
          title: "Institution/University",
        },
        {
          name: "degree",
          title: "Degree",
        },
        {
          name: "score",
          type: "number",
          title: "Score",
        },
        {
          name: "startDate",
          type: "date",
          title: "Start Date",
        },
      ],
    },
  ];

  const jobInputFields = [
    {
      name: "yearsOfExperience",
      type: "number",
      title: "Years Of Experience",
    },
  ];

  const handleFormEdit = async (): Promise<void> => {
    try {
      if (!editableId) {
        return;
      }
      const response = await ApplicationClient.get(
        `/view-application/${editableId}`,
      );
      response.data.application.startDate =
        response.data.application.startDate.slice(0, 10);
      method.reset(response.data.application);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (data: JobApplication) => {
    try {
      const response = await ApplicationClient.post(
        `/create-application/${editableId}`,
        data,
      );
      response.data.success && setShowModal(false);
      response.data.success &&
        successSwalFire("Your application is submitted successfully");
      setFormData(response.data.data);
    } catch (err: any) {
      notify(err.response.data.message);
    }
  };

  useEffect(() => {
    handleFormEdit();
  }, []);

  return (
    <>
      <ToastContainer />
      <FormProvider {...method}>
        <form
          className="w-[100%] rounded-lg"
          onSubmit={method.handleSubmit(handleFormSubmit)}
        >
          {inputDetails.map((ele) => (
            <div className=" bg-custom-bg bg-opacity-10  max-w-[1200px] mx-auto sm:p-10 p-2 my-5 rounded-lg">
              <p className=" font-bold mb-5 text-white">{ele.subTitle}</p>
              <div className="  grid grid-cols-12 gap-5 text-white ">
                {ele.data.map((ele) => (
                  <GenericInput key={ele?.name} inputProps={ele} />
                ))}
              </div>
            </div>
          ))}

          <div className=" bg-custom-bg  max-w-[1200px] mx-auto sm:p-10 p-2 my-5 rounded-lg">
            <p className=" font-bold mb-5 text-white">Job Details</p>
            <div className="  grid grid-cols-12 gap-5 ">
              <div className=" sm:col-span-6 col-span-12">
                <div className=" flex flex-col gap-2 ">
                  <div className=" font-medium text-white">
                    What position are you looking for?
                  </div>
                  <SelectFormInput
                    valueOptions={Object.values(Position)}
                    name="position"
                  />
                </div>
              </div>
              {jobInputFields.map((ele) => (
                <GenericInput key={ele?.name} inputProps={ele} />
              ))}
            </div>
          </div>

          <div className=" flex justify-center mb-5">
            <input
              type="submit"
              className=" py-2 px-10 rounded-md bg-custom-bg text-white  font-bold hover:cursor-pointer"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default ApplicationPage;
