import { ChangeEvent, FC } from "react";

import { SearchBarProps } from "./SearchBar.type";
import { SearchField } from "@/components";
import styles from "./SearchBar.module.scss";

const SearchBar: FC<SearchBarProps> = ({ classNames }) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("🚀 ~ event:", event.target.value);
  };

  return (
    <div className={styles["search__wrapper"]}>
      <SearchField
        id={"query"}
        name={"query"}
        classNames={classNames}
        placeholder="Find your friends here"
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
