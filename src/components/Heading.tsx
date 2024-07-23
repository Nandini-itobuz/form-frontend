import { IoAddCircle } from "react-icons/io5";
import Button from "./Button";
import { FaFilter, FaSearch } from "react-icons/fa";
import GenericInput from "./FormInputs/GenericInput";
import { FormProvider, useForm } from "react-hook-form";
import { RiDeleteBinFill } from "react-icons/ri";
import SelectFormInput from "./FormInputs/SelectFormInput";
import { Position } from "../enums/positions";
import { Dispatch, FC, SetStateAction } from "react";

interface HeadingProps {
  setShowodal: Dispatch<SetStateAction<boolean>>;
  searchItems: (data: any) => void;
  deleteAllApplications: () => void;
  setPage: Dispatch<SetStateAction<string>>;
  setShowFilteredPosition: Dispatch<SetStateAction<string>>;
}

const Heading: FC<HeadingProps> = ({
  setShowodal,
  searchItems,
  deleteAllApplications,
  setPage,
  setShowFilteredPosition,
}) => {
  const method = useForm();
  return (
    <div>
      <div className=" flex flex-col gap-3 px-4 w-[100%] xl:w-[1200px] ">
        <div className=" flex justify-between sm:flex-row flex-col">
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
          <div className=" flex items-center px-8 rounded-md bg-[#37374B] font-bold w-[260px] ">
            <FaSearch opacity={0.6} color="#fff" />
            <FormProvider {...method}>
              <form
                onChange={method.handleSubmit(searchItems)}
                className="w-[100%] "
              >
                <GenericInput
                  inputProps={{ name: "searchBar", className: "p-0 gap-0" }}
                />
              </form>
            </FormProvider>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-between">
          <Button
            className=" bg-red-700 text-white w-[140px]"
            handleClick={deleteAllApplications}
          >
            <span className=" flex justify-start items-center gap-1">
              <RiDeleteBinFill color="#fff" opacity={0.6} size={"20px"} />
              Delete All
            </span>
          </Button>
          <div className=" flex items-center px-4 hover:cursor-pointer rounded-md  bg-[#37374B] font-bold w-[260px]">
            <FaFilter color="#fff" opacity={0.6} size={"20px"} />
            <FormProvider {...method}>
              <form
                onChange={method.handleSubmit((data) => {
                  setPage("1");
                  setShowFilteredPosition(data.position);
                })}
                className=" flex justify-center items-center "
              >
                <SelectFormInput
                  name="position"
                  valueOptions={Object.values(Position)}
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
