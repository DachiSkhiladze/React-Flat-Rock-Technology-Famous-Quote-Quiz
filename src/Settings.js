import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Settings({type, setType}) {
  const  handleChange = (value) => {
    setType(value);
  }
  return (
    <div>
        <h1>Settings</h1>
        <h1>Choose The Mode</h1>
        <div onChange={handleChange.bind(this)}>
        <Link to="/Quiz"><button onClick={() => handleChange('BinaryQuestions')} className="insertBtn" value="BinaryQuestions" name="gender">Yes/No Questions</button></Link>
        <Link to="/Quiz"> <button onClick={() => handleChange('MultipleChoiceQuestions')} className="insertBtn" value="MultipleChoiceQuestions" name="gender">Multiple Choice Questions</button></Link>
        </div>
    </div>
  );
}

export default Settings;