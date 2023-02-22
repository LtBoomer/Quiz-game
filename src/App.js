import React, { useState, useEffect } from "react";

// imported variables
import "./App.scss";
import Title from "./comonents/Title/Title";
import QuestionCards from "./comonents/question-cards/QuestionCards";
import Answers from "./comonents/answers/Answers";
import AdminShow from "./comonents/admin-access/AdminLogin";
import AdminPage from "./comonents/admin-page/AdminPage";
import { AiOutlineArrowRight } from "react-icons/ai";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

// constants
const App = () => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [showArrowNextQuestion, setShowArrowNextQuestion] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const quizCollectionRef = collection(db, "Quiz-Samples");
  const [adminShow, setAdminShow] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(quizCollectionRef);
      const loadedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuiz(loadedData[0].Quiz);
    };
    getData();
  }, []);


  return (
    <div className="quiz-container">
      <Title />
      {quiz.length > 0 && questionCounter !== quiz.length && adminShow && (
        <QuestionCards question={quiz[questionCounter].question} />
      )}
      {quiz.length > 0 && questionCounter !== quiz.length && adminShow &&(
        <Answers
          QuestionCounter={questionCounter + 1}
          QuizSize={quiz.length}
          Answer1={quiz[questionCounter].answer[0]}
          Answer2={quiz[questionCounter].answer[1]}
          Answer3={quiz[questionCounter].answer[2]}
          Answer4={quiz[questionCounter].answer[3]}
          rightAnswer={quiz[questionCounter].rightAnswer}
          showArrow={setShowArrowNextQuestion}
          refreshComponent={questionCounter}
        />
      )}
      {quiz.length > 0 && questionCounter !== quiz.length && adminShow && <AdminShow adminShow={adminShow} setAdminShow={setAdminShow}/>}
      {showArrowNextQuestion && adminShow && (
        <div className="iconWrapper">
          <AiOutlineArrowRight
            fontSize={40}
            onClick={() => {
              setQuestionCounter(questionCounter + 1);
              setShowArrowNextQuestion(false);
            }}
          />
        </div>
      )}
      {questionCounter === quiz.length && (
        <div className="end-screen">
          <h1 className="congratulations-message">Congratulations</h1>
        </div>
      )}
      {!adminShow && <AdminPage moveBack={setAdminShow}/>}
    </div>
  );
};

export default App;
