"use client";
import { FC, MouseEvent, TouchEvent, useRef } from "react";
import { GetState, GetCity } from "react-country-state-city";

import { CityType, StateType } from "../../Location.type";
import { SelectMenuProps } from "./SelectMenu.type";
import styles from "./SelectMenu.module.scss";

const SelectMenu: FC<SelectMenuProps> = ({
  type,
  selectMenuIsOpen,
  data,
  selectedValue,
  countryId,
  setIcon,
  setSelectedRegion,
  setRegionList,
  setCitiesList,
  setSelectedValue,
  setId,
  setIsLoading,
  setSelectMenuIsOpen,
  setSelectedCity,
}) => {
  const menuRef = useRef(null);

  const filteredData = data.filter((city) =>
    city.name.toLowerCase().includes(selectedValue.toLowerCase())
  );

  const handleSelect = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    setSelectedRegion && setSelectedRegion("");
    setRegionList && setRegionList([]);
    setSelectedCity && setSelectedCity("");
    setCitiesList && setCitiesList([]);
    const id = +e.currentTarget.value;
    const result = filteredData.find((item) => item.id === id);

    if (result) {
      setId(result.id);
      setSelectedValue(result.name);
      if (result.emoji && setIcon) setIcon(result.emoji);
      setSelectMenuIsOpen(false);
      setIsLoading && setIsLoading(true);

      if (type === "country") {
        GetState(result.id).then((result: StateType[]) => {
          setRegionList && setRegionList(result);
          setIsLoading && setIsLoading(false);
        });
      }

      if (type === "state") {
        GetCity(countryId, result.id).then((result: CityType[]) => {
          setCitiesList && setCitiesList(result);
          setIsLoading && setIsLoading(false);
        });
      }
    }
  };
  if (!selectMenuIsOpen) return null;
  return (
    <span className={styles["strop-down-menu"]}>
      <span className={styles["strop-down-menu-container"]} ref={menuRef}>
        {filteredData.map(({ id, name, emoji }) => (
          <button
            type="button"
            key={id}
            value={id}
            data-automation="clickButton"
            onClick={handleSelect}
            aria-label="Select user location button"
          >
            {emoji ? <span>{emoji}</span> : null}
            <span>{name}</span>
          </button>
        ))}
      </span>
    </span>
  );
};

export default SelectMenu;
