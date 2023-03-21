import React, { useState } from "react";
import { Center, Pressable, VStack, Container} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import {StyleSheet, FlatList,Modal,View,Text,Button, Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
<<<<<<< Updated upstream
import { flexbox } from "native-base/lib/typescript/theme/styled-system";
import { block } from "react-native-reanimated";

=======
import BountyDescription from '../BountyDescription'
import BountyCard from '../Component/BountyCard'
>>>>>>> Stashed changes

export default function Home() {
  

  const DATA = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    location: "~1.4km",
    fullName: "Aafreen Khan",
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
  const [isModalVisible, setModalVisible] = useState(false);
<<<<<<< Updated upstream

  const openBounty: () => void = () => {
    setModalVisible(true);
    console.log("You pressed");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

=======
  const [selectedItem, setSelectedItem] = useState(DATA[0]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [IsDesc,setIsDesc] = useState(true);
 
  const changeModalVisible =(bool:boolean) =>{
    setModalVisible(bool)
  }
>>>>>>> Stashed changes
  return (
    <SafeAreaView edges={['left', 'right']}>
        <FlatList
<<<<<<< Updated upstream
          contentContainerStyle={{ flexGrow: 1 , backgroundColor: "white", alignItems:"center"}}
          style = {{}}
          data = {DATA}
          renderItem = {({item}) => 
          
                <Container style = {styles.bountyBox}>
                  <Pressable onPress ={ () => openBounty(item)} style = {styles.pressable}>
                  <View style = {styles.image_box}>
                    <Image style={styles.avatar} source={{ uri: item.avatarUrl }} />
                  </View>
                
                  <Pressable onPress ={ () => openBounty(item)} style = {styles.pressable}>
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
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    margin: 5,
=======
    flexDirection: "row", 
    marginVertical: 10,
>>>>>>> Stashed changes
    backgroundColor: "white",
    //alignItems:"center",
    justifyContent:"center"
    
  },
  avatar: {
<<<<<<< Updated upstream
    width: 70,
    height: 80,
    borderRadius: 5,
    marginVertical:10,
    position:"relative"
  },
  image_box: {
    position: "relative",
    height:"100%",
  },
  leftbox: {
    position: "relative",
    padding: 15,
    flex:6,
    height:"100%",
    flexDirection: "column",
    justifyContent:"space-between",
    paddingVertical:10,
    borderBottomWidth: 1,

  },
  rightbox: {
    position: "relative",
    flex:1.75,
    flexDirection: "column",
    justifyContent:"space-between",
    paddingVertical:10,
    borderBottomWidth: 1,

  },
  pressable: {
    //contained inside BountyBox
    //borderBottomWidth: 1,
=======
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
>>>>>>> Stashed changes
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
  location: {
    fontWeight: "normal",
    fontSize: 10,
    textAlign: "right",
  },
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