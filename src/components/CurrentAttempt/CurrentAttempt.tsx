import { VStack, Text, HStack } from "@chakra-ui/react";
import Letter from "../Letter/Letter";

export interface CurrentAttemptProps {
  currentAttempt: string;
}
function CurrentAttempt(props: CurrentAttemptProps): JSX.Element {
  const { currentAttempt } = props;
  return (
    <VStack
      h={100}
      w={250}
      minW={250}
      borderRadius={12}
      shadow={"lg"}
      {...props}
    >
      <Text fontWeight="bold" fontSize={24}>
        Current attempt:{" "}
      </Text>
      <HStack>
        {currentAttempt.split("").map((letter, index) => (
          <Letter key={index} letter={letter} />
        ))}
      </HStack>
    </VStack>
  );
}

export default CurrentAttempt;
