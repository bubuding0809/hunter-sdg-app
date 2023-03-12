import React, { useState } from "react";
import { Center, Pressable, VStack, Container} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import {StyleSheet, FlatList,Modal,View,Text,Button, Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {

  const DATA = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    location: "~1.4km",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    location: "~1.4km",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
  }, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    location: "~1.4km",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
  }, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    location: "~1.4km",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    location: "~1.4km",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    location: "~1.4km",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    location: "~1.4km",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  },{
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    location: "~1.4km",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  }];

  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

  const openBounty: () => void = () => {
    setModalVisible(true);
    console.log("You pressed");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView edges={['left', 'right']}>
      

        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data = {DATA}
          renderItem = {({item}) => 
            <VStack space = {10}>
                <Container style = {styles.bountyBox}>
                <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
                  <Pressable onPress ={openBounty} style = {styles.pressable}>
                    <View style = {{flexDirection: "row"}}>
                        <Text style={styles.name_text}>{item.fullName}</Text>
                        <View style = {{flex: 1, padding: 5}}>
                          <Text style={styles.timestamp}>{item.timeStamp}</Text> 
                        </View> 
                    </View>
                    <View style = {{flexDirection: "row"}}>
                      <Text style={styles.description_text}>{item.recentText}</Text>
                      <View style = {{flex: 1}}>
                        <Text style={styles.location}>{item.location}</Text>
                      </View>
                      
                    </View>
                    
                  </Pressable>
                </Container>
              
            </VStack>
          
          }
        />
        {/* <Link href="/modal">AAAAAAAAAAAAAA</Link> */}


        <Modal
          visible = {isModalVisible}
          animationType = "slide"
          onRequestClose={closeModal}>

            <View>
              <Text style = {{paddingVertical: 80}}>Modal contents here</Text>
            </View>
            <View style = {{paddingBottom:15}}>
              <Button title="Close" onPress={closeModal} />
            </View>
        </Modal>
    </SafeAreaView>


    
  );
}



const styles = StyleSheet.create({
  
  name_text: {
    fontWeight: "bold",
    fontSize: 25

  },
  description_text: {
    fontWeight: "normal",
    fontSize: 15
  },
  timestamp: {
    fontWeight: "normal",
    fontSize: 10,
    textAlign: "right"
  },
  bountyBox: {
    width: "75%", 
    height: 100,
    flexDirection: "row", 
    margin: 10,
    borderBottomWidth: 3,
    backgroundColor: "white",
  },
  avatar: {
    width: 60,
    height: "100%",
    marginBottom: 0,
  },
  pressable: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
    margin:5,
    paddingLeft: 15

  },
  location: {
    fontWeight: "normal",
    fontSize: 10,
    textAlign: "right",
  }
});