import React from "react";
import KBCard from "../../assets/card-kb.svg";
import Star from "../../assets/star-filled.svg";
import { Link } from "react-router-dom";

interface ProductCardProps {
  cardName: string;
  cardBrand: string;
  benefits: string[];
  reviewCount: number;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  cardName,
  cardBrand,
  benefits,
  reviewCount,
  link,
}) => {
  return (
    <Link to={`${link}`}>
      <div className="shadow-productCard rounded-[0.5rem] mt-[1.5vh] mb-[0.5vh]">
        <div className="flex justify-around p-[1vh] items-center">
          <img className="pr-[5vw] h-[12vh]" src={KBCard} alt="Card Image" />
          <div className="">
            <span className="mt-[0.5vh] font-semibold text-[1rem]">
              {cardName}
            </span>
            <span className="p-[1vw] pb-[0] text-[0.8rem] text-C333333 rounded-[0.25rem] ml-[1.5vw]">
              {cardBrand}
            </span>
            <div className="my-[0.25vh]">
              {benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="text-[0.75rem] mr-[1vw] p-[1vw] bg-CECF0FF rounded-[0.25rem]"
                >
                  {benefit}
                </span>
              ))}
            </div>
            <div className="flex">
              <span className="ml-[0.25vh] text-[0.8rem] mt-[0.5vh] text-C333333">
                {" "}
                {reviewCount}명의 유저가 관련 핀을 작성했어요!
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;