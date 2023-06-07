import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import {
  addResponse,
  clearResponses,
} from "../redux/features/modal/responsesSlice";
import { createCustomPlaylist } from "../redux/features/playlist/playlistAction";

const MusicTestModal = ({ isOpen, closeModal }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const dispatch = useDispatch();

  // questions for modal
  const questions = [
    {
      questionID: 1,
      questionText:
        "What element matters most to you when listening to a song?",
      answerOptions: [
        { answerText: "Lyrics" },
        { answerText: "Vocals" },
        { answerText: "Beat" },
      ],
    },
    {
      questionID: 2,
      questionText: "Who is your favorite artist out of the following?",
      answerOptions: [
        { answerText: "Taylor Swift" },
        { answerText: "BTS" },
        { answerText: "Morgan Wallen" },
        { answerText: "Lil Durk" },
      ],
    },
    {
      questionID: 3,
      questionText: "What is your favorite genre out of the following?",
      answerOptions: [
        { answerText: "Pop" },
        { answerText: "Rock" },
        { answerText: "Hip Hop" },
        { answerText: "K-Pop" },
      ],
    },
    {
      questionID: 4,
      questionText: "What is your least favorite genre out of the following?",
      answerOptions: [
        { answerText: "Pop" },
        { answerText: "Rock" },
        { answerText: "Hip Hop" },
        { answerText: "K-Pop" },
      ],
    },
  ];

  // function that handles data from answers into redux
  const handleAnswerOptionClick = (answerOption) => {
    setSelectedAnswer(answerOption); // update selected answer
    dispatch(addResponse(answerOption));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // reset selected answer when moving to the next question
      setResponses([...responses, answerOption]);
    } else {
      // dispatch action to redux
      // dispatch(selectGenreListId(answerOption));
      // close modal
      closeModal();
    }
  };

  //   if modal is closed, the first question will be displayed when modal is opened next
  const resetModal = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setSelectedAnswer(null);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        content: {
          color: "lightsteelblue",
          width: "50%",
          height: "20%",
          margin: "auto",
          color: "black",
        },
      }}
    >
      <div
        key={questions[currentQuestion].questionID}
        className="flex flex-col mx-auto"
      >
        <p>{questions[currentQuestion].questionText}</p>
        <div className="flex flex-row p-2">
          {questions[currentQuestion].answerOptions.map((answerOption) => (
            <button
              className={`${
                selectedAnswer === answerOption.answerText
                  ? "text-red-200 m-2"
                  : "p-2"
              }`}
              onClick={() => handleAnswerOptionClick(answerOption.answerText)}
            >
              {answerOption.answerText}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          resetModal();
          closeModal();
        }}
      >
        Close
      </button>
      {currentQuestion === questions.length - 1 ? (
        <button
          className="p-1 text-red-500 border-2 border-slate-400 bg-slate-300 m-2 "
          onClick={() => {
            const playlist = { songs: responses };
            dispatch(createCustomPlaylist(playlist));
            dispatch(clearResponses());
            closeModal();
          }}
        >
          Submit
        </button>
      ) : null}
    </ReactModal>
  );
};

export default MusicTestModal;
