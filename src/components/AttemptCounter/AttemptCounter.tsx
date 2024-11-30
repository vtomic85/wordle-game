import { HStack, Text } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { ATTEMPT_LIMIT } from "../../utils/const";

export interface AttemptCounterProps {
  attemptCount: number;
}

function AttemptCounter(props: AttemptCounterProps): JSX.Element {
  const { attemptCount } = props;
  return (
    <HStack
      borderRadius={12}
      w="500px"
      shadow={"lg"}
      justifyContent={"center"}
      {...props}
    >
      <Text fontWeight="bold" fontSize={24}>
        Attempts left:
      </Text>
      {Array.from({ length: attemptCount }).map((_, index) => (
        <FaCircle color="red" key={index} />
      ))}
      {Array.from({ length: ATTEMPT_LIMIT - attemptCount }).map((_, index) => (
        <FaCircle color="grey" key={index} />
      ))}
    </HStack>
  );
}

export default AttemptCounter;
