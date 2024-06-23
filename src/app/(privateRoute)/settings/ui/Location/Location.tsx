"use client";
import { FC, useState, FormEvent, useEffect, useRef } from "react";
import { GetCountries } from "react-country-state-city";

import { useProfileContext } from "@/context";
import { CustomError } from "@/services";
import { UIButton } from "@/components";
import { editProfile } from "@/lib/actions";

import { CountrySelect, RegionSelect, CitySelect } from "./components";
import { CityType, CountriesType, StateType } from "./Location.type";
import styles from "./Location.module.scss";

const Location: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useProfileContext();

  const [countryId, setCountryId] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryList, setCountryList] = useState<Array<CountriesType>>([]);
  const [icon, setIcon] = useState("");

  const [regionId, setRegionId] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [regionList, setRegionList] = useState<Array<StateType>>([]);

  const [cityId, setCityId] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesList, setCitiesList] = useState<Array<CityType>>([]);

  const nodeRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const countries = await GetCountries();
        setCountryList(countries);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [countryId, regionId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const location = selectedCity
      ? selectedCity.concat(", ", selectedCountry)
      : selectedCountry;
    const data = new FormData();
    data.append("location", location);
    try {
      const res = await editProfile(data);

      if (res?.isError) throw new CustomError(res.error);

      setUser(res.data);
      setSelectedCountry(location);
      setCountryId(0);
      setIcon("");

      setRegionList([]);
      setSelectedRegion("");
      setRegionId(0);

      setCitiesList([]);
      setSelectedCity("");
      setCityId(0);
    } catch (error) {
      if (error instanceof CustomError) {
        console.log("🚀 ~ handleSubmit ~ error:", error);
      }
    }
  };

  const buttonIsDisabled =
    isLoading || (cityId === 0 && regionId === 0 && countryId === 0);

  return (
    <form
      onSubmit={handleSubmit}
      className={styles["location-form"]}
      ref={nodeRef}
    >
      <CountrySelect
        icon={icon}
        selectedCountry={selectedCountry}
        countryList={countryList}
        countryId={countryId}
        setIcon={setIcon}
        setCountryId={setCountryId}
        setSelectedCountry={setSelectedCountry}
        setIsLoading={setIsLoading}
        setRegionList={setRegionList}
        setCitiesList={setCitiesList}
        setCountryList={setCountryList}
        setSelectedCity={setSelectedCity}
        setSelectedRegion={setSelectedRegion}
        setRegionId={setRegionId}
        setCityId={setCityId}
      />
      <RegionSelect
        regionList={regionList}
        countryId={countryId}
        regionId={regionId}
        selectedRegion={selectedRegion}
        setRegionId={setRegionId}
        setCityId={setCityId}
        setSelectedRegion={setSelectedRegion}
        setSelectedCity={setSelectedCity}
        setIsLoading={setIsLoading}
        setCitiesList={setCitiesList}
      />
      <CitySelect
        regionId={regionId}
        citiesList={citiesList}
        cityId={cityId}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setCityId={setCityId}
      />

      <UIButton
        classNames={`${styles["location-form__button"]} ${styles["button"]}`}
        isLoading={isLoading}
        disabled={buttonIsDisabled}
        type="submit"
        aria-label="Submit form button"
      >
        Save changes
      </UIButton>
    </form>
  );
};

export default Location;
