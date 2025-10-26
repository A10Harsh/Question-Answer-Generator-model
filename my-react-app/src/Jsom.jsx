import React, { useState, useEffect } from 'react';

// Your JSON data
const jsonData = [
  {
    "question": "Who were the prominent rulers of the Mauryan Empire mentioned in the text?",
    "answer": "Chandragupta Maurya and Ashoka"
  },
  {
    "question": "What was the capital of the Mauryan Empire?",
    "answer": "Pataliputra"
  },
  {
    "question": "What is the significance of Ashoka's Edicts?",
    "answer": "They helped spread his policies of peace and Buddhism."
  }
];

const Jsom = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Extract questions and answers separately but keep them in sync
    const extractedQuestions = jsonData.map(item => item.question);
    const extractedAnswers = jsonData.map(item => item.answer);

    setQuestions(extractedQuestions);
    setAnswers(extractedAnswers);
  }, []);

  return (
    <div>
      <h1>Questions and Answers</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <strong>Q: </strong>{question}
            <br />
            <strong>A: </strong>{answers[index]}
            <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};
 

export default Jsom;
