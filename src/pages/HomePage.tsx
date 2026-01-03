import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from "../shared/themes/theme";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialIcons } from "@expo/vector-icons";

export const HomePage = () => {
  const navigation = useNavigation<TNavigationScreenProps>();

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.settingsButton}
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
            <Text style={styles.stateText}>Hora de se concentrar!</Text>
            {/* <Text style={styles.stateText}>Pausa curta</Text>
          <Text style={styles.stateText}>Pausa longa</Text>
          <Text style={styles.stateText}>Cronômetro em pausa</Text> */}
          </View>

          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={160}
              width={7}
              fill={0}
              rotation={0}
              tintColor={Theme.colors.divider}
              backgroundColor={Theme.colors.primary}
              children={() => <Text style={styles.progressText}>25:00</Text>}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Iniciar</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Pausar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Parar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View> */}

        <View style={styles.pomodoroContainer}>
          <Text style={styles.pomodoroText}>Pomodoros:</Text>

          <View style={styles.pomodoroIndicator} />
          <View style={styles.pomodoroIndicator} />
          <View style={styles.pomodoroIndicator} />
          <View style={styles.pomodoroIndicator} />
          <View style={styles.pomodoroIndicator} />
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
    padding: 16
  },
  container: {
    gap: 36,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    alignSelf: 'flex-end'
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
