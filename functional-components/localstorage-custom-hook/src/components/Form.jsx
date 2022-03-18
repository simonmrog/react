import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
      />
      <input type="submit" value="Submit"></input>
    </form>
  );
};

export default Form;
