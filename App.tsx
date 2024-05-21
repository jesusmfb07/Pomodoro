import { Image, StyleSheet, Text, Platform, Button, View, StatusBar, SafeAreaView,TouchableOpacity } from 'react-native';
import {useEffect, useState} from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from  "react-native-av"
const colors =[ "#F7DC6F","#A2D9CE","#D7BDE2"];

export default function App()  {
  const [isWorking, setIsWorking] = useState(false);
  const [time,setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval : any;
  
    const startTimer = () => {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 100);
    };
  
    const stopTimer = () => {
      clearInterval(interval);
    };
  
    if (isActive) {
      startTimer();
    } else {
      stopTimer();
    }
  
    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }
  
    return stopTimer;
  }, [isActive, time]);
  
  function handleStartStop(){
    setIsActive(!isActive);
  }

  // async function playSound() {
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("")
  //   )
  // }


  return (
    <SafeAreaView
     style={[styles.container,{ backgroundColor: colors[currentTime]}]}>
    <View 
    style={{
       flex: 1,
       paddingHorizontal: 15,
       paddingTop: Platform.OS === "android" ? 30 : 0,
      }}
    >
      <Text style={styles.text}>Pomodoro</Text>
      <Header 
        currentTime={currentTime}  
        setCurrentTime={setCurrentTime} 
        setTime={setTime}
      />
      <Timer time={time} />
      <TouchableOpacity onPress={handleStartStop} style={styles.button}>
         <Text style={{color: 'white',fontWeight: "bold"}}>
          {isActive ? "STOP" : "START" }
         </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: "bold"
  },
  button:{
    alignItems: "center",
    backgroundColor:"#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  }
});