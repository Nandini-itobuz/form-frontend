import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { JobApplication } from "../interfaces/jobApplication";
import { ApplicationClient } from "../config/axiosInstance";
import { successSwalFire } from "../helper/swal";
import { toast, ToastContainer } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import applicationYupSchema from "../validator/validationFormSchmea";
import GenericInput from "./FormInputs/GenericInput";
import SelectFormInput from "./FormInputs/SelectFormInput";
import { Position } from "../enums/positions";

interface FormModalInterface {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  editableId?: string | null | undefined
  setTableContentData?: (data: JobApplication) => void
}

const FormModal: FC<FormModalInterface> = ({
  setShowModal,
  editableId,
  setTableContentData
}) => {

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

  const handleFormClose = () => {
    setShowModal(false);
  };

  const method = useForm<JobApplication>({
    resolver: yupResolver(applicationYupSchema),
  });

  const handleFormEdit = async (): Promise<void> => {
    if (!editableId) {
      return;
    }
    const { data } = await ApplicationClient.get(
      `/view-application/${editableId}`,
    );
    method.reset({ ...data, startDate: data.startDate.slice(0, 10) });
  };

  const handleFormSubmit = async (editedData: JobApplication) => {
    try {
      const { data } = await ApplicationClient.post(
        `/create-application/${editableId}`,
        { ...editedData, _id: editableId },
      );
      setShowModal(false);
      setTableContentData && setTableContentData(data)
      successSwalFire("Your application is submitted successfully");
    } catch (err: any) {
      console.log(err)
      toast(err.response.data.message);
    }
  };

  useEffect(() => {
    handleFormEdit();
  }, []);

  return (
    <div className=" modal-full-bg">
      <div className=" modal-bg-white">
        <ToastContainer />
        <GiCancel className=" ms-auto hover:cursor-pointer" onClick={() => { handleFormClose() }} size={"30px"} />

        <div className="overflow-y-scroll no-scrollbar w-[100%]">
          <FormProvider {...method}>
            <form
              className="w-[100%] rounded-lg"
              onSubmit={method.handleSubmit(handleFormSubmit)}
            >
              {inputDetails.map((ele) => (
                <div key={ele.subTitle} className=" bg-custom-bg bg-opacity-10 mx-auto sm:p-10 p-2 my-5 rounded-lg">
                  <p className=" font-bold mb-5 text-white">{ele.subTitle}</p>
                  <div className="  grid grid-cols-12 gap-5 text-white ">
                    {ele.data.map((ele) => (
                      <GenericInput key={ele?.name} inputProps={ele} />
                    ))}
                  </div>
                </div>
              ))}

              <div className=" bg-custom-bg mx-auto sm:p-10 p-2 my-5 rounded-lg">
                <p className=" font-bold mb-5 text-white">Job Details</p>
                <div className="  grid grid-cols-12 gap-5 ">
                  <div className=" sm:col-span-6 col-span-12">
                    <div className=" flex flex-col gap-2 ">
                      <span className=" font-medium text-white">
                        What position are you looking for?
                      </span>
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
                  className=" py-2 px-10 rounded-md bg-custom-bg text-white font-bold hover:cursor-pointer"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default FormModal;


