import { HStack } from "@chakra-ui/react";
import Letter from "../../Letter/Letter";

export interface AttemptedWordProps {
  guess: string;
  secretWord: string;
}

function AttemptedWord(props: AttemptedWordProps): JSX.Element {
  const { guess, secretWord } = props;

  const generateLetterColors = (guess: string, secretWord: string) => {
    const secretArr = secretWord.split("");
    const colors = Array(guess.length).fill("gray");

    // First pass: Check for correct positions (green)
    guess.split("").forEach((letter, index) => {
      if (letter === secretArr[index]) {
        colors[index] = "green";
        secretArr[index] = ""; // Mark as used
      }
    });

    // Second pass: Check for wrong positions (yellow)
    guess.split("").forEach((letter, index) => {
      if (colors[index] === "gray" && secretArr.includes(letter)) {
        colors[index] = "yellow";
        secretArr[secretArr.indexOf(letter)] = ""; // Mark as used
      }
    });

    return colors;
  };

  const colors = generateLetterColors(guess, secretWord);

  return (
    <HStack gap={1} p={1} {...props}>
      {props.guess.split("").map((letter, index) => (
        <Letter key={index} letter={letter} bgColor={colors[index]} />
      ))}
    </HStack>
  );
}

export default AttemptedWord;
