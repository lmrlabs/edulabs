import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Muted } from "./ui/typography";

interface CourseFlashcardProps {}

const CourseFlashcard: React.FC<CourseFlashcardProps> = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Card
        className="cursor-pointer relative h-64 max-w-2xl"
        onClick={(e) => {
          e.preventDefault();
          setIsFlipped(true);
        }}
      >
        <CardHeader className="flex-row justify-between">
          <Muted>front · click to flip</Muted>
          {/* <Button size="icon" variant="ghost">
                <Pencil className="h-4 w-4" />
              </Button> */}
        </CardHeader>
        <CardContent className="absolute inset-0 pt-6 flex justify-center items-center h-full">
          <p>quotient rule for p(x)/q(x)</p>
        </CardContent>
      </Card>
      <Card
        className="cursor-pointer relative h-64 max-w-2xl"
        onClick={(e) => {
          e.preventDefault();
          setIsFlipped(false);
        }}
      >
        <CardHeader className="flex-row justify-between">
          <Muted>back · click to flip</Muted>
        </CardHeader>
        <CardContent className="absolute inset-0 pt-6 flex justify-center items-center h-full">
          <p>(q(x)p'(x) - p(x)q'(x))/q(x)^2</p>
        </CardContent>
      </Card>
    </ReactCardFlip>
  );
};

export default CourseFlashcard;
