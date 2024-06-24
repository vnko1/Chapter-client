"use client";
import { ChangeEvent, FC } from "react";
import { useController } from "react-hook-form";

import { Icon } from "@/components";
import { IconEnum } from "@/types";

import { SearchFieldProps } from "./SearchField.type";
import styles from "./SearchField.module.scss";

const SearchField: FC<SearchFieldProps> = ({
  classNames,
  control,
  onChange,
  handleSearch,
  ...props
}) => {
  const { field } = useController({ name: "query", control });

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);
    onChange && onChange(event);
    handleSearch && handleSearch(event.target.value);
  };

  return (
    <label className={`${styles["search-field"]} ${classNames}`}>
      <Icon size={24} icon={IconEnum.Search} />
      <input
        {...props}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        ref={field.ref}
        onChange={onHandleChange}
        type="text"
        className={styles["field"]}
      />
    </label>
  );
};

export default SearchField;
