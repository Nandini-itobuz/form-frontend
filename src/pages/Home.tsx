import { useEffect, useState } from "react";
import { JobApplication } from "../interfaces/jobApplication";
import TableContent from "../components/TableContent";
import { PageSize } from "../enums/pageSize";
import { ApplicationClient } from "../config/axiosInstance";
import FormModal from "../components/FormModal";
import { handleSwalFire } from "../helper/swal";
import { useForm, FormProvider } from "react-hook-form";
import SelectFormInput from "../components/FormInputs/SelectFormInput";
import Heading from "../components/Heading";

const Home = () => {
  const method = useForm();
  const [page, setPage] = useState<string>("1");
  const [totalPages, setTotalPages] = useState<string>("1");
  const [allForms, setAllForms] = useState<JobApplication[] | null>([]);
  const [showModal, setShowodal] = useState<boolean>(false);
  const [_formData, setFormData] = useState<JobApplication | null>(null);
  const [showFilteredPosition, setShowFilteredPosition] =
    useState<string>("All");
  const [showPagination, setShowPagination] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<string>("5");

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

  const searchItems = async (data: any) => {
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
    <div className=" px-3 z-0 min-h-[100vh]  flex flex-col gap-3 py-5 justify-between items-center font-[Roboto]  bg-custom-bg bg-cover bg-no-repeat  bg-center ">
      <div>
        <Heading
          setShowodal={setShowodal}
          searchItems={searchItems}
          deleteAllApplications={deleteAllApplications}
          setPage={setPage}
          setShowFilteredPosition={setShowFilteredPosition}
        />

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

      {showPagination && (
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
