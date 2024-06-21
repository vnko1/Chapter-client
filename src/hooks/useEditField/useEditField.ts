"use client";

import { ChangeEvent, useEffect, useState } from "react";
// import { AxiosError } from "axios";

import { simpleStringRegex } from "@/utils";
import { EditFieldType } from "./useEditField.type";
import { privateApi } from "@/api";
import { EndpointsEnum } from "@/types";
import { isAxiosError } from "axios";

const useEditField = ({
  fieldType,
  text,
  nodeRef,
  stringLength = 1000,
}: EditFieldType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(text || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      nodeRef.current?.focus();
    }
  }, [isEditing, nodeRef]);

  useEffect(() => {
    if (value && value.length > stringLength) return setError("Too long");

    setError(null);
  }, [stringLength, value]);

  const onHandleEdit = () => setIsEditing(true);

  const onHandleSave = async () => {
    if (text?.trim() !== value.trim()) {
      if (fieldType === "status") {
        if (value.length > stringLength) return setError("Too long");
        try {
          await privateApi.patch(EndpointsEnum.Profile, {
            status: value || "",
          });
        } catch (error) {
          if (isAxiosError(error)) {
            setError(error.response?.data.errorMessage);
          }
        }

        //   const res = await profile.userSave({
        //     userStatus: value || " ",
        //   });
        //   if (res instanceof AxiosError) {
        //     if (res.response && res.response.status > 400)
        //       return setError("Incorrect text");
        //   }
      }
      if (fieldType === "fullName" && value) {
        if (!simpleStringRegex.test(value)) return;
        const [firstName, lastName] = value
          .trim()
          .split(" ")
          .filter((el) => el);
        if (firstName && lastName) console.log(firstName, lastName);
      }
    }
    setIsEditing(false);
  };

  const onHandleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setValue(e.currentTarget.value);

  const onHandleFocus = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) => {
    if (value) e.currentTarget.setSelectionRange(value.length, value.length);
  };

  return {
    isEditing,
    value,
    error,
    setIsEditing,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  };
};

export default useEditField;
