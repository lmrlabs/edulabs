import React, { use, useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Muted } from "./ui/typography";

interface CourseFlashcardProps {
  course: String;
  unit: Number;
}

const flashcards = [
  // AP Physics Kinematics
  [
    { front: "Displacement formula", back: "x = x0 + v0t + (1/2)at^2" },
    { front: "Velocity formula", back: "v = v0 + at" },
    { front: "Average velocity", back: "v_avg = (v + v0) / 2" },
    { front: "Acceleration formula", back: "a = Δv / Δt" },
    { front: "Distance formula", back: "d = sqrt(x^2 + y^2)" },
  ],
  // AP Physics Dynamics
  [
    { front: "Newton's Second Law", back: "F = ma" },
    { front: "Frictional force", back: "F_friction = μ * N" },
    { front: "Gravitational force", back: "F_gravity = mg" },
    { front: "Net force formula", back: "F_net = ΣF" },
    { front: "Newton's Third Law", back: "F_AonB = - F_BonA" },
  ],
  // AP Physics Circular Motion
  [
    { front: "Centripetal Acceleration", back: "a = v^2 / r" },
    { front: "Centripetal Force", back: "F = m * v^2 / r" },
    { front: "Frequency formula", back: "f = 1 / T" },
    { front: "Angular velocity", back: "ω = 2πf" },
    { front: "Tangential velocity", back: "v = ω * r" },
  ],
  // AP Physics Energy
  [
    { front: "Work-Energy Principle", back: "W = ΔK" },
    { front: "Kinetic energy formula", back: "K = (1/2)mv^2" },
    { front: "Potential energy (gravity)", back: "U = mgh" },
    {
      front: "Conservation of Energy",
      back: "K_initial + U_initial = K_final + U_final",
    },
    { front: "Power formula", back: "P = W / t" },
  ],
  [
    {
      front: "What are the four major elements that make up the human body?",
      back: "Carbon, Hydrogen, Oxygen, Nitrogen",
    },
    {
      front: "What is an isotope?",
      back: "Atoms of the same element with different numbers of neutrons.",
    },
    {
      front: "What is the importance of a hydrogen bond in biological systems?",
      back: "Hydrogen bonds provide the structure and shape to many biological molecules like DNA and proteins.",
    },
    {
      front: "What is the difference between a covalent and an ionic bond?",
      back: "Covalent bonds involve the sharing of electrons, while ionic bonds involve the transfer of electrons.",
    },
    {
      front: "Define pH.",
      back: "A measure of the concentration of H+ ions in a solution, indicating its acidity or alkalinity.",
    },
  ],
  [
    // Chemistry of Life
    {
      front: 'What are the four major elements that make up the human body?',
      back: 'Carbon, Hydrogen, Oxygen, Nitrogen'
    },
    {
      front: 'Define pH.',
      back: 'A measure of the concentration of H+ ions in a solution, indicating its acidity or alkalinity.'
    },
    // Cell Structure and Function
    {
      front: 'What is the function of the mitochondria?',
      back: 'Powerhouse of the cell; site of ATP production.'
    },
    {
      front: 'What is the role of the ribosome?',
      back: 'Site of protein synthesis.'
    },
    // Cellular Energetics
    {
      front: 'What is the equation for cellular respiration?',
      back: 'C6H12O6 + 6O2 -> 6CO2 + 6H2O + energy'
    },
    {
      front: 'What is the primary purpose of photosynthesis?',
      back: 'To convert solar energy into chemical energy and then store that chemical energy for future use.'
    },
    // Genetics and Heredity
    {
      front: 'What is a gene?',
      back: 'A segment of DNA that codes for a specific trait.'
    },
    {
      front: 'Define homozygous.',
      back: 'Having two identical alleles for a particular gene.'
    },
    // Natural Selection
    {
      front: 'Who is considered the father of the theory of natural selection?',
      back: 'Charles Darwin'
    },
    {
      front: 'What is the survival of the fittest?',
      back: 'The idea that species adapt and change by natural selection with the best suited mutations becoming dominant.'
    }
  ],
];

const CourseFlashcard: React.FC<CourseFlashcardProps> = ({ course, unit }) => {
  const [isFlipped, setIsFlipped] = useState<number | null>(null);

  let courseFlashcards = []!;
  if (course === "ap-physics-1" && unit == 1) {
    courseFlashcards = flashcards[0];
  } else if (course === "ap-physics-1" && unit == 2) {
    courseFlashcards = flashcards[1];
  } else if (course === "ap-physics-1" && unit == 3) {
    courseFlashcards = flashcards[2];
  } else if (course === "ap-physics-1" && unit == 4) {
    courseFlashcards = flashcards[3];
  } else if (course === "ap-biology" && unit == 1) {
    courseFlashcards = flashcards[4];
  } else {
    courseFlashcards = flashcards[5];
  }

  console.log(courseFlashcards);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [unit]);

  const handleNext = () => {
    if (currentCardIndex < courseFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const currentCard = courseFlashcards[currentCardIndex];

  return (
    <>
      <button onClick={handlePrev} style={{ fontSize: "24px" }}>
        ←
      </button>{" "}
      <button onClick={handleNext} style={{ fontSize: "24px" }}>
        →
      </button>
      <ReactCardFlip
        isFlipped={isFlipped === currentCardIndex}
        flipDirection="vertical"
      >
        <Card
          className="cursor-pointer relative h-64 max-w-2xl"
          onClick={(e) => {
            e.preventDefault();
            setIsFlipped(currentCardIndex);
          }}
        >
          <CardHeader className="flex-row justify-between">
            <Muted>front · click to flip</Muted>
          </CardHeader>
          <CardContent className="absolute inset-0 pt-6 flex justify-center items-center h-full">
            <p>{currentCard.front}</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer relative h-64 max-w-2xl"
          onClick={(e) => {
            e.preventDefault();
            setIsFlipped(null);
          }}
        >
          <CardHeader className="flex-row justify-between">
            <Muted>back · click to flip</Muted>
          </CardHeader>
          <CardContent className="absolute inset-0 pt-6 flex justify-center items-center h-full">
            <p>{currentCard.back}</p>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </>
  );
};

export default CourseFlashcard;
