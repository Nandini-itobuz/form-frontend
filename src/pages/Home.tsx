import { useEffect, useState } from "react";
import Button from "../components/Button";
import { JobApplication } from "../interfaces/jobApplication";
import { Position } from "../enums/positions";
import TableContent from "../components/TableContent";
import { PageSize } from "../enums/pageSize";
import { ApplicationClient } from "../config/axiosInstance";
import FormModal from "../components/FormModal";
import { handleSwalFire } from "../helper/swal";
import { useForm, FormProvider } from "react-hook-form";
import SelectFormInput from "../components/FormInputs/SelectFormInput";
import { FaFilter } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";

const Home = () => {
  const method = useForm();
  const [page, setPage] = useState<string>("1");
  const [totalPages, setTotalPages] = useState<string>("1");
  const [allForms, setAllForms] = useState<JobApplication[] | null>([]);
  const [showModal, setShowodal] = useState<boolean>(false);
  const [_formData, setFormData] = useState<JobApplication | null>(null);
  const [showFilteredPosition, setShowFilteredPosition] =
    useState<string>("Sort By");

  const availablePositions = [
    Position.ALL,
    Position.FRONTEND_DEVELOPER,
    Position.BACKEND_DEVELOPER,
    Position.INTERN,
    Position.QA,
  ];

  const pageSizeOptions: string[] = [
    PageSize.FIVE,
    PageSize.TEN,
    PageSize.FIFTEEN,
    PageSize.TWENTY,
  ];
  const [pageSize, setPageSize] = useState<string>(pageSizeOptions[0]);

  const getAllUser = async (): Promise<void> => {
    try {
      const response =
        showFilteredPosition === "Sort By"
          ? await ApplicationClient.get(
              `/view-applications/${page}/${pageSize}`,
            )
          : await ApplicationClient.get(
              `/view-applications/${showFilteredPosition}/${page}/${pageSize}`,
            );
      setTotalPages(response.data.data.totalPages);
      setAllForms(response.data.data.applicationData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteApplications = async (): Promise<void> => {
    try {
      const response = await ApplicationClient.post(`/delete-application`, {
        id: null,
      });
      response.data.success && setAllForms(null);
      getAllUser();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAllApplications = async (): Promise<void> =>
    handleSwalFire(
      "Delete All Items?",
      "Delete",
      "Cancel",
      deleteApplications,
      "Deleted Successfully!",
    );

  useEffect(() => {
    getAllUser();
  }, [page, pageSize, showFilteredPosition]);

  return (
    <div className=" px-3 z-0 min-h-[100vh]  flex flex-col gap-3  py-5 justify-between items-center font-[Roboto]  bg-custom-bg bg-cover bg-no-repeat  bg-center ">
      <div>
        <div className=" flex flex-col gap-3 px-4 w-[100%]  ">
          <Button
            handleClick={() => {
              setShowodal(true);
            }}
            className="bg-green-700 text-white col-span-1 w-[140px]"
          >
            <span className=" flex justify-start items-center gap-1">
              <IoAddCircle color="#fff" opacity={0.6} size={"20px"} /> Add
            </span>
          </Button>
          <div className=" flex flex-col sm:flex-row sm:justify-between gap-3 ">
            <Button
              className=" bg-red-700 text-white w-[140px]"
              handleClick={deleteAllApplications}
            >
              <span className=" flex justify-start items-center gap-1">
                <RiDeleteBinFill color="#fff" opacity={0.6} size={"20px"} />
                Delete All
              </span>
            </Button>
            <div className=" flex justify-end px-4 hover:cursor-pointer rounded-md  bg-[#37374B] font-bold w-[220px]">
              <FormProvider {...method}>
                <form
                  onChange={method.handleSubmit((data) => {
                    setPage("1");
                    setShowFilteredPosition(data.position);
                  })}
                  className=" flex justify-center items-center "
                >
                  <FaFilter color="#fff" opacity={0.6} size={"20px"} />
                  <SelectFormInput
                    name="position"
                    valueOptions={availablePositions}
                  />
                </form>
              </FormProvider>
            </div>
          </div>
        </div>

        <div className=" sm:max-h-[70vh] max-h-[60vh] overflow-x-scroll no-scrollbar my-10 box-border px-4 xl:px-0">
          {allForms && allForms.length ? (
            allForms.map((ele) => (
              <TableContent key={ele._id} inputProps={ele} />
            ))
          ) : (
            <div className=" xl:w-[1200px] my-2 font-bold text-white px-3 py-1">
              No data
            </div>
          )}
        </div>
      </div>

      <div className=" grid grid-cols-12 gap-2 mb-10 p-2 text-[14px] text-white">
        <button
          className=" rounded-md md:col-span-3 col-span-4  py-2 px-2 bg-[#37374B] font-bold"
          onClick={() => {
            Number(page) - 1 >= 1 && setPage((Number(page) - 1).toString());
          }}
        >
          Previous
        </button>

        <button className=" rounded-md md:col-span-3 col-span-4 py-2 px-2 bg-[#37374B] font-bold">
          {page} of {totalPages}
        </button>
        <button
          className=" rounded-md md:col-span-3 col-span-4 py-2 px-2 bg-[#37374B] font-bold"
          onClick={() => {
            Number(page) + 1 <= Number(totalPages) &&
              setPage((Number(page) + 1).toString());
          }}
        >
          Next
        </button>
        <div className=" md:col-span-3 col-span-12 flex justify-center">
          <span className="py-2 px-5 font-bold">Page Size:</span>
          <FormProvider {...method}>
            <form
              onChange={method.handleSubmit((data) => {
                setPage("1");
                setPageSize(data.pageSize);
              })}
            >
              <SelectFormInput valueOptions={pageSizeOptions} name="pageSize" />
            </form>
          </FormProvider>
        </div>
      </div>

      {showModal && (
        <FormModal
          setShowModal={setShowodal}
          editableId={undefined}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Home;
