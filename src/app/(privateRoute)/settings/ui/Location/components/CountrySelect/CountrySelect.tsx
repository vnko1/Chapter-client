"use client";
import { FC, useEffect, useRef, useState } from "react";

import { useProfileContext } from "@/context";

import { Field, SelectMenu } from "..";
import { CountrySelectProps } from "./CountrySelect.type";
import styles from "../../Location.module.scss";

const CountrySelect: FC<CountrySelectProps> = ({
  setSelectedCountry,
  setCountryId,
  setIcon,
  countryId,
  countryList,
  selectedCountry,
  ...props
}) => {
  const {
    user: { location },
  } = useProfileContext();
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);

  const countryRef = useRef(null);

  useEffect(() => {
    const country = countryList.find((country) => country.id === countryId);
    if (country) {
      setIcon(country.emoji);
      setSelectedCountry(country.name);
    }
  }, [countryId, countryList, setIcon, setSelectedCountry]);

  useEffect(() => {
    if (!selectMenuIsOpen && !selectedCountry) {
      setSelectedCountry(location || "");
    }
  }, [location, selectMenuIsOpen, selectedCountry, setSelectedCountry]);

  return (
    <label
      className={styles["location-form__label"]}
      ref={countryRef}
      aria-label="Select user country"
    >
      <Field
        selectMenuIsOpen={selectMenuIsOpen}
        selectedValue={selectedCountry}
        setSelectMenuIsOpen={setSelectMenuIsOpen}
        setIcon={setIcon}
        setSelectedValue={setSelectedCountry}
        setId={setCountryId}
        label={selectMenuIsOpen || props.icon ? "Country" : undefined}
        {...props}
      />
      <SelectMenu
        type="country"
        selectMenuIsOpen={selectMenuIsOpen}
        data={countryList}
        selectedValue={selectedCountry}
        setSelectedValue={setSelectedCountry}
        setId={setCountryId}
        setSelectMenuIsOpen={setSelectMenuIsOpen}
        setIcon={setIcon}
        {...props}
      />
    </label>
  );
};

export default CountrySelect;
