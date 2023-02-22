import { useEffect, useState } from "react";
import "./Answers.scss";
const Answers = (props) => {
  const {
    QuestionCounter,
    QuizSize,
    Answer1,
    Answer2,
    Answer3,
    Answer4,
    rightAnswer,
    showArrow,
    refreshComponent,
  } = props;
  const [firstClick, setFirstClick] = useState(true);

  useEffect(() => {
    setFirstClick(true);
    const allAnswers = document.querySelectorAll(".answer-box p");
    allAnswers.forEach((answer) => {
      answer.parentElement.style.backgroundColor = "transparent";
    });
  }, [refreshComponent]);

  const CheckForAnswer = (answer, id) => {
    const element = document.querySelector(id);
    setTimeout(() => {
      showArrow(true);
    }, 1000);

    if (answer === rightAnswer) {
      element.style.backgroundColor = "lightGreen";
    } else {
      const allAnswers = document.querySelectorAll(".answer-box p");
      allAnswers.forEach((answer, index) => {
        if (answer.innerHTML === rightAnswer) {
          setTimeout(() => {
            answer.parentElement.style.backgroundColor = "lightGreen";
          }, 500);
        }
      });
      element.style.backgroundColor = "red";
    }
  };
  return (
    <div className="bottom-section">
      <p className="question-counter">
        {QuestionCounter}/{QuizSize}
      </p>
      <div className="answers-wrapper">
        <div
          className="answer-1 answer-box"
          onClick={() => {
            if (firstClick) {
              CheckForAnswer(Answer1, ".answer-1");
              setFirstClick(false);
            }
          }}
        >
          <p>{Answer1}</p>
        </div>
        <div
          className="answer-2 answer-box"
          onClick={() => {
            if (firstClick) {
              CheckForAnswer(Answer2, ".answer-2");
              setFirstClick(false);
            }
          }}
        >
          <p>{Answer2}</p>
        </div>
        <div
          className="answer-3 answer-box"
          onClick={() => {
            if (firstClick) {
              CheckForAnswer(Answer3, ".answer-3");
              setFirstClick(false);
            }
          }}
        >
          <p>{Answer3}</p>
        </div>
        <div
          className="answer-4 answer-box"
          onClick={() => {
            if (firstClick) {
              CheckForAnswer(Answer4, ".answer-4");
              setFirstClick(false);
            }
          }}
        >
          <p>{Answer4}</p>
        </div>
      </div>
    </div>
  );
};

export default Answers;
