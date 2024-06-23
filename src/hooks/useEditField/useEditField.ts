"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { simpleStringRegex } from "@/utils";
import { EditFieldType } from "./useEditField.type";
import { editProfile } from "@/lib/actions";
import { CustomError } from "@/services";
import { useProfileContext } from "@/context";

export const useEditField = ({
  fieldType,
  text,
  nodeRef,
  stringLength = 1000,
}: EditFieldType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(text || "");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useProfileContext();

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
    if (text?.trim() === value.trim()) return;
    const data = new FormData();

    if (fieldType === "status") {
      if (value.length > stringLength) return setError("Too long");
      data.append("status", value);
    }

    if (fieldType === "fullName" && value) {
      if (!simpleStringRegex.test(value)) return;
      const [firstName, lastName] = value.trim().split(" ");

      if (firstName.trim() && lastName.trim()) {
        data.append("firstName", firstName);
        data.append("lastName", lastName);
      }
    }

    try {
      const res = await editProfile(data);
      if (res?.isError) throw new CustomError(res.error);
      setUser(res.data);
    } catch (error) {
      if (error instanceof CustomError) {
        setError(error.errorMessage);
      }
    } finally {
      setIsEditing(false);
    }
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
