import React, { useState } from "react";
import { Center, Pressable, VStack, Container, Row} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import {StyleSheet, FlatList,Modal,View,Text,Button, Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import BountyCard from '../Component/BountyCard'

export default function Home() {
  

  const DATA = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    location: "~1.4km",
    fullName: "Amanda",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl: "https://pbs.twimg.com/profile_images/1002416157280727040/7SjA9KTJ_400x400.jpg",
    age: 20,
    gender: "Female",
    additionalinfo: "Additional info goes here"
  }, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    location: "~1.4km",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
    age: 20,
    gender: "Female",
    additionalinfo: "Additional info goes here"
  }, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    location: "~1.4km",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
    age: 20,
    gender: "Female",
    additionalinfo: "Additional info goes here"
  }, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    location: "~1.4km",
    fullName: "Kim Chaewon",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl: "https://image.kpopmap.com/2022/06/220508-LE-SSERAFIM-Chaewon-FEARLESS-at-Inkigayo-documents-6.jpeg",
    age: 20,
    gender: "Female",
    additionalinfo: "Additional info goes here"
  }, {
    id: "28694a0f-3123d96-142456e29d72",
    location: "~1.4km",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    age: 20,
    gender: "Female",
    additionalinfo: "Additional info goes here"
  }, {
    id: "286921f-bd96-142456e29d72",
    location: "~1.4km",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    age: 20,
    gender: "Female",
    additionalinfo: "Additional info goes here"
  }, {
    id: "28694a0f-3bd96-142456e29d72",
    location: "~1.4km",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
    age: 20,
    gender: "Female",
    additionalinfo: "Additional info goes here"
  },{
    id: "28694a0f-3da1-471f-bd96-231",
    location: "~1.4km",
    fullName: "Jun Long",
    timeStamp: "12:47 PM",
    recentText: "I am gay.",
    avatarUrl: "https://i.imgur.com/SPNmymH.png",
    age: 20,
    gender: "Female",
    additionalinfo: "Additional info goes here"
  }];
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(DATA[0]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [IsDesc,setIsDesc] = useState(true);
 
  const changeModalVisible =(bool:boolean) =>{
    setModalVisible(bool)
  }
  return (
    <SafeAreaView edges={['left', 'right']}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, alignItems:"center", backgroundColor: "white"}}
          data = {DATA}
          renderItem = {({item}) => 
              
                <Container style = {[styles.bountyBox, styles.shadowProp]}>
                  <Pressable onPress ={ () => changeModalVisible(true)} style = {styles.pressable}>
                    <View style = {styles.imagebox}>
                      <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
                    </View>
                  <View style = {styles.leftbox}>
                        <Text style={styles.name_text}>{item.fullName}</Text>
                        <View style = {styles.descriptionbox}>
                          <Text style={styles.description_text}>{item.recentText}</Text>
                        </View>
                        
                  </View>
                  <View style = {styles.rightbox}>
                      <Text style={styles.timestamp}>{item.timeStamp}</Text>
                      <Text style={styles.location}>{item.location}</Text>
                  </View>
                  </Pressable>
                  <Modal
                    visible = {isModalVisible}
                    animationType = "slide">
                    <BountyCard
                    changeModalVisible ={changeModalVisible}
                    />
                    </Modal>
                    
                </Container>

          
          }
        />
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
    textAlign: "right",
  },
  location: {
    fontWeight: "normal",
    fontSize: 10,
    textAlign: "right",
  },
  description_box:{
    width:"70%",
    height:"100%",

  },
  bountyBox: {
    width: "100%", 
    height: 100,
    flexDirection: "row", 
    marginVertical: 10,
    backgroundColor: "white",
    //alignItems:"center",
    justifyContent:"center"
    
  },
  avatar: {
    aspectRatio: 1, 
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
  },
  descriptionbox: {
    width:"100%",
    height: "75%",
    marginTop: 20,
    justifyContent:"center"
  },
  imagebox:{
    position: "relative",
    flex: 2,
    paddingHorizontal: 5
  },
  leftbox:{
    position: "relative",
    flex: 6,
    justifyContent: "space-around",
    paddingVertical:15,
    paddingLeft:5,
    //borderBottomWidth: 2
  },
  rightbox:{
    position: "relative",
    flex: 1.5,
    justifyContent: "space-between",
    paddingTop:15,
    paddingRight:5,
    paddingBottom: 25,
    //borderBottomWidth: 2

  },
  pressable: {
    //borderBottomWidth: 1,
    //borderWidth: 1,
    borderColor: "grey",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    borderRadius: 5,

  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  // location: {
  //   fontWeight: "normal",
  //   fontSize: 10,
  //   textAlign: "right",
  // },
  modalName: {
    fontWeight: "bold",
    fontSize: 40
  },
  avatarModal:{
    width: 170,
    height: 170,
    borderRadius: 90
  },
  modalCloseButtonContainer:{
    position: 'absolute',
    bottom: 0,
    left: 50,
    right: 50,
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius:40
  },
  HuntButtonContainer:{
    position: 'absolute',
    bottom: 100,
    left: 100,
    right: 100,
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius:40
  },
  DescContainerActive:{
    position: 'absolute',
    backgroundColor: 'lightgrey',//rgba(124,97,128, 1)',
    padding: 10,
    left: 30,
    right: 190,
    borderRadius:25
  },
  DescContainerInactive:{
    position: 'absolute',
    backgroundColor: 'rgba(233,233,233, 1)',//rgba(124,97,128, 1)',
    padding: 10,
    left: 30,
    right: 190,
    borderRadius:25
  },
  PhotoContainerActive:{
    position: 'absolute',
    backgroundColor: 'lightgrey',//rgba(124,97,128, 1)',
    padding: 10,
    left: 190,
    right: 30,
    borderRadius:25
  },
  PhotoContainerInactive:{
    position: 'absolute',
    backgroundColor: 'rgba(233,233,233, 1)',//rgba(124,97,128, 1)',
    padding: 10,
    left: 190,
    right: 30,
    borderRadius:25
  },
  modalBoldedText:{
    fontWeight: "bold",
    fontSize: 20
  },
  modalText:{
    fontSize: 20
  },
  photos:{
    width: 100,
    height: 100,
  }

});