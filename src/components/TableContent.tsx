import { MdEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { FC, useState } from "react";
import FormModal from "./FormModal";
import { ApplicationClient } from "../config/axiosInstance";
import { JobApplication } from "../interfaces/jobApplication";
import { handleSwalFire } from "../helper/swal";
import DetailContentModal from "./DetailContentModal";

interface TableContent {
  inputProps: JobApplication;
  getAllUser: () => void;
}

const TableContent: FC<TableContent> = ({ inputProps, getAllUser }) => {
  const [showModal, setShowodal] = useState<boolean>(false);
  const [showTableContent, setShowTableContent] = useState(true);
  const [formData, setFormData] = useState<JobApplication>(inputProps);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const handleDeleteData = async () => {
    await ApplicationClient.post(`/delete-application`, {
      id: inputProps?._id,
    });
    getAllUser();
    setShowTableContent(false);
  };

  const setTableContentData = (data: JobApplication) => {
    setFormData(data);
  };

  return (
    <>
      {showTableContent && (
        <div
          className="w-[100%] my-2 grid grid-cols-12 bg-[#f5f5f5] bg-opacity-[0.2] text-white justify-between  items-center px-3 py-1  rounded-lg"
          onClick={() => {
            setShowDetailModal(true);
          }}
        >
          <div className="grid grid-cols-12 justify-center lg:gap-5 col-span-10">
            <div className=" md:col-span-4 lg:col-span-3 col-span-12">
              {formData?.firstName} {formData?.lastName}
            </div>
            <div className=" md:col-span-5 lg:col-span-3 col-span-12">
              {formData?.email}
            </div>
            <div className=" md:col-span-1 lg:col-span-2 col-span-12">
              {formData?.age}
            </div>
            <div className=" md:col-span-2 lg:col-span-4 col-span-12">
              {formData?.position}
            </div>
          </div>
          <div className=" md:col-span-2 col-span-12 my-3 flex justify-end gap-4">
            <div
              className=" hover:cursor-pointer bg-green-700 rounded-[50%] p-[5px]"
              onClick={(e) => {
                e.stopPropagation();
                setShowodal(true);
              }}
            >
              <MdEdit size={"20px"} />
            </div>
            <div
              className=" hover:cursor-pointer bg-red-700 rounded-[50%] p-[5px]"
              onClick={(e) => {
                e.stopPropagation();
                handleSwalFire(
                  "Delete Item?",
                  "Delete",
                  "cancel",
                  handleDeleteData,
                  "Deleted successfully!",
                );
              }}
            >
              <MdDeleteSweep size={"20px"} />
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <FormModal
          setShowModal={setShowodal}
          editableId={inputProps?._id}
          setTableContentData={setTableContentData}
        />
      )}

      {showDetailModal && (
        <DetailContentModal
          inputProps={formData}
          setShowDetailModal={setShowDetailModal}
        />
      )}
    </>
  );
};

export default TableContent;
