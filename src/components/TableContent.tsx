import { MdEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { FC, useState } from "react";
import FormModal from "./FormModal";
import Swal from "sweetalert2";
import { ApplicationClient } from "../config/axiosInstance";
import { JobApplication } from "../interfaces/jobApplication";

interface TableContent {
  inputProps: JobApplication;
}

const TableContent: FC<TableContent> = ({ inputProps }) => {
  const [showModal, setShowodal] = useState<boolean>(false);
  const [showTableContent, setShowTableContent] = useState(true);
  const [formData, setFormData] = useState<JobApplication | null>(inputProps);

  const handleEdit = () => {
    setShowodal(true);
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Delete item?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton: "confirm-button-class",
        denyButton: "confirm-button-class",
        title: "title-class",
        icon: "icon-class",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await ApplicationClient.post(`/delete-application`, {
          id: inputProps?._id,
        });
        response.data.success && setShowTableContent(false);
        Swal.fire("Deleted successfully!", "", "success");
      }
    });
  };

  return (
    <>
      {showTableContent && (
        <div className="w-[100%] xl:w-[1200px] my-2 grid grid-cols-12 bg-[#f5f5f5] justify-between  items-center px-3 py-1 ">
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
            <div className=" hover:cursor-pointer" onClick={handleEdit}>
              <MdEdit />
            </div>
            <div className=" hover:cursor-pointer" onClick={handleDelete}>
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
    </>
  );
};

export default TableContent;
