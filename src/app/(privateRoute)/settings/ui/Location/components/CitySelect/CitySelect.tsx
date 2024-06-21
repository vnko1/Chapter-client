"use client";
import { FC, useState, useEffect, useRef } from "react";

import { CitySelectProps } from "./CitySelect.type";
import { Field, SelectMenu } from "..";
import styles from "../../Location.module.scss";

const CitySelect: FC<CitySelectProps> = ({
  citiesList,
  regionId,
  cityId,
  selectedCity,
  setCityId,
  setSelectedCity,
  ...props
}) => {
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
  const cityRef = useRef(null);

  useEffect(() => {
    const city = citiesList.find((item) => item.id === cityId);

    city && setSelectedCity(city.name);
  }, [citiesList, cityId, setSelectedCity]);

  const isShowing =
    !!(regionId && citiesList.length) || !!(citiesList.length && cityId);

  if (!isShowing) return null;

  return (
    <label
      ref={cityRef}
      className={styles["location-form__label"]}
      aria-label="Select user city"
    >
      <Field
        selectMenuIsOpen={selectMenuIsOpen}
        selectedValue={selectedCity}
        setSelectMenuIsOpen={setSelectMenuIsOpen}
        setSelectedValue={setSelectedCity}
        setId={setCityId}
        label="City"
        {...props}
      />
      <SelectMenu
        selectMenuIsOpen={selectMenuIsOpen}
        data={citiesList}
        selectedValue={selectedCity}
        setSelectedValue={setSelectedCity}
        setId={setCityId}
        setSelectMenuIsOpen={setSelectMenuIsOpen}
        {...props}
      />
    </label>
  );
};

export default CitySelect;
