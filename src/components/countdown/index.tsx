import React from "react";

interface TimeUnitProps {
  children: React.ReactNode;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ children }) => {
  return (
    <span className="bg-[#333] text-white p-[5px] rounded-[5px] text-[27px]">
      {children}
    </span>
  );
};

const Countdown: React.FC = () => {
  return (
    <div className="flex items-center gap-[2px]">
      <TimeUnit>1</TimeUnit>
      <TimeUnit>2</TimeUnit>
      <b className="text-[20px]">:</b>
      <TimeUnit>4</TimeUnit>
      <TimeUnit>5</TimeUnit>
      <b className="text-[20px]">:</b>
      <TimeUnit>1</TimeUnit>
      <TimeUnit>0</TimeUnit>
    </div>
  );
};

export default Countdown;
