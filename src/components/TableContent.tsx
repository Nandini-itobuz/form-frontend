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
}

const TableContent: FC<TableContent> = ({ inputProps }) => {
  const [showModal, setShowodal] = useState<boolean>(false);
  const [showTableContent, setShowTableContent] = useState(true);
  const [formData, setFormData] = useState<JobApplication | null>(inputProps);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const handleDeleteData = async () => {
    const response = await ApplicationClient.post(`/delete-application`, {
      id: inputProps?._id,
    });
    response.data.success && setShowTableContent(false);
  }


  return (
    <>
      {showTableContent && (
        <div className="w-[100%] xl:w-[1200px] my-2 grid grid-cols-12 bg-[#f5f5f5] justify-between  items-center px-3 py-1 " onClick={() => { setShowDetailModal(true) }} >
          <div className=" col-span-8 grid grid-cols-12 justify-center lg:gap-5">
            <div className=" lg:col-span-3 col-span-12">
              {formData?.firstName} {formData?.lastName}
            </div>
            <div className=" lg:col-span-4 col-span-12">{formData?.email}</div>
            <div className=" lg:col-span-1 col-span-12">{formData?.age}</div>
            <div className=" lg:col-span-4 col-span-12">
              {formData?.position}
            </div>
          </div>
          <div className=" lg:col-span-4 col-span-12  my-3 flex justify-end gap-4">
            <div className=" hover:cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowodal(true) }}>
              <MdEdit />
            </div>
            <div className=" hover:cursor-pointer" onClick={(e) => {
              e.stopPropagation();
              handleSwalFire('Delete Item?', "Delete", "cancel", handleDeleteData, "Deleted successfully!")
            }}>
              <MdDeleteSweep />
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <FormModal
          setShowModal={setShowodal}
          editableId={inputProps?._id}
          setFormData={setFormData}
        />
      )}

      {showDetailModal && <DetailContentModal inputProps={inputProps} setShowDetailModal={setShowDetailModal}
      />}
    </>
  );
};

export default TableContent;
