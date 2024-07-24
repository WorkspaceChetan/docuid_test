import Image from "next/image";

const TaskCard = ({
  label,
  description,
  user,
  date,
}: {
  label: string;
  description: string;
  user: string;
  date: string;
}) => {
  return (
    <div className="flex flex-wrap gap-2.5 rounded-md w-76 bg-white p-5">
      <div className="flex gap-2.5">
        <Image src="/image/fire.svg" alt="fire" width={32} height={16} />
        <div className="w-14 h-4 rounded-full px-2.5 py-0 border text-2.5 font-normal">
          {label}
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
