"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dh, { parse, format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeServices } from "@/services/home.services";
import {
  createProceduesParam,
  labelProcedures,
  UserProcedures,
} from "@/services/types";
import { toast } from "react-toastify";

const validationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  user: z.string().min(1, "Username is required"),
  label: z.string().min(1, "Label is required"),
  startDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "That's not a date!",
  }),
  column: z.string().optional(),
  endDate: z.date().optional(),
});

type FormValues = z.infer<typeof validationSchema>;

const HeadingBox = () => {
  const [showModal, setShowModal] = useState(false);
  const [userProcedures, setUserProcedures] = useState<UserProcedures[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [labelProcedures, setLabelProcedures] = useState<labelProcedures[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [isLabelDropdownOpen, setIsLabelDropdownOpen] = useState(false);

  const toggleLabelDropdown = () => setIsLabelDropdownOpen((prev) => !prev);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const formattedStartDate = startDate ? format(startDate, "dd/MM/yy") : "";
  const formattedEndDate = endDate ? format(endDate, "dd/MM/yy") : "";

  const nameDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: "",
      category: "",
      user: selectedUser,
      label: selectedLabel,
      column: "todo",
      startDate: startDate ?? undefined,
      endDate: endDate ?? undefined,
    },
  });

  const handleUserSelect = (name: string) => {
    const selectedUserProcedure = userProcedures.find(
      (procedure) => procedure.userName === name
    );
    setValue("user", selectedUserProcedure?._id || name);
    setSelectedUser(name);
    setIsUserDropdownOpen(false);
  };

  const handleLabelSelect = (name: string) => {
    const selectedLabelProcedure = labelProcedures.find(
      (procedure) => procedure.labelName === name
    );
    setValue("label", selectedLabelProcedure?._id || name);
    setSelectedLabel(name);
    setIsLabelDropdownOpen(false);
  };

  const watchFields = watch(["user", "label", "startDate", "endDate"]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);
    setValue("startDate", start as Date);
    setValue("endDate", end ?? undefined);
    setIsDateOpen(false);
  };

  const handleSave = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        createAt: format(data?.startDate, "yyyy-MM-dd") ?? "",
        dueDate: format(data?.endDate!, "yyyy-MM-dd") ?? "",
      };
      await HomeServices.createProcedues(
        payload as unknown as createProceduesParam
      );
      setShowModal(false);
      resetField("title");
      resetField("category");
      toast.success("Success");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  const openDatePicker = () => {
    setIsDateOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      nameDropdownRef.current &&
      !nameDropdownRef.current.contains(event.target as Node)
    ) {
      setIsUserDropdownOpen(false);
    }
    if (
      categoryDropdownRef.current &&
      !categoryDropdownRef.current.contains(event.target as Node)
    ) {
      setIsLabelDropdownOpen(false);
    }
  };

  useEffect(() => {
    const fetchUserProcedures = async () => {
      const data = await HomeServices.userProcedues();
      if (typeof data !== "string") {
        setUserProcedures(data);
        if (data.length > 0) {
          setSelectedUser(data[0].userName);
          setValue("user", data[0]._id);
        }
      }
    };

    const fetchLabelProcedures = async () => {
      const data = await HomeServices.labelProcedues();
      if (typeof data !== "string") {
        setLabelProcedures(data);
        if (data.length > 0) {
          setSelectedLabel(data[0].labelName);
          setValue("label", data[0]._id);
        }
      }
    };

    fetchUserProcedures();
    fetchLabelProcedures();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mouseout", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-start md:items-end gap-3 flex-col md:flex-row">
        <div className="flex gap-1 items-start flex-col">
          <span className="text-2xl font-black text-primary-text">
            Projet champion 💪
          </span>
          <span className="text-sm font-normal text-secondary-text">
            Home / Projects / Projet champion 💪
          </span>
        </div>
        <button
          className="flex gap-2 h-11 rounded-lg py-2.5 pl-3 pr-4.5 bg-primary text-white font-black text-base"
          onClick={() => setShowModal(true)}>
          <Image src="/image/Add Square.svg" alt="add" width={20} height={20} />
          Create a new procedure
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[40%] p-6 max-sm:w-3/4">
            <h2 className="text-xl font-semibold mb-4">procedure</h2>
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Title"
                  className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-0 text-[14px] text-[black] bg-[#e5e7eb]"
                />
                {errors.title && (
                  <div className="text-red-600 text-sm">
                    {errors.title.message}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  {...register("category")}
                  placeholder="Category"
                  className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none text-[14px] text-[#495270] bg-[#e5e7eb]"
                />
                {errors.category && (
                  <div className="text-red-600 text-sm">
                    {errors.category.message}
                  </div>
                )}
              </div>

              <div className="w-full max-w-[931px] h-auto lg:h-[44px] ">
                <div className="flex justify-between max-md:flex-col gap-2">
                  <div className="flex flex-col">
                    <div
                      className="relative w-full lg:w-[128px] h-[44px] rounded-[8px] border p-[10px_18px_10px_12px] gap-[8px] text-[#F9FAFB] bg-[#F9FAFB] flex items-center cursor-pointer"
                      ref={nameDropdownRef}
                      onClick={toggleUserDropdown}>
                      <div className="w-full lg:w-[70px] h-[24px] text-[14px] leading-[24px] font-[500] text-[#495270] whitespace-nowrap">
                        {selectedUser}
                      </div>
                      <Image
                        src="/image/User.svg"
                        alt="User Icon"
                        width={20}
                        height={20}
                        className="object-contain"
                      />

                      {isUserDropdownOpen && (
                        <div className="absolute top-[100%] left-0 mt-2 w-full bg-[#E5E7EB] border rounded-[8px] shadow-lg z-10">
                          {userProcedures.map((procedure) => (
                            <div
                              key={procedure._id}
                              className="p-2 text-[14px] text-[#495270] hover:bg-[#D1D5DB] cursor-pointer"
                              onClick={() =>
                                handleUserSelect(procedure.userName)
                              }>
                              {procedure.userName}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {errors.user && (
                      <div className="text-red-600 text-sm">
                        {errors.user.message}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div
                      className="relative w-full  h-[44px] rounded-[8px] border p-[10px_18px_10px_12px] gap-[8px] text-[#F9FAFB] bg-[#F9FAFB] flex items-center cursor-pointer"
                      ref={categoryDropdownRef}
                      onClick={toggleLabelDropdown}>
                      <div className="w-full lg:w-[192px] h-[24px] text-[14px] leading-[24px] font-[500] text-[#64748B] whitespace-nowrap">
                        {selectedLabel}
                      </div>
                      <Image
                        src="/image/Widget.svg"
                        alt="Widget Icon"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      {isLabelDropdownOpen && (
                        <div className="absolute top-[100%] left-0 mt-2 w-full bg-[#E5E7EB] border rounded-[8px] shadow-lg z-10">
                          {labelProcedures.map((procedure) => (
                            <div
                              key={procedure._id}
                              className="p-2 text-[14px] text-[#495270] hover:bg-[#D1D5DB] cursor-pointer"
                              onClick={() =>
                                handleLabelSelect(procedure.labelName)
                              }>
                              {procedure.labelName}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.label && (
                      <div className="text-red-600 text-sm">
                        {errors.label.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[931px] h-auto lg:h-[44px] gap-[10px] mt-10 ">
                <div className="relative w-full lg:w-[194px] h-[44px] rounded-lg border p-2 bg-[#F9FAFB] flex items-center cursor-pointer">
                  <div className="flex-1 text-sm font-medium text-[#64748B]">
                    {formattedStartDate && formattedEndDate
                      ? `${formattedStartDate} - ${formattedEndDate}`
                      : "Select Date Range"}
                  </div>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    dateFormat="dd/MM/yyyy"
                    open={isDateOpen}
                    onClickOutside={() => setIsDateOpen(false)}
                    className="absolute inset-0 w-full h-full rounded-lg border-none bg-transparent opacity-0 cursor-pointer"
                  />
                  <Image
                    src="/image/Calendar.svg"
                    alt="Calendar Icon"
                    width={20}
                    height={20}
                    className="object-contain ml-auto"
                    onClick={openDatePicker}
                  />
                </div>
                {errors.startDate && (
                  <div className="text-red-600 text-sm">
                    {errors.startDate.message}
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadingBox;
