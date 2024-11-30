import { Button } from "@chakra-ui/react";

export interface RestartButtonProps {
  isGameOver: boolean;
  restartGame: () => void;
}

function RestartButton(props: RestartButtonProps): JSX.Element {
  const { isGameOver, restartGame } = props;
  return (
    <Button
      id="restartButton"
      onClick={restartGame}
      size={"2xl"}
      bgColor="red"
      _hover={{ border: "2px solid black" }}
      m={2}
      {...props}
    >
      {isGameOver ? "New Game" : "Restart"}
    </Button>
  );
}

export default RestartButton;
