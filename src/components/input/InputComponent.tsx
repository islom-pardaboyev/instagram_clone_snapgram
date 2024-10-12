import { FC } from "react";
import { UserInfos } from "../../types";

const Input: FC<{ item: UserInfos }> = ({ item }) => {
  const { id, span_name, name, type } = item;
  
  return (
    <label key={id} className="flex flex-col space-y-3">
      <span className="font-medium capitalize">{span_name}</span>
      <input required
        name={name}
        className="bg-dark-400 outline-none p-3 rounded"
        type={type}
      />
    </label>
  );
};

export default Input;