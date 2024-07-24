import Image from "next/image";

const HeadingBox = () => {
  return (
    <div className="flex justify-between items-start md:items-end gap-3 flex-col md:flex-row">
      <div className="flex gap-1 items-start flex-col">
        <span className="text-2xl font-black text-primary-text">
          Projet champion 💪
        </span>
        <span className="text-sm font-normal text-secondary-text">
          Home / Projects / Projet champion 💪
        </span>
      </div>
      <button className="flex gap-2 h-11 rounded-lg	py-2.5 pl-3 pr-4.5 bg-primary text-white font-black text-base">
        <Image src="/image/Add Square.svg" alt="add" width={20} height={20} />
        Create a new procedure
      </button>
    </div>
  );
};

export default HeadingBox;
