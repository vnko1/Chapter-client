import { Dispatch, SetStateAction } from "react";
import { CityType } from "../../Location.type";

export type CitySelectProps = {
  selectedCity: string;
  citiesList: CityType[];
  cityId: number;
  regionId: number;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setCityId: Dispatch<SetStateAction<number>>;
};
