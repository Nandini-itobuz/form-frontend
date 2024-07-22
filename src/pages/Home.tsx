import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { JobApplication } from "../interfaces/jobApplication";
import { Position } from "../enums/positions";
import TableContent from "../components/TableContent";
import SelectInput from "../components/FormInputs/SelectInput";
import { PageSize } from "../enums/pageSize";
import { ApplicationClient } from "../config/axiosInstance";
import FormModal from "../components/FormModal";
import { handleSwalFire } from "../helper/swal";

const Home = () => {
  const [page, setPage] = useState<string>("1");
  const [totalPages, setTotalPages] = useState<string>("1");
  const [allForms, setAllForms] = useState<JobApplication[] | null>([]);
  const [showModal, setShowodal] = useState<boolean>(false);
  const [formData, setFormData] = useState<JobApplication | null>(null);
  const [showFilteredPosition, setShowFilteredPosition] =
    useState<string>("Sort By");

  const availablePositions = [
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

  const deleteAllApplications = async (): Promise<void> => handleSwalFire('Delete All Items?', 'Delete', 'Cancel', deleteApplications, 'Deleted Successfully!')

  useEffect(() => {
    getAllUser();
  }, [page, pageSize, showFilteredPosition]);

  return (
    <div className=" z-0 min-h-[100vh]  flex flex-col gap-3  py-5 justify-between items-center font-[Roboto] bg-[#62abb4] ">
      <div>
        <div className=" grid grid-cols-12 md:gap-10 gap-2 px-2 justify-center items-center">
          <Button
            handleClick={() => {
              setShowodal(true);
            }}
          >
            Add
          </Button>
          <Button
            handleClick={() => {
              setShowFilteredPosition("Sort By");
            }}
          >
            View All
          </Button>
          <Button handleClick={deleteAllApplications}>Delete All</Button>
          <div className=" md:col-span-3 px-4 col-span-6 hover:cursor-pointer  bg-[#f5f5f5] font-bold">
            <SelectInput
              value={showFilteredPosition}
              valueOptions={availablePositions}
              labelOption="Sort By"
              handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setPage("1");
                setShowFilteredPosition(e.target.value);
              }}
              name="position"
            />
          </div>
        </div>

        <div className=" sm:max-h-[70vh] max-h-[60vh] overflow-x-scroll no-scrollbar my-10 max-w-[1200px]  box-border px-4 xl:px-0">
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

      <div className=" grid grid-cols-12 gap-2 mb-10 p-2">
        <button
          className=" sm:col-span-3 col-span-4  py-2 px-5 bg-[#f5f5f5] font-bold"
          onClick={() => {
            Number(page) - 1 >= 1 && setPage((Number(page) - 1).toString());
          }}
        >
          Previous
        </button>
        <button className=" sm:col-span-3 col-span-4 py-2 px-5 bg-[#f5f5f5] font-bold">
          {page} of {totalPages}
        </button>
        <button
          className=" sm:col-span-3 col-span-4 py-2 px-5 bg-[#f5f5f5] font-bold"
          onClick={() => {
            Number(page) + 1 <= Number(totalPages) &&
              setPage((Number(page) + 1).toString());
          }}
        >
          Next
        </button>
        <div className=" sm:col-span-3 col-span-12 flex justify-center">
          <span className="py-2 px-5 font-bold">Page Size:</span>
          <SelectInput
            value={pageSize}
            handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setPage("1");
              setPageSize(e.target.value);
            }}
            valueOptions={pageSizeOptions}
          />
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
