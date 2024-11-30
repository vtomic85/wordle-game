import { Button, HStack, VStack } from "@chakra-ui/react";
import KeyboardButton from "../KeyboardButton/KeyboardButton";

export interface KeyboardProps {
  usedLetters: Set<string>;
  onEnterKeyPress: () => void;
  onBackspaceKeyPress: () => void;
  onLetterKeyPress: (letter: string) => void;
}

function Keyboard(props: KeyboardProps): JSX.Element {
  const {
    usedLetters,
    onEnterKeyPress,
    onBackspaceKeyPress,
    onLetterKeyPress,
  } = props;
  return (
    <VStack {...props}>
      <HStack>
        {Array.from("QWERTYUIOP").map((letter, index) => (
          <KeyboardButton
            key={index}
            letter={letter}
            usedLetters={usedLetters}
            index={index}
            onLetterKeyPress={() => onLetterKeyPress(letter)}
          />
        ))}
      </HStack>
      <HStack>
        {Array.from("ASDFGHJKL").map((letter, index) => (
          <KeyboardButton
            key={index}
            letter={letter}
            usedLetters={usedLetters}
            index={index}
            onLetterKeyPress={() => onLetterKeyPress(letter)}
          />
        ))}
        <Button onClick={onBackspaceKeyPress}>&larr;</Button>
      </HStack>
      <HStack>
        {Array.from("ZXCVBNM").map((letter, index) => (
          <KeyboardButton
            key={index}
            letter={letter}
            usedLetters={usedLetters}
            index={index}
            onLetterKeyPress={() => onLetterKeyPress(letter)}
          />
        ))}
        <Button onClick={onEnterKeyPress}>Enter</Button>
      </HStack>
    </VStack>
  );
}

export default Keyboard;
