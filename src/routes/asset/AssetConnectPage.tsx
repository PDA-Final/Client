import { useState } from "react";
import MiniCircle from "../../assets/minicircle.svg?react";
import Essential from "../../assets/required.svg?react";
import Checked from "../../assets/checked.svg?react";

const AssetConnectPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAgreementChange = () => {
    setIsAgreed(!isAgreed);
    setIsDropdownOpen(false); // 체크 시 드롭다운 닫기
  };

  return (
    <>
      <div className="px-[8vw] pt-[5vh] relative">
        <p className="text-[#748BFF] text-4xl font-semibold">ToFin</p>
        <p className="text-2xl font-medium mb-[2.5vh]">자산을 연결해주세요 </p>
        <p className="text-base mb-[4vh]">
          나의 자산을 연결할 수 있어요 <br />
          자산 공개 여부는 설정에서 바꿀 수 있어요
        </p>

        <div className="flex mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">동의 서약</p>
          <Essential />
        </div>

        {/* 동의 서약 드롭다운 버튼 */}
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-[2vw] text-left flex justify-between items-center"
          type="button"
          onClick={toggleDropdown}
        >
          나의 자산 연결하기(나의 자산){" "}
          {isAgreed ? (
            <Checked className="w-[4.5vw] h-[3vh]" />
          ) : (
            <svg
              className="w-[3vw] h-[3vh]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          )}
        </button>

        {/* 드롭다운 내용 */}
        {isDropdownOpen && (
          <div className="mt-[2vh] p-[2vh] bg-gray-50 border border-gray-300 w-[84vw] rounded-lg shadow absolute">
            <p className="text-base font-bold mb-[2vw]">제공 동의여부</p>
            <p className="text-base mb-[2vw]">
              본인의 개인(신용)정보를 제공하는 것에 동의합니다.
            </p>
            <p className="text-base font-bold mb-2">고유식별정보 동의 여부</p>
            <p className="text-base mb-2">
              본인의 고유식별정보(주민등록번호) 를 제공하는 것에 동의합니다.
            </p>
            <div className="flex items-center justify-end mt-4">
              <input
                type="checkbox"
                id="agreement"
                checked={isAgreed}
                onChange={handleAgreementChange}
                className="mr-2"
                style={{ color: "#748BFF" }}
              />
              <label htmlFor="agreement" className="text-sm">
                동의
              </label>
            </div>
          </div>
        )}

        <div className="flex mt-[2vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">이름</p>
          <Essential />
        </div>
        <input
          type="text"
          id="Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Name"
          required
        />

        <div className="flex mt-[2vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">주민등록번호</p>
          <Essential />
        </div>
        <input
          type="text"
          id="RRN"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="RRN"
          required
        />

        <div className="flex mt-[2vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">전화번호</p>
          <Essential />
        </div>
        <input
          type="text"
          id="Phonenumber"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Phonenumber"
          required
        />

        <div className="flex mt-[2vh] mb-[1vh] items-center">
          <p className="text-lg font-semibold mr-[1vw]">전화번호 확인</p>
          <Essential />
        </div>
        <input
          type="password"
          id="Phonenumber_check"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Phonenumber_check"
          required
        />
      </div>

      <div className="fixed w-full px-[8vw] pb-[3vh]">
        <div className="flex justify-center mb-[3vh]">
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3 mr-5" />
          <MiniCircle className="w-3 h-3 mr-5" style={{ fill: "#748BFF" }} />
          <MiniCircle className="w-3 h-3" />
        </div>
        <button className="text-lg font-normal text-white text-center bg-[#748BFF] rounded-[1rem] shadow py-[2vh] w-full">
          나의 자산 연결하기
        </button>
      </div>
    </>
  );
};

export default AssetConnectPage;