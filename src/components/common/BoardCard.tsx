import React from "react";
import { Link } from "react-router-dom";
import timeAgo from "../../utils/timeAgo";
import Heart from "../../assets/heart-empty.svg";
import Reply from "../../assets/reply.svg";

interface BoardCardProps {
  title: string;
  description: string;
  author: string;
  time: string;
  heartCount: number;
  replyCount: number;
  imageUrl: string | null;
  authorImageUrl?: string;
  locked?: boolean;
}

const BoardCard: React.FC<BoardCardProps> = ({
  title,
  description,
  author,
  time,
  heartCount,
  replyCount,
  imageUrl,
  authorImageUrl,
  locked,
}) => {
  return (
    <>
      <div className="flex justify-between items-center my-[1.75vh] px-[1vw] ">
        <div className="pr-[2.5vw] mr-[0.8vw]">
          {locked ? (
            <span className="text-[1.05rem] text-C333333 font-medium line-clamp-1">
              🔒 {title}
            </span>
          ) : (
            <span className="text-[1.05rem] text-C333333 font-medium line-clamp-1">
              {title}
            </span>
          )}

          <p className="text-[0.9rem] text-C333333 line-clamp-1 mt-[0.25vh]">
            {description}
          </p>
          <div className="flex">
            <img
              src={authorImageUrl}
              className="w-[2.25vh] h-[2.25vh] mr-[1vw] rounded-[0.25rem]"
            />
            <p className="text-[0.85rem] text-C333333">
              {author} | {timeAgo({ createdTime: time })}
            </p>
          </div>
          <div className="flex mt-[0.2vh]">
            <img src={Heart} className="w-[1.5vh] mr-[1vw] text-C333333"></img>
            <p className="text-[0.85rem] mr-[1vw] text-C333333">{heartCount}</p>
            <img src={Reply} className="w-[1.5vh] mr-[1vw] text-C333333"></img>
            <p className="text-[0.85rem] mr-[1vw] text-C333333">{replyCount}</p>
          </div>
        </div>

        {imageUrl && (
          <img
            className="w-[22vw] h-[22vw] rounded-[0.75rem]"
            src={imageUrl}
            alt="Post Thumbnail"
          />
        )}
      </div>
      <hr className="border-CD9D9D9" />
    </>
  );
};

export default BoardCard;
