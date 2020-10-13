import React, { useState, useEffect } from "react";

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
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [cheeseCount, setCheeseCount] = useState(99999);
  const [modifier, setModifier] = useState(1);
  const [shopVisibility, setShopVisibility] = useState(false);

  const [graterCount, setGraterCount] = useState(0);
  const [graterPrice, setGraterPrice] = useState(100);

  const [shredderCount, setShredderCount] = useState(0);
  const [shredderPrice, setShredderPrice] = useState(200);

  const [blasterCount, setBlasterCount] = useState(0);
  const [blasterPrice, setBlasterPrice] = useState(500);

  const [mouseCount, setMouseCount] = useState(0);
  const [mousePrice, setMousePrice] = useState(1000);

  const priceMultiplier = 2;
  const graterModifier = 1;
  const shredderModifier = 1.5;
  const blasterModifier = 2;
  const mouseModifier = 5;

  // const collectPassives = () => {
  //   setCheeseCount((current) => current + (mouseModifier * mouseCount));
  // };

  // const passives = setInterval(collectPassives, 5000);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCheeseCount((current) => current + 1 * mouseCount);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const resetButtonHandler = () => {
    Alert.alert(
      "RESET GAME DATA",
      "Are You Sure You Want To Reset?",
      [
        {
          text: "No",
          onPress: () => console.log(""),
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
    setGraterCount(0);
    setGraterPrice(100);
    setShredderCount(0);
    setShredderPrice(200);
    setBlasterCount(0);
    setBlasterPrice(500);
    setMouseCount(0);
    setMousePrice(1000);
  };

  const shopButtonHandler = () => {
    setShopVisibility(true);
  };

  const mine = () => {
    setCheeseCount((current) => current + 1 * modifier);
  };

  const buyGrater = () => {
    if (cheeseCount >= graterPrice) {
      setGraterCount((current) => current + 1);
      setCheeseCount((current) => current - graterPrice);
      setModifier((current) => current + graterModifier);
      setGraterPrice((current) => current * priceMultiplier);
    } else {
      Alert.alert(
        "Not Enough Cheese",
        `You Need ${graterPrice - cheeseCount} More Cheese To Buy That`,
        [
          {
            text: "Okay",
            onPress: () => console.log(""),
            style: "cancel",
          },
        ]
      );
    }
  };

  const buyShredder = () => {
    if (cheeseCount >= shredderPrice) {
      setShredderCount((current) => current + 1);
      setCheeseCount((current) => current - shredderPrice);
      setModifier((current) => current + shredderModifier);
      setShredderPrice((current) => current * priceMultiplier);
    } else {
      Alert.alert(
        "Not Enough Cheese",
        `You Need ${shredderPrice - cheeseCount} More Cheese To Buy That`,
        [
          {
            text: "Okay",
            onPress: () => console.log(""),
            style: "cancel",
          },
        ]
      );
    }
  };

  const buyBlaster = () => {
    if (cheeseCount >= blasterPrice) {
      setBlasterCount((current) => current + 1);
      setCheeseCount((current) => current - blasterPrice);
      setModifier((current) => current + blasterModifier);
      setBlasterPrice((current) => current * priceMultiplier);
    } else {
      Alert.alert(
        "Not Enough Cheese",
        `You Need ${blasterPrice - cheeseCount} More Cheese To Buy That`,
        [
          {
            text: "Okay",
            onPress: () => console.log(""),
            style: "cancel",
          },
        ]
      );
    }
  };

  // const buyMouse = () => {
  //   if (cheeseCount >= mousePrice) {
  //     setMouseCount((current) => current + 1);
  //     setCheeseCount((current) => current - mousePrice);
  //     setMousePrice((current) =>
  //       Math.floor(current * (priceMultiplier * 0.85))
  //     );
  //   } else {
  //     Alert.alert(
  //       "Not Enough Cheese",
  //       `You Need ${mousePrice - cheeseCount} More Cheese To Buy That`,
  //       [
  //         {
  //           text: "Okay",
  //           onPress: () => console.log(""),
  //           style: "cancel",
  //         },
  //       ]
  //     );
  //   }
  // };

  let instructions = null;
  let modifierText = null;

  if (cheeseCount === 0) {
    instructions = <Text style={styles.headerText}>Tap The Moon</Text>;
  }

  if (modifier > 1) {
    modifierText = (
      <Text style={styles.modifier}>Modifier: +{modifier - 1}</Text>
    );
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
            <View style={styles.modifierShop}>
              <Text
                style={{
                  ...styles.shopHeadings,
                  fontSize: 24,
                  marginBottom: 5,
                }}
              >
                Cheese: {cheeseCount}
              </Text>
              <Text style={styles.shopHeadings}>Tap Modifiers</Text>

              <TouchableOpacity activeOpacity={0.6} onPress={buyGrater}>
                <View style={styles.shopItem}>
                  <Text style={styles.canBuy}>Cheese Grater</Text>
                  <Text style={styles.shopDescription}>
                    Adds +{graterModifier} to your Modifier
                  </Text>
                  <View style={styles.shopPrice}>
                    <Text
                      style={{
                        ...styles.shopDescription,
                        ...styles.costText,
                        color: cheeseCount >= graterPrice ? "white" : "red",
                        textShadowColor: "black",
                        textShadowOffset: { height: 2, width: 2 },
                        textShadowRadius: 3,
                      }}
                    >
                      Cost: {graterPrice}
                    </Text>
                  </View>
                  <View style={styles.shopCount}>
                    <Text style={styles.shopDescription}>
                      Count: {graterCount}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6} onPress={buyShredder}>
                <View style={styles.shopItem}>
                  <Text style={styles.canBuy}>Cheese Shredder</Text>
                  <Text style={styles.shopDescription}>
                    Adds +{shredderModifier} to your Modifier
                  </Text>
                  <View style={styles.shopPrice}>
                    <Text
                      style={{
                        ...styles.shopDescription,
                        ...styles.costText,
                        color: cheeseCount >= shredderPrice ? "white" : "red",
                        textShadowColor: "black",
                        textShadowOffset: { height: 2, width: 2 },
                        textShadowRadius: 3,
                      }}
                    >
                      Cost: {shredderPrice}
                    </Text>
                  </View>
                  <View style={styles.shopCount}>
                    <Text style={styles.shopDescription}>
                      Count: {shredderCount}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.6} onPress={buyBlaster}>
                <View style={styles.shopItem}>
                  <Text style={styles.canBuy}>Cheese Blaster</Text>
                  <Text style={styles.shopDescription}>
                    Adds +{blasterModifier} to your Modifier
                  </Text>
                  <View style={styles.shopPrice}>
                    <Text
                      style={{
                        ...styles.shopDescription,
                        ...styles.costText,
                        color: cheeseCount >= blasterPrice ? "white" : "red",
                        textShadowColor: "black",
                        textShadowOffset: { height: 2, width: 2 },
                        textShadowRadius: 3,
                      }}
                    >
                      Cost: {blasterPrice}
                    </Text>
                  </View>
                  <View style={styles.shopCount}>
                    <Text style={styles.shopDescription}>
                      Count: {blasterCount}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* <Text style={styles.shopHeadings}>Passive Modifiers</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={buyMouse}>
                <View style={styles.shopItem}>
                  <Text style={styles.canBuy}>Mouse</Text>
                  <Text style={styles.shopDescription}>
                    Adds +{mouseModifier} Cheese/5 Seconds
                  </Text>
                  <View style={styles.shopPrice}>
                    <Text
                      style={{
                        ...styles.shopDescription,
                        ...styles.costText,
                        color: cheeseCount >= mousePrice ? "white" : "red",
                        textShadowColor: "black",
                        textShadowOffset: { height: 2, width: 2 },
                        textShadowRadius: 3,
                      }}
                    >
                      Cost: {mousePrice}
                    </Text>
                  </View>
                  <View style={styles.shopCount}>
                    <Text style={styles.shopDescription}>
                      Count: {mouseCount}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity> */}
            </View>

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
  modifierShop: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  canBuy: {
    fontSize: 18,
    color: "white",
  },
  shopItem: {
    backgroundColor: "grey",
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1,
    marginVertical: 10,
    position: "relative",
    paddingBottom: 35,
  },
  shopHeadings: {
    color: "white",
    fontSize: 20,
  },
  shopDescription: {
    color: "white",
    paddingTop: 5,
  },
  shopPrice: {
    position: "absolute",
    bottom: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  shopCount: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  costText: {
    fontSize: 18,
    fontWeight: "bold",
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
    height: 300,
    width: 300,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
});
