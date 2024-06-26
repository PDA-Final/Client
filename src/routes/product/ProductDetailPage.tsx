import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import BoardCard from "../../components/common/BoardCard";
import Navbar from "../../components/common/Navbar";
import writeButton from "../../assets/write-button.svg";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import {
  fetchProductBasic,
  ProductBasic,
  CardProductSummary,
  fetchCardProductSummary,
  SavingProductSummary,
  fetchSavingProductSummary,
  FundProductSummary,
  fetchFundProductSummary,
  fetchLoanProductSummary,
  LoanProductSummary,
  LoanFeature,
  fetchLoanProductDetail,
  LoanProductDetail,
  fetchSavingProductDetail,
  SavingProductDetail,
  fetchFundProductDetail,
  FundProductDetail,
  fetchCardProductDetail,
  CardProductDetail,
  fetchBoardList,
  BoardData,
} from "../../libs/apis/product";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import ProductSummary from "../../components/product/ProductSummary";
import SavingDetail from "../../components/product/SavingDetail";
import FundDetail from "../../components/product/FundDetail";
import LoanDetail from "../../components/product/LoanDetail";
import CardDetail from "../../components/product/CardDetail";

export default function ProductListPage() {
  const navigate = useNavigate();
  const [benefits, setBenefits] = useState<
    { title: string; content: string | number }[]
  >([]);
  const [cardBenefits, setCardBenefits] = useState<CardProductSummary | null>(
    null
  );
  const [isLoanDetailLoaded, setIsLoanDetailLoaded] = useState(false);
  const [savingBenefits, setSavingBenefits] =
    useState<SavingProductSummary | null>(null);
  const [fundBenefits, setFundBenefits] = useState<FundProductSummary | null>(
    null
  );
  const [loanBenefits, setLoanBenefits] = useState<LoanProductSummary | null>(
    null
  );
  const [loanDetail, setLoanDetail] = useState<LoanProductDetail | null>(null);
  const [savingDetail, setSavingDetail] = useState<SavingProductDetail | null>(
    null
  );
  const [fundDetail, setFundDetail] = useState<FundProductDetail | null>(null);
  const [cardDetail, setCardDetail] = useState<CardProductDetail | null>(null);
  const [boardData, setBoardData] = useState<BoardData[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const params = useParams();
  const productId = params.productId ?? "";
  const [productBasic, setProductBasic] = useState<ProductBasic | null>(null);
  const [productType, setProductType] = useState("");
  const [loanDetailArray, setLoanDetailArray] = useState<LoanFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const handleImageLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageSize({
      width: e.currentTarget.width,
      height: e.currentTarget.height,
    });
  };

  const callBoardData = async () => {
    try {
      const { data } = await fetchBoardList({
        pageNo: 0,
        size: 3,
        productId: Number(productId),
      });
      setBoardData(data);
      console.log(data);
    } catch (error) {
      console.error("보드 데이터 호출 중 에러:", error);
    }
  };

  useEffect(() => {
    callBoardData();
  }, []);

  const relatedBoardClick = () => {
    navigate(`/product/${productId}/related`, {
      state: {
        relatedCnt: productBasic?.boardCount,
        productType: productType,
      },
    });
  };

  const toggleShowDetail = () => {
    setShowDetail((prevState) => !prevState);
  };

  const callProductDetail = async (type: string) => {
    try {
      const response = await fetchProductBasic(productId);
      if (response.data) {
        // console.log(response.data);
        setProductBasic(response.data);
      } else {
        console.error("상품 베이직 데이터가 없습니다.");
      }

      if (type === "카드") {
        const cardSummaryResponse = await fetchCardProductSummary(productId);
        if (cardSummaryResponse.data) {
          // console.log(cardSummaryResponse.data);
          setCardBenefits(cardSummaryResponse.data);
        } else {
          console.error("상품 카드 데이터가 없습니다.");
        }
        const cardDetailResponse = await fetchCardProductDetail(productId);
        if (cardDetailResponse.data) {
          setCardDetail(cardDetailResponse.data);
        } else {
          console.error("상품 card detail 데이터가 없습니다.");
        }
      } else if (type === "예적금") {
        const savingSummaryResponse = await fetchSavingProductSummary(
          productId
        );
        if (savingSummaryResponse.data) {
          // console.log(savingSummaryResponse.data);
          setSavingBenefits(savingSummaryResponse.data);
        } else {
          console.error("상품 예적금 데이터가 없습니다.");
        }

        const savingDetailResponse = await fetchSavingProductDetail(productId);
        if (savingDetailResponse.data) {
          setSavingDetail(savingDetailResponse.data);
        } else {
          console.error("상품 예적금 detail 데이터가 없습니다.");
        }
      } else if (type === "펀드") {
        const fundSummaryResponse = await fetchFundProductSummary(productId);
        if (fundSummaryResponse.data) {
          setFundBenefits(fundSummaryResponse.data);
        } else {
          console.error("상품 펀드 데이터가 없습니다.");
        }
        const fundDetailResponse = await fetchFundProductDetail(productId);
        if (fundDetailResponse.data) {
          setFundDetail(fundDetailResponse.data);
        } else {
          console.error("상품 펀드 detail 데이터가 없습니다.");
        }
      } else if (type === "대출") {
        const loanSummaryResponse = await fetchLoanProductSummary(productId);
        if (loanSummaryResponse.data) {
          setLoanBenefits(loanSummaryResponse.data);
        } else {
          console.error("상품 대출 데이터가 없습니다.");
        }

        const loanDetailResponse = await fetchLoanProductDetail(productId);
        if (loanDetailResponse.data) {
          setLoanDetail(loanDetailResponse.data);

          let jsonString = loanDetail?.description.replace(/'/g, '"');
          if (jsonString) {
            const jsonArray = JSON.parse(jsonString);
            setLoanDetailArray(jsonArray);
            setIsLoanDetailLoaded(true);
          }
        } else {
          console.error("상품 대출 디테일 데이터가 없습니다.");
        }
      }
    } catch (error) {
      console.error("상품 베이직 데이터 호출 중 에러:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (productType === "대출") {
      const fetchData = async () => {
        try {
          const loanDetailResponse = await fetchLoanProductDetail(productId);
          if (loanDetailResponse.data) {
            setLoanDetail(loanDetailResponse.data);

            let jsonString = loanDetailResponse.data?.description.replace(
              /'/g,
              '"'
            );

            if (jsonString) {
              const jsonArray = JSON.parse(jsonString);
              setLoanDetailArray(jsonArray);
              setIsLoanDetailLoaded(true);
            }
          } else {
            console.error("상품 대출 디테일 데이터가 없습니다.");
          }
        } catch (error) {
          console.error("대출 디테일 데이터 불러오는데서 오류:", error);
        }
      };
      fetchData();
    }
  }, [productId]);

  useEffect(() => {
    if (loanDetail) {
      let jsonString = loanDetail?.description.replace(/'/g, '"');
      if (jsonString) {
        const jsonArray = JSON.parse(jsonString);
        setLoanDetailArray(jsonArray);
        setIsLoanDetailLoaded(true);
      }
    }
  }, [loanDetail]);

  useEffect(() => {
    const productTypeFromState = location.state.productType;
    setProductType(productTypeFromState);
    callProductDetail(productTypeFromState);
  }, [location.state.productType]);

  useEffect(() => {
    const benefitsArray = [];

    if (cardBenefits) {
      benefitsArray.push(
        { title: "연회비", content: cardBenefits.annualFee },
        { title: "기본실적", content: cardBenefits.baseRecord },
        { title: "주요혜택", content: cardBenefits.mainBenefit },
        { title: "알림", content: cardBenefits.notice },
        { title: "부가혜택", content: cardBenefits.subBenefit }
      );
    } else if (savingBenefits) {
      benefitsArray.push(
        { title: "기본", content: `연 ${savingBenefits.interestRate}%` },
        { title: "최고", content: `연 ${savingBenefits.primeInterestRate}%` },
        { title: "기간", content: `${savingBenefits.savingTerm}개월` },
        { title: "특판요약", content: savingBenefits.specialOfferSummary },
        { title: "특판기한", content: savingBenefits.specialOfferPeriod }
      );
    } else if (fundBenefits) {
      benefitsArray.push(
        { title: "펀드번호", content: fundBenefits.fundCode },
        { title: "기준가(원)", content: fundBenefits.stdPrice },
        { title: "기준가대비", content: fundBenefits.diffPrice },
        { title: "운용규모(억)", content: fundBenefits.drvNav },
        { title: "수익률(3개월)", content: fundBenefits.rt3m + "%" },
        { title: "총보수(%)", content: fundBenefits.ter }
      );
    } else if (loanBenefits) {
      benefitsArray.push(
        { title: "예상최소금리", content: `${loanBenefits.minInterestRate}%` },
        { title: "예상최대금리", content: `${loanBenefits.maxInterestRate}%` },
        { title: "최대한도", content: loanBenefits.maxLoanAmount }
      );
    }

    setBenefits(benefitsArray);
  }, [cardBenefits, savingBenefits, loanBenefits, fundBenefits]);

  useEffect(() => {
    if (benefits.length === 0 && productType) {
      callProductDetail(productType);
    }
  }, [benefits, productType]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="py-[2vh] px-[4.5vw] pb-[1vh] text-C333333">
            {productType === "펀드" ? (
              <Header text={"투자"} type="backLeftTextCenter" />
            ) : (
              <Header text={productType} type="backLeftTextCenter" />
            )}
            <div className="mt-[4vh]" />
            {productType === "카드" && (
              <div className="flex justify-center p-[2vh]">
                <img
                  className={`${
                    imageSize.height > imageSize.width ? "h-[20vh]" : "w-[20vh]"
                  } `}
                  src={productBasic?.cardImage}
                  onLoad={handleImageLoad}
                />
              </div>
            )}

            <div>
              <div className="flex items-align">
                <img
                  className="w-[3.5vh] inline mr-[0.6vw]"
                  src={productBasic?.corpImage}
                />
                <span className="text-[0.85rem] text-C333333 mt-[0.1rem]">
                  {productBasic?.corpName}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[1.4rem] ml-[1.5vw] mb-[0.6vh]">
                  {productBasic?.name}
                </p>
                <div className="mb-[1vh]">
                  {productBasic?.tags.map((benefit, index) => (
                    <span
                      key={index}
                      className="ml-[1.5vw] text-[0.75rem] mr-[1vw] p-[1vw] bg-CECF0FF rounded-[0.25rem]"
                    >
                      #{benefit}
                    </span>
                  ))}
                </div>
                <ProductSummary benefits={benefits} />

                {showDetail ? (
                  <>
                    <div
                      className="justify-center flex mt-[1vh] cursor-pointer"
                      onClick={toggleShowDetail}
                    >
                      <span className="text-C333333 text-[0.85rem]">
                        상세정보 보기
                      </span>
                      <ChevronUpIcon
                        className="-mr-1 h-5 w-5 text-C333333"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-xs mt-[2vh] px-[2vh] border py-[2vh]">
                      <SavingDetail savingDetail={savingDetail} />
                      <FundDetail fundDetail={fundDetail} />
                      <LoanDetail
                        loanDetailArray={loanDetailArray}
                        isLoanDetailLoaded={isLoanDetailLoaded}
                      />
                      <CardDetail cardDetail={cardDetail} />
                    </p>
                  </>
                ) : (
                  <div
                    className="justify-center flex mt-[1vh] cursor-pointer"
                    onClick={toggleShowDetail}
                  >
                    <span className="text-C333333 text-sm">상세정보 보기</span>
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-C333333"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="h-[1.5vh] bg-[#F4F3F8]" />
          <div className="py-[2vh] px-[4.5vw] pb-[1vh]">
            <div className="flex justify-between items-center">
              <div className="inline">
                <span className="font-semibold text-[1.15rem] ml-[1.5vw]">
                  관련 핀
                </span>
                <span className="font-semibold text-[1.15rem] ml-[1.5vw] text-[#738BFF]">
                  {productBasic?.boardCount}
                </span>
              </div>
              {boardData.length === 0 ? (
                <></>
              ) : (
                <span
                  className="text-[0.75rem] text-C333333"
                  onClick={relatedBoardClick}
                >
                  더보기 {">"}
                </span>
              )}
            </div>

            <div>
              {boardData.length === 0 && (
                <div className="text-center rounded-[1rem] w-full h-[10vh] mt-[1.5vh] shadow-productCard flex text-C333333 items-center justify-center">
                  관련 핀이 없습니다.
                </div>
              )}
              {boardData.map((item, index) => (
                <div key={index}>
                  <Link to={`/board/${item.id}`}>
                    <BoardCard
                      title={item.title}
                      description={item.summary}
                      author={item.authorNickname}
                      time={item.createdTime}
                      heartCount={item.likeCount}
                      replyCount={item.commentCount}
                      imageUrl={item.thumbnail}
                      authorImageUrl={item.authorProfile}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <Link to={`/board/write?productId=${productId}`}>
              <img
                className="fixed bottom-[8vh] right-[4vw] z-5"
                src={writeButton}
              />
            </Link>
            <div className="pb-[8.5vh]" />
            <Navbar />
          </div>
        </>
      )}
    </>
  );
}
