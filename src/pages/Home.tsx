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
import NodataModal from "../components/NodataModal";

const Home = () => {

  const method = useForm();
  const [page, setPage] = useState<string>("1");
  const [totalPages, setTotalPages] = useState<string>("1");
  const [allForms, setAllForms] = useState<JobApplication[] | null>([]);
  const [showModal, setShowodal] = useState<boolean>(false);
  const [showFilteredPosition, setShowFilteredPosition] =
    useState<string>(Position.ALL);
  const [showPagination, setShowPagination] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<string>(PageSize.TEN);

  const getAllUser = async (): Promise<void> => {
    const response =
      await ApplicationClient.get(
        `/view-applications/${showFilteredPosition}/${page}/${pageSize}`);
    setTotalPages(response.data.totalPages);
    setAllForms(response.data.applicationData);
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
    setAllForms(response.data.applications);
  };

  useEffect(() => {
    getAllUser();
  }, [page, pageSize, showFilteredPosition]);

  return (
    <div className="home-bg ">
      <div className=" w-[90%] max-w-[1300px]">
        <div className=" flex sm:flex-row flex-col justify-between gap-1">
          <Button
            handleClick={() => {
              setShowodal(true);
            }}
            className="bg-green-700 w-[140px] flex items-center gap-1"
          >
            <><IoAddCircle opacity={0.6} size={"20px"} /> Add</>
          </Button>
          <SearchBar searchItems={searchItems} />
        </div>

        <div className="flex sm:flex-row flex-col justify-between gap-1 mt-3">
          <Button
            className=" bg-red-700 w-[140px] flex items-center gap-1"
            handleClick={deleteAllApplications}
          >
            <><RiDeleteBinFill opacity={0.6} size={"20px"} />
            Delete All</>
          </Button>

          <FilterData setPage={setPage} setShowFilteredPosition={setShowFilteredPosition} />
        </div>
      </div>

      <div className=" max-h-[65vh] overflow-x-scroll no-scrollbar w-[90%] max-w-[1300px] ">
        {allForms && allForms?.length ? (
          allForms.map((ele) => (
            <TableContent key={ele._id} inputProps={ele} getAllUser={getAllUser} />
          ))
        ) : (
          <NodataModal />
        )}
      </div>

      {showPagination && (
        <div className=" flex flex-wrap justify-center gap-2 text-white mt-auto">
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
        />
      )}
    </div>
  );
};

export default Home;
