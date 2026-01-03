import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from "../shared/themes/theme";

import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const Settings = () => {
  const navigation = useNavigation<TNavigationScreenProps>();

  const [loaded, setLoaded] = useState(false);

  const [notificationActivated, setNotificationActivated] = useState(true);
  const [focusPeriod, setFocusPeriod] = useState(25);
  const [shortBreakPeriod, setShortBreakPeriod] = useState(5);
  const [longBreakPeriod, setLongBreakPeriod] = useState(15);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem("NOTIFICATIONS_ACTIVATED"),
      AsyncStorage.getItem("FOCUS_PERIOD"),
      AsyncStorage.getItem("SHORT_BREAK_PERIOD"),
      AsyncStorage.getItem("LONG_BREAK_PERIOD"),
    ])
      .then(
        ([
          notificationActivated,
          focusPeriod,
          shortBreakPeriod,
          longBreakPeriod,
        ]) => {
          setNotificationActivated(JSON.parse(notificationActivated || "true"));
          setFocusPeriod(JSON.parse(focusPeriod || "25"));
          setShortBreakPeriod(JSON.parse(shortBreakPeriod || "5"));
          setLongBreakPeriod(JSON.parse(longBreakPeriod || "15"));
        }
      )
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      "NOTIFICATIONS_ACTIVATED",
      JSON.stringify(notificationActivated)
    );
  }, [notificationActivated, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem("FOCUS_PERIOD", JSON.stringify(focusPeriod));
  }, [focusPeriod, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      "SHORT_BREAK_PERIOD",
      JSON.stringify(shortBreakPeriod)
    );
  }, [shortBreakPeriod, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem("LONG_BREAK_PERIOD", JSON.stringify(longBreakPeriod));
  }, [longBreakPeriod, loaded]);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="close" size={32} color={Theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Configurações</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Período de foco</Text>

            <View style={styles.formFieldButton}>
              <TouchableOpacity
                style={
                  focusPeriod === 15
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setFocusPeriod(15)}
              >
                <Text style={styles.secondaryButtonText}>15 min</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  focusPeriod === 25
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setFocusPeriod(25)}
              >
                <Text style={styles.primaryButtonText}>25 min</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  focusPeriod === 35
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setFocusPeriod(35)}
              >
                <Text style={styles.secondaryButtonText}>35 min</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Pausa curta</Text>

            <View style={styles.formFieldButton}>
              <TouchableOpacity
                style={
                  shortBreakPeriod === 3
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setShortBreakPeriod(3)}
              >
                <Text style={styles.secondaryButtonText}>3 min</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  shortBreakPeriod === 5
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setShortBreakPeriod(5)}
              >
                <Text style={styles.primaryButtonText}>5 min</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  shortBreakPeriod === 7
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setShortBreakPeriod(7)}
              >
                <Text style={styles.secondaryButtonText}>7 min</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Pausa longa</Text>

            <View style={styles.formFieldButton}>
              <TouchableOpacity
                style={
                  longBreakPeriod === 10
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setLongBreakPeriod(10)}
              >
                <Text style={styles.secondaryButtonText}>10 min</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  longBreakPeriod === 15
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setLongBreakPeriod(15)}
              >
                <Text style={styles.primaryButtonText}>15 min</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  longBreakPeriod === 20
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setLongBreakPeriod(20)}
              >
                <Text style={styles.secondaryButtonText}>20 min</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Notificações</Text>

            <View style={styles.formFieldButton}>
              <TouchableOpacity
                style={
                  notificationActivated === false
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setNotificationActivated(false)}
              >
                <Text style={styles.secondaryButtonText}>Desativado</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  notificationActivated === true
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setNotificationActivated(true)}
              >
                <Text style={styles.primaryButtonText}>Ativado</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  primaryButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 55,
    borderColor: Theme.colors.divider,
    borderWidth: 2,
  },
  primaryButtonText: {
    color: Theme.colors.text,
    fontFamily: Theme.fonts.interRegular,
    fontSize: Theme.fontSize.body,
  },
  secondaryButton: {
    backgroundColor: Theme.colors.divider,
    borderColor: Theme.colors.divider,
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 55,
  },
  secondaryButtonText: {
    color: Theme.colors.text,
    fontFamily: Theme.fonts.interRegular,
    fontSize: Theme.fontSize.body,
  },
  formContainer: {
    gap: 16,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: 300,
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSize.title,
    fontFamily: Theme.fonts.interBold,
  },
  formFieldContainer: {
    gap: 8,
    width: "100%",
  },
  formFieldLabel: {
    color: Theme.colors.text,
    fontSize: Theme.fontSize.label,
    fontFamily: Theme.fonts.interRegular,
  },
  formFieldButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
