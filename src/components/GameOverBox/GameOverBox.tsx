import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import Letter from "../Letter/Letter";

export interface GameOverBoxProps {
  isWin: boolean;
  secretWord: string;
}

function GameOverBox(props: GameOverBoxProps): JSX.Element {
  const { isWin, secretWord } = props;
  return (
    <Box
      borderRadius={12}
      border={"3px solid black"}
      bgGradient="to-t"
      gradientFrom={isWin ? "yellow.400" : "red.400"}
      gradientTo={isWin ? "green.200" : "yellow.200"}
      shadow={"2xl"}
      p={4}
      w="fit-content"
      alignSelf={"center"}
      position={"absolute"}
      verticalAlign={"middle"}
      {...props}
    >
      <VStack>
        <Text fontWeight="bold" fontSize={24}>
          Secret word:
        </Text>
        <HStack>
          {secretWord.split("").map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              bgColor={isWin ? "green" : "red"}
            />
          ))}
        </HStack>
        <Text fontWeight="bold" fontSize={24}>
          {isWin ? "CONGRATULATIONS!" : "Better luck next time!"}
        </Text>
      </VStack>
    </Box>
  );
}

export default GameOverBox;
