import { Dispatch, SetStateAction } from "react";
import { CityType, StateType } from "../../Location.type";

export type StateSelectProps = {
  regionList: StateType[];
  countryId: number;
  regionId: number;
  selectedRegion: string;

  setSelectedRegion: Dispatch<SetStateAction<string>>;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCitiesList: Dispatch<SetStateAction<CityType[]>>;
  setCityId: Dispatch<SetStateAction<number>>;
  setRegionId: Dispatch<SetStateAction<number>>;
};
