import { Text, VStack } from "@chakra-ui/react";
import AttemptedWord from "./AttemptedWord/AttemptedWord";

export interface AttemptedWordsProps {
  attemptedWords: string[];
  secretWord: string;
}
function AttemptedWords(props: AttemptedWordsProps): JSX.Element {
  const { attemptedWords, secretWord } = props;
  return (
    <VStack
      h={400}
      borderRadius={12}
      shadow={"lg"}
      w={250}
      minW={250}
      {...props}
    >
      <Text fontWeight="bold" fontSize={24}>
        Attempted words:
      </Text>
      {attemptedWords.map((word, index) => (
        <AttemptedWord key={index} guess={word} secretWord={secretWord} />
      ))}
    </VStack>
  );
}

export default AttemptedWords;
