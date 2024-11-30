import { VStack, Text, HStack } from "@chakra-ui/react";
import { GameHistoryEntry } from "../../utils/types";

export interface GameHistoryProps {
  gameHistoryEntries: GameHistoryEntry[];
}
function GameHistory(props: GameHistoryProps): JSX.Element {
  const { gameHistoryEntries } = props;
  return (
    <VStack h={400} w={250} borderRadius={12} shadow={"lg"} {...props}>
      <Text fontWeight="bold" fontSize={24}>
        Game History
      </Text>
      <VStack>
        {gameHistoryEntries.map((entry, index) => (
          <HStack key={index} justifyContent="space-between">
            <Text>{entry.secretWord}</Text>
            <Text>
              <b>{entry.attemptCount}</b> attempt(s)
            </Text>
            <Text color={entry.isWin ? "green" : "red"} fontWeight="bold">
              {entry.isWin ? "WON" : "LOST"}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
}

export default GameHistory;
