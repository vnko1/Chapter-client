import { Dispatch, SetStateAction } from "react";
import { CityType, StateType } from "../../Location.type";

export type FieldProps = {
  selectMenuIsOpen: boolean;
  selectedValue: string;
  label?: string;
  icon?: string;
  setSelectMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  setId: Dispatch<SetStateAction<number>>;
  setIcon?: Dispatch<SetStateAction<string>>;
  setRegionList?: Dispatch<SetStateAction<StateType[]>>;
  setSelectedRegion?: Dispatch<SetStateAction<string>>;
  setRegionId?: Dispatch<SetStateAction<number>>;
  setCitiesList?: Dispatch<SetStateAction<CityType[]>>;
  setSelectedCity?: Dispatch<SetStateAction<string>>;
  setCityId?: Dispatch<SetStateAction<number>>;
};
