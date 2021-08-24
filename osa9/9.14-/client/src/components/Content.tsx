import React from "react";

const Content = ({
  name,
  excerciseCount,
}: {
  name: string;
  excerciseCount: number;
}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{excerciseCount}</p>
    </div>
  );
};

export default Content;
