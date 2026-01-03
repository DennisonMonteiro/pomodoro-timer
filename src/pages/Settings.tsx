import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TNavigationScreenProps } from "../AppRoutes";
import { Theme } from "../shared/themes/theme";

import { MaterialIcons } from "@expo/vector-icons";

export const Settings = () => {
  const navigation = useNavigation<TNavigationScreenProps>();

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
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>15 min</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>25 min</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>35 min</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Pausa curta</Text>

            <View style={styles.formFieldButton}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>3 min</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>5 min</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>7 min</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Pausa longa</Text>

            <View style={styles.formFieldButton}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>10 min</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>15 min</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>20 min</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Notificações</Text>

            <View style={styles.formFieldButton}>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Desativado</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton}>
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
  },
  primaryButtonText: {
    color: Theme.colors.text,
    fontFamily: Theme.fonts.interRegular,
    fontSize: Theme.fontSize.body,
  },
  secondaryButton: {
    backgroundColor: Theme.colors.divider,
    borderColor: Theme.colors.divider,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 55,
    borderWidth: 2,
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
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between'
  },
});
