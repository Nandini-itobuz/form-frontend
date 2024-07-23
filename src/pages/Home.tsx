import { useEffect, useState } from "react";
import { JobApplication } from "../interfaces/jobApplication";
import TableContent from "../components/TableContent";
import { PageSize } from "../enums/pageSize";
import { ApplicationClient } from "../config/axiosInstance";
import FormModal from "../components/FormModal";
import { handleSwalFire } from "../helper/swal";
import { useForm, FormProvider } from "react-hook-form";
import SelectFormInput from "../components/FormInputs/SelectFormInput";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { Button } from "../components/Button";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";
import FilterData from "../components/FilterData";
import SearchBar from "../components/SearchBar";
import { Position } from "../enums/positions";

const Home = () => {
  const method = useForm();
  const [page, setPage] = useState<string>("1");
  const [totalPages, setTotalPages] = useState<string>("1");
  const [allForms, setAllForms] = useState<JobApplication[] | null>([]);
  const [showModal, setShowodal] = useState<boolean>(false);
  const [_formData, setFormData] = useState<JobApplication | null>(null);
  const [showFilteredPosition, setShowFilteredPosition] =
    useState<string>(Position.ALL);
  const [showPagination, setShowPagination] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<string>("5");

  const getAllUser = async (): Promise<void> => {
    const response =
      await ApplicationClient.get(
        `/view-applications/${showFilteredPosition}/${page}/${pageSize}`);
    setTotalPages(response.data.data.totalPages);
    setAllForms(response.data.data.applicationData);
  };

  const deleteApplications = async (): Promise<void> => {
    const response = await ApplicationClient.post(`/delete-application`, {
      id: null,
    });
    response.data.success && setAllForms(null);
    getAllUser();
  };

  const deleteAllApplications = async (): Promise<void> =>
    handleSwalFire(
      "Delete All Items?",
      "Delete",
      "Cancel",
      deleteApplications,
      "Deleted Successfully!",
    );

  const searchItems = async (data: { [key: string]: string }) => {
    const name = data.searchBar.trim();
    if (!name.length) {
      setShowPagination(true);
      getAllUser();
      return;
    }
    setShowPagination(false);
    const response = await ApplicationClient.post(
      `/search-applications/${showFilteredPosition}`,
      { name },
    );
    setAllForms(response.data.data.applications);
  };

  useEffect(() => {
    getAllUser();
  }, [page, pageSize, showFilteredPosition]);

  return (
    <div className="flex flex-col items-center gap-3 p-3 bg-custom-bg bg-cover bg-no-repeat bg-center min-h-[100vh] ">

      <div className=" flex flex-col gap-3 w-[90%]  max-w-[1300px]">
        <div className=" flex justify-between sm:flex-row flex-col sm:gap-10 gap-1">
          <Button
            handleClick={() => {
              setShowodal(true);
            }}
            className="bg-green-700 text-white col-span-1 w-[140px] p-0"
          >
            <span className=" flex justify-start items-center gap-1">
              <IoAddCircle color="#fff" opacity={0.6} size={"20px"} /> Add
            </span>
          </Button>
          <SearchBar searchItems={searchItems} />
        </div>

        <div className="flex sm:flex-row flex-col justify-between sm:gap-10 gap-1">
          <Button
            className=" bg-red-700 text-white w-[140px]"
            handleClick={deleteAllApplications}
          >
            <span className=" flex justify-start items-center gap-1">
              <RiDeleteBinFill color="#fff" opacity={0.6} size={"20px"} />
              Delete All
            </span>
          </Button>

          <FilterData setPage={setPage} setShowFilteredPosition={setShowFilteredPosition} />
        </div>
      </div>

      <div className=" max-h-[65vh] overflow-x-scroll no-scrollbar w-[90%] max-w-[1300px] ">
        {allForms && allForms?.length ? (
          allForms.map((ele) => (
            <TableContent key={ele._id} inputProps={ele} />
          ))
        ) : (
          <div className="text-white">
            No data
          </div>
        )}
      </div>


      {showPagination && (
        <div className=" flex gap-2 mb-10 text-white mt-auto">
          <Button className=" border " handleClick={() => { Number(page) - 1 >= 1 && setPage((Number(page) - 1).toString()); }}>
            <FaBackward opacity={0.6} size={"15px"} />
          </Button>

          <p className=" rounded-md p-2 bg-[#37374B] ">
            {page} of {totalPages}
          </p>

          <Button className=" border" handleClick={() => {
            Number(page) + 1 <= Number(totalPages) &&
              setPage((Number(page) + 1).toString());
          }}>
            <FaForward opacity={0.6} size={"15px"} />
          </Button>

          <div className=" flex justify-center">
            <span className="py-2 px-5 font-bold">Page Size:</span>
            <FormProvider {...method}>
              <form
                onChange={method.handleSubmit((data) => {
                  setPage("1");
                  setPageSize(data.pageSize);
                })}
              >
                <SelectFormInput
                  valueOptions={Object.values(PageSize)}
                  name="pageSize"
                />
              </form>
            </FormProvider>
          </div>
        </div>
      )}

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
