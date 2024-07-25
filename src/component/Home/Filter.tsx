"use client";
import { GetProcedures } from "@/services/types";
import { format } from "date-fns";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TasksManagerBox from "./TasksManagerBox";

const Filter = ({ procedures }: { procedures: GetProcedures[] | string }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("joe regon");
  const [selectedCategory, setSelectedCategory] =
    useState("customer ui create");
  const formattedStartDate = startDate ? format(startDate, "dd/MM/yy") : "";
  const formattedEndDate = endDate ? format(endDate, "dd/MM/yy") : "";
  console.log(selectedName, "selectedName");
  console.log(selectedCategory, "selectedCategory");

  const nameDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const names = ["joe regon", "Jane Doe", "John Smith"];
  const categories = [
    "Reseau, Design, informatique",
    "customer ui create",
    "Category 2",
  ];

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start ?? undefined);
    setEndDate(end ?? undefined);
    setIsDateOpen(false);
  };

  const openDatePicker = () => {
    setIsDateOpen(true);
  };

  const toggleNameDropdown = () => setIsNameDropdownOpen((prev) => !prev);

  const toggleCategoryDropdown = () =>
    setIsCategoryDropdownOpen((prev) => !prev);

  const selectName = (name: string) => {
    setSelectedName(name);
    setIsNameDropdownOpen(true);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      nameDropdownRef.current &&
      !nameDropdownRef.current.contains(event.target as Node)
    ) {
      setIsNameDropdownOpen(false);
    }
    if (
      categoryDropdownRef.current &&
      !categoryDropdownRef.current.contains(event.target as Node)
    ) {
      setIsCategoryDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mouseout", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-7.5">
      <div className="w-full max-w-[1290px] h-auto lg:h-[68px] rounded-[10px] p-[12px_12px_12px_14px] lg:gap-[33px] gap-[10px] bg-white flex flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-[300px] h-[44px] flex gap-[15px] border border-gray-300 rounded-[8px] p-[10px_18px] bg-[#F9FAFB]">
          <Image
            src="/image/Search.svg"
            alt="Search Icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <input
            type="text"
            placeholder="Search procedure"
            className="w-full h-full border-none outline-none text-[16px] leading-[24px] font-[400] text-[#64748B]"
          />
        </div>

        <div className="w-full max-w-[931px] h-auto lg:h-[44px] gap-[10px] relative flex flex-wrap lg:flex-nowrap lg:justify-end">
          <div
            className="relative w-full lg:w-[128px] h-[44px] rounded-[8px] border p-[10px_18px_10px_12px] gap-[8px] text-[#F9FAFB] bg-[#E5E7EB] flex items-center cursor-pointer"
            ref={nameDropdownRef}
            onClick={toggleNameDropdown}
          >
            <div className="w-full lg:w-[70px] h-[24px] text-[14px] leading-[24px] font-[500] text-[#495270] whitespace-nowrap">
              {selectedName}
            </div>
            <Image
              src="/image/User.svg"
              alt="User Icon"
              width={20}
              height={20}
              className="object-contain"
            />
            {isNameDropdownOpen && (
              <div className="absolute top-[100%] left-0 mt-2 w-full bg-[#E5E7EB] border rounded-[8px] shadow-lg z-10">
                {names.map((name) => (
                  <div
                    key={name}
                    className="p-2 text-[14px] text-[#495270] hover:bg-[#D1D5DB] cursor-pointer"
                    onClick={() => selectName(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative w-full lg:w-[250px] h-[44px] rounded-[8px] border p-[10px_18px_10px_12px] gap-[8px] text-[#F9FAFB] bg-[#E5E7EB] flex items-center cursor-pointer"
            ref={categoryDropdownRef}
            onClick={toggleCategoryDropdown}
          >
            <div className="w-full lg:w-[192px] h-[24px] text-[14px] leading-[24px] font-[500] text-[#64748B] whitespace-nowrap">
              {selectedCategory}
            </div>
            <Image
              src="/image/Widget.svg"
              alt="Widget Icon"
              width={20}
              height={20}
              className="object-contain"
            />
            {isCategoryDropdownOpen && (
              <div className="absolute top-[100%] left-0 mt-2 w-full bg-[#E5E7EB] border rounded-[8px] shadow-lg z-10">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="p-2 text-[14px] text-[#495270] hover:bg-[#D1D5DB] cursor-pointer"
                    onClick={() => selectCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full lg:w-[194px] h-[44px] rounded-lg border p-2 bg-[#E5E7EB] flex items-center cursor-pointer">
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
        </div>
      </div>
      <TasksManagerBox
        procedures={procedures}
        selectedName={selectedName}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Filter;
