import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { JobApplication } from "../../interfaces/jobApplication";

interface selectInputInterface {
  name?: string;
  valueOptions?: string[];
  labelOption?: string;
}

const SelectFormInput: FC<selectInputInterface> = ({
  name,
  labelOption,
  valueOptions,
}) => {
  const { register } = useFormContext();

  return (
    <div>
      <select
        {...register(name as keyof JobApplication, { required: true })}
        className=" py-2 px-3 gap-1 w-[100%] bg-[#f5f5f5] border-0 outline-none"
      >
        {labelOption && <option disabled>{labelOption}</option>}
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
