"use client";
import Image from "next/image";
import { TaskItem } from "../types/TasksManagerBoxType";

const TaskCard = ({ label, description, user, date }: TaskItem) => {
  return (
    <div className="flex flex-wrap gap-2.5 rounded-md w-76 bg-white p-5">
      <div className="flex items-center gap-2.5">
        <Image src="/image/fire.svg" alt="fire" width={44} height={16} />
        <div className="w-full w-[55px] w-full max-w-[55px] h-[16px] text-xs font-medium border rounded-full text-gray-700 border-gray-300 flex items-center justify-center">
          <div className="w-[35px] h-[16px] font-medium leading-[16px] text-[10px]">
            {label}
          </div>
        </div>
      </div>
      <span className="text-base font-black text-grey-text">{description}</span>
      <div className="flex gap-1.25 items-center">
        <Image src="/image/profile.svg" alt="profile" width={24} height={24} />
        <span className="text-xs font-medium text-primary-text">{user}</span>
      </div>
      <hr className="w-full" />
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-1.5 items-center rounded-full px-2 py-0.5 bg-light-grey">
          <Image
            src="/image/history.svg"
            alt="history"
            width={12}
            height={12}
          />
          <span className="text-2.5 font-semibold text-primary-text">
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
          <span className="text-2.5 font-semibold text-secondary-text">1</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
