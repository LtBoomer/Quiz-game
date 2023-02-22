import "./AdminQuestionList.scss";
import { db } from "../../firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

const AdminQuestionList = () => {
  //VARIABLES
  const answerHandle = ["", "", "", ""];
  const quizCollectionRef = collection(db, "Quiz-Samples");
  const [quiz, setQuiz] = useState([]);
  const [quizId, setQuizId] = useState();
  const [questionModel, setQuestionModel] = useState({
    answer: [],
    question: "",
    rightAnswer: "",
  });
  //FUNCTIONS
  const filterQuestions = async (index) => {
    const newArray = quiz.filter((_, order) => index !== order);
    setQuiz(quiz.filter((_, order) => index !== order));
    const adminDoc = doc(db, "Quiz-Samples", quizId);
    await updateDoc(adminDoc, { Quiz: newArray }).then(() => {
    });
  };
  
  const updateQuestions = async () => {
    setQuiz([...quiz, questionModel]);
    const newArray = [...quiz, questionModel];
    const adminDoc = doc(db, "Quiz-Samples", quizId);
    await updateDoc(adminDoc, { Quiz: newArray }).then(() => {
      console.log("success");
    });
  };
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(quizCollectionRef);
      const loadedData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuizId(loadedData[0].id);
      setQuiz(loadedData[0].Quiz);
    };
    getData();
  }, []);
  return (
    <div className="admin-questions-wrapper">
      <div className="question-list">
        {quiz.map((question, index) => {
          return (
            <div className="question-wrapper" key={`question-${index}`}>
              <p>
                {index + 1} - {question.question}
              </p>
              <BiTrash
                style={{ cursor: "pointer", fontSize: "25px" }}
                onClick={() => {
                  filterQuestions(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="create-question">
        <input
          className="Question-input create-question-child"
          placeholder="Type question here"
          onChange={(event) => {
            setQuestionModel({
              ...questionModel,
              question: event.target.value,
            });
          }}
        ></input>
        {answerHandle.map((answer, index) => (
          <input
             key={`input-${index}`}
            className="answer-input create-question-child"
            placeholder={`Input answer ${index + 1}`}
            onChange={(event) => {
              const newArray = questionModel.answer;
              newArray[index] = event.target.value
              setQuestionModel({
                ...questionModel,
                answer: newArray,
              });
            }}
          ></input>
        ))}
        <input
          className="answer-input create-question-child"
          placeholder="Specify correct answer"
          onChange={(event) => {
            setQuestionModel({
              ...questionModel,
              rightAnswer: event.target.value,
            });
          }}
        ></input>
        <button
          className="create-question-button"
          onClick={() => {
            updateQuestions()
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminQuestionList;
