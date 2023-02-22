import "./QuestionCards.scss";

const QuestionCards = (props) => {
  const { question } = props;
  return (
    <div className="question-cards">
      <div className="card-1"></div>
      <div className="card-2"></div>
      <div className="card-3">
        <p>{question}</p>
      </div>
    </div>
  );
};

export default QuestionCards;
