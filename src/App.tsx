import { useEffect, useState, useCallback } from "react";
import { Container, HStack, VStack } from "@chakra-ui/react";
import { ATTEMPT_LIMIT, SECRET_WORDS, WORD_LENGTH } from "./utils/const";
import AttemptCounter from "./components/AttemptCounter/AttemptCounter";
import Keyboard from "./components/Keyboard/Keyboard";
import GameHistory from "./components/GameHistory/GameHistory";
import RestartButton from "./components/RestartButton/RestartButton";
import AttemptedWords from "./components/AttemptedWords/AttemptedWords";
import CurrentAttempt from "./components/CurrentAttempt/CurrentAttempt";
import GameOverBox from "./components/GameOverBox/GameOverBox";
import { GameHistoryEntry } from "./utils/types";

function App() {
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [attemptedWords, setAttemptedWords] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<string>("");
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [secretWord, setSecretWord] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [gameHistoryEntries, setGameHistoryEntries] = useState<
    GameHistoryEntry[]
  >([]);

  const updateUsedLetters = useCallback((currentAttempt: string) => {
    setUsedLetters((prev) => {
      const newSet = new Set(prev);
      currentAttempt.split("").forEach((letter) => {
        newSet.add(letter);
      });
      return newSet;
    });
  }, []);

  const handleEnterKeyPress = useCallback(() => {
    if (currentAttempt.length === WORD_LENGTH) {
      setAttemptedWords((prev) => [...prev, currentAttempt]);

      if (currentAttempt === secretWord) {
        setIsGameOver(true);
        setIsWin(true);
        setGameHistoryEntries((prev) => [
          ...prev,
          { attemptCount: attemptCount + 1, isWin: true, secretWord },
        ]);
      } else {
        if (attemptCount === ATTEMPT_LIMIT - 1) {
          setIsGameOver(true);
          setIsWin(false);
          setGameHistoryEntries((prev) => [
            ...prev,
            { attemptCount: attemptCount + 1, isWin: false, secretWord },
          ]);
        }
      }

      updateUsedLetters(currentAttempt);
      setAttemptCount((prev) => prev + 1);
      setCurrentAttempt("");
    }
  }, [currentAttempt, secretWord, attemptCount, updateUsedLetters]);

  const handleBackspaceKeyPress = useCallback(() => {
    if (currentAttempt.length > 0) {
      setCurrentAttempt((prev) => prev.slice(0, -1));
    }
  }, [currentAttempt]);

  const handleLetterKeyPress = useCallback(
    (letter: string) => {
      if (currentAttempt.length < WORD_LENGTH) {
        setCurrentAttempt((prev) => prev.concat(letter));
      }
    },
    [currentAttempt.length]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!isGameOver) {
        if (/^[a-z]$/.test(event.key)) {
          handleLetterKeyPress(event.key.toUpperCase());
        }

        if (event.key === "Enter") {
          handleEnterKeyPress();
        }
      }

      if (event.key === "Backspace") {
        handleBackspaceKeyPress();
      }
    },
    [
      isGameOver,
      handleLetterKeyPress,
      handleEnterKeyPress,
      handleBackspaceKeyPress,
    ]
  );

  useEffect(() => {
    setSecretWord(
      SECRET_WORDS[Math.floor(Math.random() * SECRET_WORDS.length)]
    );
    setIsWin(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    currentAttempt,
    attemptedWords,
    secretWord,
    attemptCount,
    isGameOver,
    handleKeyPress,
  ]);

  const restartGame = () => {
    setSecretWord(
      SECRET_WORDS[Math.floor(Math.random() * SECRET_WORDS.length)]
    );
    setUsedLetters(new Set());
    setAttemptedWords([]);
    setCurrentAttempt("");
    setAttemptCount(0);
    setIsGameOver(false);
    setIsWin(false);
    document.getElementById("restartButton")?.blur();
    document.getElementById("restartButtonLose")?.blur();
    document.getElementById("restartButtonWin")?.blur();
  };

  return (
    <Container
      fontFamily={"Faculty Glyphic, sans-serif"}
      p={4}
      justifyItems={"center"}
    >
      <VStack>
        <AttemptCounter attemptCount={attemptCount} />
        <HStack alignItems={"start"}>
          <CurrentAttempt currentAttempt={currentAttempt} />
          <AttemptedWords
            attemptedWords={attemptedWords}
            secretWord={secretWord}
          />
          <GameHistory gameHistoryEntries={gameHistoryEntries} />
        </HStack>
        <Keyboard
          usedLetters={usedLetters}
          onEnterKeyPress={handleEnterKeyPress}
          onBackspaceKeyPress={handleBackspaceKeyPress}
          onLetterKeyPress={handleLetterKeyPress}
        />
        <RestartButton isGameOver={isGameOver} restartGame={restartGame} />
      </VStack>
      {isGameOver && isWin && (
        <GameOverBox isWin={true} secretWord={secretWord} />
      )}
      {isGameOver && !isWin && (
        <GameOverBox isWin={false} secretWord={secretWord} />
      )}
    </Container>
  );
}

export default App;
