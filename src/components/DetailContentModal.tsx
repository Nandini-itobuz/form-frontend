import { GiCancel } from "react-icons/gi";
import { JobApplication } from "../interfaces/jobApplication";
import { FC, Dispatch, SetStateAction } from "react";

interface DetailContent {
  inputProps: JobApplication;
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
}

interface DetailValueInterface {
  name: string;
  value: string | number | undefined;
}

const DetailContentModal: FC<DetailContent> = ({
  setShowDetailModal,
  inputProps,
}) => {
  const detailValues: DetailValueInterface[] = [
    {
      name: "First Name",
      value: inputProps?.firstName,
    },
    {
      name: "Middle Name",
      value: inputProps?.middleName,
    },
    {
      name: "Last Name",
      value: inputProps?.lastName,
    },
    {
      name: "Age",
      value: inputProps?.age,
    },
    {
      name: "Email Id",
      value: inputProps?.email,
    },
    {
      name: "Phone",
      value: inputProps?.phone,
    },
    {
      name: "Position",
      value: inputProps?.position,
    },
    {
      name: "Institution",
      value: inputProps?.institution,
    },
    {
      name: "Degree",
      value: inputProps?.degree,
    },
    {
      name: "Start Date",
      value: inputProps?.startDate?.slice(0, 10),
    },
    {
      name: "Years of Experience",
      value: inputProps?.yearsOfExperience,
    },
  ];

  return (
    <div className=" modal-full-bg">
      <div className=" modal-bg-white">
        <GiCancel
          className=" ms-auto hover:cursor-pointer"
          onClick={() => {
            setShowDetailModal(false);
          }}
          size={"30px"}
        />

        <div className=" bg-custom-bg w-[100%] sm:p-10 p-2 mt-5 rounded-lg overflow-y-scroll no-scrollbar">
          {detailValues.map(
            (ele) =>
              ele.value && (
                <div
                  key={ele.value}
                  className=" flex flex-col sm:flex-row justify-between my-3 text-white font-medium"
                >
                  <span>{ele.name}</span>
                  <div className=" p-2 sm:w-[50%] w-[100%] bg-[#37374B] ">
                    {ele.value}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailContentModal;
