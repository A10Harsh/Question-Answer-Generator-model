import React, { useState, useEffect } from 'react';
import './App.css';  // Import a separate CSS file for styles
import './ChatApp.css'; 
import Skeleton from 'react-loading-skeleton';
import {motion} from 'framer-motion';

function App() {
  const [message, setMessage] =useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.5);
  const [max_tokens, setMaxTokens] = useState();   // Maximum number of tokens to generate
  const [quesNumber, setQuesNumber] = useState(""); // number of question
  const [questype, setQuesType] = useState(''); // type of question
  const [elements, setElements] = useState([]); // State to store an array of elements while messaging
  const [airesponse, setAIResponse] = useState([]); // State to store an array of elements while messaging
  const [queslevel,setqueslevel] = useState(''); // level of question 
  const [mcqoption, setmcqoption] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);







  const handleSubmit = async (e) => { // Handle form submission
    e.preventDefault();

    let countWord = userInput.trim().split(/\s+/).filter(Boolean).length;

    if (countWord <= 100) {  // Limit to 100 words
      alert("Please increase paragraph input to min 100 words.");
      return;
    }

    if (queslevel === '') { 
      alert("Please select the level of question.");
    return;}
    if (questype === '') {  
      alert("Please select the type of question.");
    return;}  



    if (!userInput.trim()) return;  // Don't send empty input
    
    setLoading(true);
    
    // Send user input to Flask API via POST request
    try {
      const response = await fetch('http://localhost:5000/api', { // Flask API endpoint
        method: 'POST',
        headers: { // Send additional headers
          'Content-Type': 'application/json',
          'temperature': temperature,
          'max_tokens': max_tokens,          
        },
        body: JSON.stringify({ message: userInput,
          quesNumber: quesNumber,
          questype: questype,
          queslevel: queslevel
          
         }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setAIResponse(data.response);
      } else {
        const errorData = await response.json();
        setAIResponse(errorData.error || 'Error occurred');
      }
    } catch (error) {
      alert('Error occurred while fetching response. Please try again');
      console.error(error);
      setAIResponse([]);
    }
    setLoading(false);
    setUserInput("")
    setQuesNumber('')
    setQuesType('')
    setqueslevel('')

  
  // Add user input to the message container
  // setElements(prevElements => [
  //   ...prevElements,
  //   <div key={prevElements.length} className="new-element">
  //     <p>{userInput}</p>
  //   </div>
  // ]);

  // // Add AI response to the message container
  // setAIResponse(prevAIResponse => [
  //   ...prevAIResponse,
  //   <div key={prevAIResponse.length} className="new-element">
  //     <p>{message}</p>
  //   </div>
  // ]);

     // Add the new element to the list
  


  // Simulating sending a message
 


   
   
  };

  



  // extracting the question and answer
  useEffect(() => {
    // Extract questions and answers separately but keep them in sync
    const extractedQuestions = airesponse.map(item => item.question);
    const extractedAnswers = airesponse.map(item => item.answer);
    const extracteoption = airesponse.map(item => item.options )

    setQuestions(extractedQuestions);
    setAnswers(extractedAnswers);
    setmcqoption(extracteoption)
    console.log(questions);
    console.log(answers)
  }, [airesponse]);

  


  // range input value limited to 0.1 to 1.0
  const handleTemperatureChange = (e) => {
    if (e.target.value < 0.1) {
      setTemperature(0.1);
    } else if (e.target.value > 1.0) {
      setTemperature(1.0);
    } else {
      setTemperature(e.target.value);
    }}

  






  return (

    
    <div className="app-container">
      <header>
        <h1>Question Answer Generator</h1>
      </header>
      



<main>   
  


{loading && <div className="loading-message">Loading...</div>}      


{/* {airesponse && ( // Display the AI response old code without chatting
  <div className="response-container">
    <h3 className="response-title">AI Response:</h3>
    <p className="response-message">{airesponse}</p>
  </div>
)} */}





 

<div className='response-message'>
      <h3>{}</h3>
      
      <ol>      
      {questions.map((question, index) => (
        <motion.li
        key={index}
        initial={{ opacity: 0,  }}
        animate={{ opacity: 1,  }}
        transition={{ duration: 0.8, delay: index * 1.1 }}>
          <strong>Ques: </strong>{question}
          <br />
          <ul>
            {mcqoption[index] && mcqoption[index].length > 0 && (
              mcqoption[index].map((option, optIndex) => (
                <li key={optIndex}>
                  <strong>{String.fromCharCode(65 + optIndex)}. </strong>{option}
                </li>
              ))
            )}
          </ul>
          <br />
          <strong>Ans: </strong>{answers[index]}
          <br />
          <hr />
        </motion.li>
      ))}
    </ol>
    </div>

  

</main>


<footer>
<form onSubmit={handleSubmit} className="input-form">

       {/* <label htmlFor='userInput'>Ask me something...</label> */}
        <input
          type="text"
          id='userInput'
          placeholder="Generate Question"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="input-field"
        />
       <br/>
          

         
          {/* <h3>Question Type</h3> */}
          <select name="questype"
           value={questype}
           onChange={(e) => setQuesType(e.target.value)}
           className="input-field-2">
            <option value="" disabled>Select Question Type</option>
            <option value="mcq">MCQ</option>
            <option value="trueFalse">True/False</option>
            <option value="shortAnswer">Theory Based </option>
            {/* <option value="longAnswer">Long Answer</option> */}
            {/* Add more options as needed */}
              </select>
            <select name="queslevel"
           value={queslevel}
           onChange={(e) => setqueslevel(e.target.value)}
           className="input-field-2">
            <option value="" disabled>Select Question Type</option>
            <option value="low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            {/* Add more options as needed */}


            
    </select>
    <input // Number of questions input
            type="number"
            placeholder="Number of Questions"
            value={quesNumber}
            onChange={(e) => setQuesNumber(e.target.value)}
            className="input-field-1"
            min={1}
            max={5}
          />
        
        
        <button type="submit" disabled={loading} className="submit-btn"></button>
      </form>

      </footer>


     
    </div>
  );
}

export default App;
