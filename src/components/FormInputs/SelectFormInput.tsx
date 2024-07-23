import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { JobApplication } from "../../interfaces/jobApplication";

interface selectInputInterface {
  name?: string;
  valueOptions?: string[];
}

const SelectFormInput: FC<selectInputInterface> = ({ name, valueOptions }) => {
  const { register } = useFormContext();

  return (
    <div>
      <select
        {...register(name as keyof JobApplication, { required: true })}
        className=" rounded-md py-2 px-3 gap-1 w-[100%] bg-[#37374B] text-white border-0 outline-none "
      >
        {valueOptions?.map((ele) => (
          <option key={ele} value={ele}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFormInput;
