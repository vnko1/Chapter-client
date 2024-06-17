import { FC } from "react";

import { TextField } from "..";

import { SearchFieldProps } from "./SearchField.type";
import styles from "./SearchField.module.scss";
import { FormProvider, useForm } from "react-hook-form";

const SearchField: FC<SearchFieldProps> = ({ classNames, ...props }) => {
  const methods = useForm({ values: { query: "" }, mode: "onChange" });
  return (
    <FormProvider {...methods}>
      <TextField
        classNames={`${styles["search-field"]} ${classNames}`}
        {...props}
      />
    </FormProvider>
  );
};

export default SearchField;
