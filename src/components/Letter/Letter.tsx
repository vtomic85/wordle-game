import { Box } from "@chakra-ui/react";

export interface LetterProps {
  letter: string;
  used?: boolean;
  bgColor?: string;
  onClick?: () => void;
}

function Letter(props: LetterProps): JSX.Element {
  return (
    <Box
      w="40px"
      h="40px"
      border="1px solid black"
      borderRadius="8px"
      alignContent="center"
      textAlign="center"
      fontSize={24}
      fontWeight="bold"
      bgColor={props.bgColor}
      color="black"
      {...props}
    >
      {props.letter}
    </Box>
  );
}

export default Letter;
