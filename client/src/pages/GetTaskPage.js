import React from "react";
// import { useForm } from "react-hook-form";
import NavTabs from "../components/NavBar";
import Wrapper from "../components/Wrapper";


// const options = ["Home repairs", "Shopping", "Baby sitting", "Pet sitting"];



const GetTaskPage = () => {
  return (
    <div>
      <NavTabs />
      <Wrapper>
        <h1>THIS IS WELCOME - GET A TASK PAGE</h1>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
        <select name="category" ref={register}>
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form> */}
    </Wrapper>
    </div>
  );
};

export default GetTaskPage;
