import React from "react";

interface LoanDetailItem {
  title: string;
  content: string;
}

interface LoanDetailProps {
  loanDetailArray: LoanDetailItem[];
  isLoanDetailLoaded: boolean;
}

const LoanDetail: React.FC<LoanDetailProps> = ({
  loanDetailArray,
  isLoanDetailLoaded,
}) => {
  return (
    <>
      {isLoanDetailLoaded && (
        <>
          {loanDetailArray.map((item, index) => (
            <div key={index}>
              <p key={item.title}>
                - <span dangerouslySetInnerHTML={{ __html: item.title }} />:{" "}
                <span dangerouslySetInnerHTML={{ __html: item.content }} />
              </p>
              <br />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default LoanDetail;
