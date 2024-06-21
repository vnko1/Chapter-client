"use client";
import { FC, useState, useEffect, useRef } from "react";

import { Field, SelectMenu } from "..";
import { StateSelectProps } from "./RegionSelect.type";
import styles from "../../Location.module.scss";

const StateSelect: FC<StateSelectProps> = ({
  regionList,
  countryId,
  regionId,
  selectedRegion,
  setSelectedRegion,
  setRegionId,
  ...props
}) => {
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
  const stateRef = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        stateRef.current &&
        !stateRef.current.contains(event.target as HTMLLabelElement)
      )
        setSelectMenuIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const state = regionList.find((state) => state.id === regionId);
    state && setSelectedRegion(state.name);
  }, [regionId, regionList, setSelectedRegion]);

  const isShowing =
    !!(countryId && regionList.length) || !!(regionList.length && regionId);

  if (!isShowing) return null;
  return (
    <label
      ref={stateRef}
      className={styles["location-form__label"]}
      aria-label="Select user region"
    >
      <Field
        selectMenuIsOpen={selectMenuIsOpen}
        selectedValue={selectedRegion}
        setSelectedValue={setSelectedRegion}
        setSelectMenuIsOpen={setSelectMenuIsOpen}
        setId={setRegionId}
        label="Region"
        {...props}
      />
      <SelectMenu
        type="state"
        selectMenuIsOpen={selectMenuIsOpen}
        data={regionList}
        selectedValue={selectedRegion}
        setSelectedValue={setSelectedRegion}
        setId={setRegionId}
        setSelectMenuIsOpen={setSelectMenuIsOpen}
        countryId={countryId}
        {...props}
      />
    </label>
  );
};

export default StateSelect;
