import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AppState,
} from "react-native";
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from "../shared/themes/theme";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateStateByElapsedTime } from "../shared/helpers/UpdateStateByElapsedTime";

export const HomePage = () => {
  const navigation = useNavigation<TNavigationScreenProps>();

  const [appRunningState, setAppRunningState] = useState(AppState.currentState);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<
    "focus" | "short_break" | "long_break"
  >("focus");

  const [currentFocusCircleTime, setCurrentFocusCircleTime] = useState(25 * 60);
  const [currentShortBreakCircleTime, setCurrentShortBreakCircleTime] =
    useState(5 * 60);
  const [currentLongBreakCircleTime, setCurrentLongBreakCircleTime] = useState(
    15 * 60
  );

  const [counterCircleTime, setCounterCircleTime] = useState(25 * 60);

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        AsyncStorage.getItem("FOCUS_PERIOD"),
        AsyncStorage.getItem("SHORT_BREAK_PERIOD"),
        AsyncStorage.getItem("LONG_BREAK_PERIOD"),
      ]).then(([focusPeriod, shortBreakPeriod, longBreakPeriod]) => {
        setCurrentFocusCircleTime(JSON.parse(focusPeriod || "25") * 60);
        setCurrentShortBreakCircleTime(
          JSON.parse(shortBreakPeriod || "5") * 60
        );
        setCurrentLongBreakCircleTime(JSON.parse(longBreakPeriod || "15") * 60);
      });
    }, [])
  );

  useEffect(() => {
    const listener = AppState.addEventListener("change", setAppRunningState);

    return () => listener.remove();
  }, []);

  const isShouldUpdate = useRef(true);
  useEffect(() => {
    if (isShouldUpdate.current) {
      isShouldUpdate.current = false;

      AsyncStorage.getItem("APP_STATE").then((value) => {
        const appState = JSON.parse(value || "null");
        if (!appState) return;

        const updatedAppState = updateStateByElapsedTime(appState);

        setCounterCircleTime(updatedAppState.counterCircleTime);
        setCurrentStatus(updatedAppState.currentStatus);
        setIsRunning(updatedAppState.isRunning);
        setIsPaused(updatedAppState.isPaused);
        setStep(updatedAppState.step);
      });
    }

    if (appRunningState === "background") isShouldUpdate.current = true;
  }, [appRunningState]);

  useEffect(() => {
    if (!isRunning || isPaused) return;
    const ref = setInterval(() => {
      setCounterCircleTime((old) => (old <= 0 ? old : old - 1));
    }, 1000);

    return () => clearInterval(ref);
  }, [isRunning, isPaused]);

  useEffect(() => {
    switch (currentStatus) {
      case "focus": {
        if (counterCircleTime > 0) break;

        if (step < 4) {
          setStep((old) => (old + 1) as 1);
          setCurrentStatus("short_break");
          setCounterCircleTime(currentShortBreakCircleTime);
        } else {
          setStep(1);
          setCurrentStatus("long_break");
          setCounterCircleTime(currentLongBreakCircleTime);
        }

        break;
      }
      case "short_break":
      case "long_break": {
        if (counterCircleTime <= 0) {
          setCurrentStatus("focus");
          setCounterCircleTime(currentFocusCircleTime);
        }
        break;
      }
      default:
        break;
    }
  }, [
    counterCircleTime,
    currentStatus,
    step,
    isRunning,
    isPaused,
    currentFocusCircleTime,
    currentShortBreakCircleTime,
    currentLongBreakCircleTime,
  ]);

  const handleStart = () => {
    setIsRunning(true);

    AsyncStorage.setItem(
      "APP_STATE",
      JSON.stringify({
        time: Date.now(),
        counterCircleTime,
        currentStatus,
        step,
        isRunning: true,
        isPaused,
        currentFocusCircleTime,
        currentShortBreakCircleTime,
        currentLongBreakCircleTime,
      })
    );
  };

  const handlePause = () => {
    setIsPaused(true);

    AsyncStorage.setItem(
      "APP_STATE",
      JSON.stringify({
        time: Date.now(),
        counterCircleTime,
        currentStatus,
        step,
        isRunning,
        isPaused: true,
        currentFocusCircleTime,
        currentShortBreakCircleTime,
        currentLongBreakCircleTime,
      })
    );
  };

  const handleStop = () => {
    setStep(1);
    setCurrentStatus("focus");
    setIsRunning(false);
    setIsPaused(false);
    setCounterCircleTime(currentFocusCircleTime);

    AsyncStorage.setItem(
      "APP_STATE",
      JSON.stringify({
        counterCircleTime: currentFocusCircleTime,
        currentStatus: "focus",
        step: 1,
        isRunning: false,
        isPaused: false,
        time: Date.now(),
        currentFocusCircleTime,
        currentShortBreakCircleTime,
        currentLongBreakCircleTime,
      })
    );
  };

  const handleContinue = () => {
    setIsPaused(false);

    AsyncStorage.setItem(
      "APP_STATE",
      JSON.stringify({
        time: Date.now(),
        counterCircleTime,
        currentStatus,
        step,
        isRunning,
        isPaused: false,
        currentFocusCircleTime,
        currentShortBreakCircleTime,
        currentLongBreakCircleTime,
      })
    );
  };

  const timeProgress = useMemo(() => {
    switch (currentStatus) {
      case "focus":
        return 100 - (counterCircleTime / currentFocusCircleTime) * 100;
      case "short_break":
        return 100 - (counterCircleTime / currentShortBreakCircleTime) * 100;
      case "long_break":
        return 100 - (counterCircleTime / currentLongBreakCircleTime) * 100;

      default:
        return 0;
    }
  }, [
    currentStatus,
    counterCircleTime,
    currentFocusCircleTime,
    currentShortBreakCircleTime,
    currentLongBreakCircleTime,
  ]);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
      disabled={isRunning}
        style={{...styles.settingsButton, opacity: isRunning ? 0 : 1}}
        onPress={() => navigation.navigate("Settings")}
      >
        <MaterialIcons name="settings" size={32} color={Theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.titleGroup}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Pomodoro</Text>
          </View>

          <View style={styles.stateContainer}>
            {!isRunning && !isPaused && (
              <Text style={styles.stateText}>Vamos nos concentrar?</Text>
            )}
            {isRunning && currentStatus === "focus" && !isPaused && (
              <Text style={styles.stateText}>Hora de se concentrar!</Text>
            )}
            {isRunning && !isPaused && currentStatus === "short_break" && (
              <Text style={styles.stateText}>Pausa curta</Text>
            )}
            {isRunning && !isPaused && currentStatus === "long_break" && (
              <Text style={styles.stateText}>Pausa longa</Text>
            )}
            {isPaused && (
              <Text style={styles.stateText}>Cronômetro em pausa</Text>
            )}
          </View>

          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={160}
              width={7}
              fill={timeProgress}
              rotation={0}
              tintColor={Theme.colors.divider}
              backgroundColor={Theme.colors.primary}
              children={() => (
                <Text style={styles.progressText}>
                  {Math.floor(counterCircleTime / 60)
                    .toString()
                    .padStart(2, "0")}
                  :{(counterCircleTime % 60).toString().padStart(2, "0")}
                </Text>
              )}
            />
          </View>
        </View>

        {!isRunning && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText} onPress={handleStart}>
                Iniciar
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isRunning && !isPaused && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handlePause}
            >
              <Text style={styles.primaryButtonText}>Pausar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleStop}
            >
              <Text style={styles.secondaryButtonText}>Parar</Text>
            </TouchableOpacity>
          </View>
        )}

        {isRunning && isPaused && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
            >
              <Text style={styles.primaryButtonText}>Continuar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleStop}
            >
              <Text style={styles.secondaryButtonText}>Parar</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.pomodoroContainer}>
          <Text style={styles.pomodoroText}>Pomodoros:</Text>

          <View
            style={
              step >= 2 || currentStatus === "long_break"
                ? styles.pomodoroIndicatorComplete
                : styles.pomodoroIndicator
            }
          />
          <View
            style={
              step >= 3 || currentStatus === "long_break"
                ? styles.pomodoroIndicatorComplete
                : styles.pomodoroIndicator
            }
          />
          <View
            style={
              step >= 4 || currentStatus === "long_break"
                ? styles.pomodoroIndicatorComplete
                : styles.pomodoroIndicator
            }
          />
          <View
            style={
              currentStatus === "long_break"
                ? styles.pomodoroIndicatorComplete
                : styles.pomodoroIndicator
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    gap: 36,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    alignSelf: "flex-end",
  },
  titleGroup: {
    gap: 24,
  },
  primaryButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 55,
  },
  primaryButtonText: {
    color: Theme.colors.text,
    fontFamily: Theme.fonts.interRegular,
    fontSize: Theme.fontSize.body,
  },
  secondaryButton: {
    borderColor: Theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 55,
    borderWidth: 2,
  },
  secondaryButtonText: {
    color: Theme.colors.text,
    fontFamily: Theme.fonts.interRegular,
    fontSize: Theme.fontSize.body,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  progressContainer: {
    alignItems: "center",
  },
  progressText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSize.title,
    fontFamily: Theme.fonts.interBold,
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSize.title,
    fontFamily: Theme.fonts.interBold,
  },
  stateContainer: {
    alignItems: "center",
  },
  stateText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSize.body,
    fontFamily: Theme.fonts.interRegular,
  },
  pomodoroContainer: {
    gap: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pomodoroText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSize.body,
    fontFamily: Theme.fonts.interRegular,
  },
  pomodoroIndicatorComplete: {
    width: 20,
    height: 20,
    borderRadius: "100%",
    backgroundColor: Theme.colors.primary,
  },
  pomodoroIndicator: {
    width: 20,
    height: 20,
    borderRadius: "100%",
    backgroundColor: Theme.colors.divider,
  },
});
