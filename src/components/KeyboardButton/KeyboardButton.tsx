import { Button } from "@chakra-ui/react";

export interface KeyboardButtonProps {
  letter: string;
  usedLetters: Set<string>;
  index: number;
  onLetterKeyPress: (letter: string) => void;
}

function KeyboardButton(props: KeyboardButtonProps) {
  const { letter, usedLetters, index, onLetterKeyPress } = props;
  return (
    <Button
      key={index}
      bgColor={usedLetters.has(letter) ? "gray" : "white"}
      color="black"
      fontWeight="bold"
      cursor="pointer"
      shadow={"md"}
      _hover={{ bgColor: "whiteAlpha.500" }}
      onClick={() => onLetterKeyPress(letter)}
      onFocus={(e) => e.target.blur()}
      {...props}
    >
      {letter}
    </Button>
  );
}

export default KeyboardButton;
