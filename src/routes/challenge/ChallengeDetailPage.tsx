import { Link } from "react-router-dom";
import Header from "../../components/Header";
import EmotionSaveImg from "../../assets/emotion-save.svg";
import SmallLogoImg from "../../assets/small-profile.svg";
import DateImg from "../../assets/date.svg";
import CheckImg from "../../assets/check.svg";
import HappyImg from "../../assets/happy-face.svg";
import SadImg from "../../assets/sad-face.svg";
import AngryImg from "../../assets/angry-face.svg";
import Navbar from "../../components/Navbar";

const ChallengeDetailPage = () => {
  return (
    <>
      <Header text="감정 저축 챌린지" type={0} />
      <div className="mt-[4.5vh]"></div>
      <div className="flex flex-col items-center">
        <div>
          <img
            src={EmotionSaveImg}
            width={"80vw"}
            height={"70vh"}
            alt="Emotion Save"
          />
        </div>

        <p className="text-xs text-[#748BFF] bg-[#ECF0FF] rounded-xl shadow mb-[1vh] py-[0.5vh] px-[2vw]">
          진행중
        </p>
        <p className="mb-[2vh] text-lg font-black text-black">감정 저축하기</p>

        <div className="w-[80vw] px-[5.5vw] py-[2vh] rounded-xl flex flex-col items-center bg-[#F4F3F8]">
          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center pl-[5vw]">
              <img
                src={DateImg}
                width={"20vw"}
                height={"20vh"}
                alt="Date"
                style={{ marginBottom: "1vh" }}
              />

              <img
                src={SmallLogoImg}
                width={"20vw"}
                height={"20vh"}
                alt="Small Logo"
                style={{ marginBottom: "0.5vh" }}
              />

              <img src={CheckImg} width={"20vw"} height={"20vh"} alt="Check" />
            </div>
            <div className="flex flex-col pr-[5vw]">
              <p className="items-center text-xs font-semibold text-black-900 dark:text-black my-[0.5vh]">
                2024.06.03~2024.07.01
              </p>
              <p className="text-xs font-semibold text-black-900 dark:text-black my-[0.5vh]">
                1,758명 참여
              </p>
              <p className="text-xs font-semibold text-black-900 dark:text-black mt-[0.5vh]">
                매일 매일 감정에 따라 저축을 해봐요!
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-[2vh]">
          <Link
            to="/challenge/cal"
            className="text-base font-semibold text-[#748BFF] bg-[#ECF0FF] rounded-3xl shadow py-[0.5vh] px-[10vw]"
          >
            참여하기
          </Link>
        </div>
        <div className="w-full h-[2vh] bg-[#F4F3F8] mt-[2vh] mb-[5vh]"></div>

        <p className="mb-[3vh] text-base font-extrabold text-black">
          오늘 하루 감정을 기록하며 저축해봐요
        </p>
        <div className="flex justify-between w-[75vw] mb-[4vh]">
          <div className="flex flex-col items-center">
            <img
              src={AngryImg}
              width={"50vw"}
              height={"50vh"}
              alt="Angry Face"
            />
            <p className="text-sm font-extrabold text-black">화가 날 땐</p>
            <p className="text-xs font-normal text-black">1818원</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={SadImg} width={"50vh"} height={"50vh"} alt="Sad Face" />
            <p className="text-sm font-extrabold text-black">슬플 땐</p>
            <p className="text-xs font-normal text-black">666원</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={HappyImg}
              width={"50vw"}
              height={"50vh"}
              alt="Happy Face"
            />
            <p className="text-sm font-extrabold text-black">기쁠 땐</p>
            <p className="text-xs font-normal text-black">5959원</p>
          </div>
        </div>

        <p className="text-sm font-medium text-black text-center">
          매일 감정에 따라 저축을 하면,
          <br /> 심리적 효과에 의해 절약 습관을 기르는 데 도움이 됩니다.
          <br />
          <br />
          한달간의 챌린지를 통해
          <br />
          자신의 감정을 돌아보며 저축해봐요 :)
        </p>
        <Navbar />
      </div>
    </>
  );
};

export default ChallengeDetailPage;
