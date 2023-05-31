import React from "react";
import simple from "../Assets/free-icon-checklist-7260996.png";
import netflix from "../Assets/free-icon-parachute-9681937.png";
import css from "../Assets/free-icon-shield-306047.png";

const Value = () => {
  return (
    <div className="mb-[0rem] mt-[0rem]">
      <h1 className="text-textColor text-[25px] py-[2rem] pb-[3rem] font-bold w-[400px] block ml-8 whitespace-nowrap">
        The value that holds us true and to account
      </h1>

      <div className="grid gap-[10rem] grid-cols-3 items-center ml-8">
        <div className="singleGrid rounded-[10px] hover:bg-[#eeedf7] p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-inherit-[#dedef8] h-[40px] w-[40px] flex items-center justify-center">
              <img src={simple} alt="" className="w-[70%]" />
            </div>

            <span className="font-semibold text-textColor text-[18px]">
              Simplicity
            </span>
          </div>
          <p className="text-[13px] text-textColor opacity-[.7] py-[1rem] font-semibold">
            Things beinf made beautiful simple are at the heart of erverything
            we do
          </p>
        </div>

        <div className="singleGrid rounded-[10px] hover:bg-[#f7edf5] p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-inherit-[#dedef8] h-[40px] w-[40px] flex items-center justify-center">
              <img src={netflix} alt="" className="w-[70%]" />
            </div>

            <span className="font-semibold text-textColor text-[18px]">Social Good</span>
          </div>
          <p className="text-[13px] text-textColor opacity-[.7] py-[1rem] font-semibold">
            We believe in making things better for everyone, even if just by a
            little bit!
          </p>
        </div>

        <div className="singleGrid rounded-[10px] hover:bg-[#fcfae3] p-[1.5rem]">
          <div className="flex items-center gap-3">
            <div className="imgDiv p-[4px] rounded-[.8rem] bg-inherit-[#f3f2ad] h-[40px] w-[40px] flex items-center justify-center">
              <img src={css} alt="" className="w-[70%]" />
            </div>

            <span className="font-semibold text-textColor text-[18px]">Trust</span>
          </div>
          <p className="text-[13px] text-textColor opacity-[.7] py-[1rem] font-semibold">
            We work on the basis of creating trust which can be nurtured through
            authenticity and transparency
          </p>
        </div>


      </div>

      <div className="card mt-[2rem] flex justify-between bg-blue-500 p-[5rem] rounded-[10px]">
          <div>
            <h1 className="text-teal-500 text-[30px] font-bold">
              Ready to switch a career
            </h1>
            <h2 className="text-teal-500 text-[25px] font-bold">
              Let's get started
            </h2>
          </div>

          <button className="border-[2px] rounded-[10px] py-[4px] px-[50px] text-[18px] font-semibold text-teal-500 hover:bg-white border-teal-500">
            Get Started
          </button>
        </div>
    </div>
  );
};

export default Value;
