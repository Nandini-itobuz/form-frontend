import { Dispatch, FC, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaFilter } from "react-icons/fa";
import SelectFormInput from "./FormInputs/SelectFormInput";
import { Position } from "../enums/positions";

interface FilterDataInterface {
  setPage: Dispatch<SetStateAction<string>>;
  setShowFilteredPosition: Dispatch<SetStateAction<string>>;
}

const FilterData: FC<FilterDataInterface> = ({
  setPage,
  setShowFilteredPosition,
}) => {
  const method = useForm();
  return (
    <div className=" flex items-center px-4 rounded-md  bg-[#37374B] w-[260px]">
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
  );
};

export default FilterData;
