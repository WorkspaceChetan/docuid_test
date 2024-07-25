"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const HeadingBox = () => {
  const [showModal, setShowModal] = useState(false);
  const [labelName, setLabelName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    setShowModal(false);
    setLabelName("");
    setEmail("");
    setDescription("");
  };

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isNameDropdownOpen, setIsNameDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedName, setSelectedName] = useState("Joe Regan");
  const [selectedCategory, setSelectedCategory] = useState(
    "Reseau, Design, informatique"
  );
  const formattedStartDate = startDate ? format(startDate, "dd/MM/yy") : "";
  const formattedEndDate = endDate ? format(endDate, "dd/MM/yy") : "";

  const nameDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const names = ["Joe Regan", "Jane Doe", "John Smith"];
  const categories = ["Reseau", "Design", "informatique"];

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
    <div>
      <div className="flex justify-between items-start md:items-end gap-3 flex-col md:flex-row">
        <div className="flex gap-1 items-start flex-col">
          <span className="text-2xl font-black text-primary-text font-satoshi-variable">
            Projet champion 💪
          </span>
          <span className="text-sm font-normal text-secondary-text font-satoshi-variable">
            Home / Projects / Projet champion 💪
          </span>
        </div>
        <button
          className="flex gap-2 h-11 rounded-lg py-2.5 pl-3 pr-4.5 bg-primary text-white font-black text-base font-satoshi-variable"
          onClick={() => setShowModal(true)}
        >
          <Image src="/image/Add Square.svg" alt="add" width={20} height={20} />
          Create a new procedure
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[40%] p-6">
            <h2 className="text-xl font-semibold mb-4">Create Label</h2>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="Title"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={labelName}
                onChange={(e) => setLabelName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 mb-1">Category</label>
              <input
                type="text"
                placeholder="category"
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-between mb-2">
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">User</label>
                <div
                  className="relative w-full lg:w-[220px] h-[44px] rounded-[8px] border p-[10px_18px_10px_12px] gap-[8px] text-[#F9FAFB] bg-[#E5E7EB] flex items-center cursor-pointer"
                  ref={nameDropdownRef}
                  onClick={toggleNameDropdown}
                >
                  <div className="flex w-96 justify-between">
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
                  </div>
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
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Label</label>

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
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Due Date</label>

              <div className="relative w-full lg:w-[220px] h-[44px] rounded-lg border p-2 bg-[#E5E7EB] flex items-center cursor-pointer">
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

            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadingBox;
