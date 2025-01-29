import React from 'react';

function Question(props) {
  return (
    <div className="question-container">
      <p className="question-number">Question No.: {props.question.questionNo}</p>
      <p className="question-title">Problem: {props.question.questionTitle}</p>
      <ul className="options-list">
        <li>1. {props.question.option1}</li>
        <li>2. {props.question.option2}</li>
        <li>3. {props.question.option3}</li>
        <li>4. {props.question.option4}</li>
      </ul>
      <div className='group'>
      <p className="weightage">Weightage: {props.question.weightage}</p>
      <button className='delete-button'>Delete</button>
      </div>
      
      {props.question.image && <img src={props.question.image} alt="question" className="question-image" />}
      
    </div>
  );
}

export default Question;


// export default Question
