"use client";
import { TaskItem } from "@/services/types";
import Image from "next/image";

const TaskCard = ({ label, description, user, date }: TaskItem) => {
  return (
    <div className="w-full max-w-[300px] h-[185.07px] flex flex-wrap rounded-md w-76 bg-white p-[20px]">
      <div className="w-full max-w-[260px] h-[145.07px] flex flex-col gap-[10px]">
        <div className="w-full max-w-[97px] h-[16px] flex gap-[10px]">
          <Image src="/image/fire.svg" alt="fire" width={44} height={16} />
          <div className="w-full w-[55px] w-full max-w-[55px] h-[16px] text-xs font-medium border rounded-full text-gray-700 border-gray-300 flex items-center justify-center">
            <div className="w-[35px] h-[16px] font-medium leading-[16px] text-[10px]">
              {label}
            </div>
          </div>
        </div>
        <span className="w-[260px] h-[48px] font-extrabold leading-[24px] text-[16px] text-grey-text font-satoshi-variable">
          {description}
        </span>
        <div className="w-full max-w-[89px] h-[24px] flex gap-[5px]">
          <Image
            src="/image/profile.svg"
            alt="profile"
            width={24}
            height={24}
          />
          <span className="w-[60px] leading-[20px] font-medium text-[12px] text-[#1C274C] font-inter">
            {user}
          </span>
        </div>
        <hr className="w-full" />
        <div className="flex justify-between items-center w-full h-[16px]">
          <div className="flex gap-1.5 items-center rounded-full px-2 py-0.5 bg-light-grey">
            <Image
              src="/image/history.svg"
              alt="history"
              width={12}
              height={12}
            />
            <span className="text-[8px] leading-[10px] font-semibold text-[#1C274C] font-inte">
              Due date: {date}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              src="/image/Chat Round Line.svg"
              alt="Chat Round Line"
              width={14}
              height={14}
            />
            <span className="text-2.5 font-semibold text-secondary-text">
              1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
