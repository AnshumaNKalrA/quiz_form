import React, { useState } from "react";
import { Upload } from "lucide-react";
import "./styles.css"; // Import the CSS file

export default function QuizForm() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), type: "mcq", text: "", options: ["", "", "", ""], image: null, weightage: "1" },
    ]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        updateQuestion(id, "image", reader.result);
      };
    }
  };

  const submitQuiz = async () => {
    try {
      const response = await fetch("http://localhost:3002", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questions }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }
      
      alert("Quiz Submitted Successfully!");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Error submitting quiz. Check console for details.");
    }
  };

  return (
    <div className="container">
      <h1>Create a Quiz</h1>
      <button className="button" onClick={addQuestion}>+ Add Question</button>

      {questions.map((q, index) => (
        <div key={q.id} className="card">
          <input
            className="input"
            placeholder={`Question ${index + 1}`}
            value={q.text}
            onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
          />

          <select
            className="select"
            onChange={(e) => updateQuestion(q.id, "type", e.target.value)}
            value={q.type}
          >
            <option value="mcq">Multiple Choice</option>
            <option value="text">Subjective</option>
          </select>

          {q.type === "mcq" && (
            <div>
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  className="input"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...q.options];
                    newOptions[i] = e.target.value;
                    updateQuestion(q.id, "options", newOptions);
                  }}
                />
              ))}
            </div>
          )}

          <input
            type="number"
            className="input"
            placeholder="Weightage"
            value={q.weightage}
            onChange={(e) => updateQuestion(q.id, "weightage", e.target.value)}
          />

          <label>
            <Upload className="icon" /> Upload Image (Optional)
            <input type="file" onChange={(e) => handleImageUpload(q.id, e)} />
          </label>

          {q.image && <p>{q.image.name}</p>}
        </div>
      ))}

      {questions.length > 0 && <button className="button" onClick={submitQuiz}>Submit Quiz</button>}
    </div>
  );
}
