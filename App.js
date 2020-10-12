import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
  Button,
  Alert,
  Modal,
} from "react-native";

export default function App() {
  const [cheeseCount, setCheeseCount] = useState(0);
  const [modifier, setModifier] = useState(1);
  const [shopVisibility, setShopVisibility] = useState(false);

  const resetButtonHandler = () => {
    Alert.alert(
      "RESET GAME DATA",
      "Are You Sure You Want To Reset?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            resetGame();
          },
        },
      ],
      { cancelable: false }
    );
  };
  const resetGame = () => {
    setCheeseCount(0);
    setModifier(1);
  };

  const shopButtonHandler = () => {
    setShopVisibility(true);
  };

  const mine = () => {
    setCheeseCount((current) => current + 1 * modifier);
  };

  let instructions = null;
  let modifierText = null;

  if (cheeseCount === 0) {
    instructions = <Text style={styles.headerText}>Tap The Moon</Text>;
  }

  if (modifier > 1) {
    modifierText = <Text style={styles.modifier}>Modifier: {modifier}</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.backgroundImg}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={shopVisibility}
        >
          <View style={styles.modalView}>
            <View style={styles.closeModalButton}>
              <Button
                onPress={() => {
                  setShopVisibility(!shopVisibility);
                }}
                title="Close"
                color="red"
              />
            </View>
          </View>
        </Modal>

        {instructions}
        <Text style={styles.counter}>Cheese: {cheeseCount}</Text>
        {modifierText}

        {/*MOON ICON*/}
        <Pressable
          onPress={mine}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210,230,255)" : "white",
              transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
            },
            styles.wrapperCustom,
          ]}
        >
          <Image source={require("./assets/moon.png")} style={styles.moon} />
        </Pressable>

        {/*RESET BUTTON*/}
        <View style={styles.resetButton}>
          <Button title="Reset" color="red" onPress={resetButtonHandler} />
        </View>
        <View style={styles.shopButton}>
          <Button
            title="STORE"
            color="dodgerblue"
            onPress={shopButtonHandler}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
  closeModalButton: {
    position: "absolute",
    top: 40,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    padding: 10,
    backgroundColor: "#343434",
    flex: 1,
  },
  shopButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  resetButton: {
    position: "absolute",
    bottom: 0,
  },
  counter: {
    color: "white",
    fontSize: 32,
    position: "absolute",
    top: "25%",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    position: "absolute",
    top: 48,
    // paddingVertical: "15%",
  },
  modifier: {
    color: "white",
    paddingBottom: 20,
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  moon: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    padding: 6,
    height: 200,
    width: 200,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center",
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
});
