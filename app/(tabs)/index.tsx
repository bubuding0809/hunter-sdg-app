<<<<<<< Updated upstream
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
import { StyleSheet,View, Image, Button, RefreshControl, Pressable, Modal} from "react-native";
import React, { useEffect, useState } from "react";
import { Center, Text, Box, Flex, Divider, FlatList, Container } from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import { SafeAreaView } from "react-native-safe-area-context";
import BountyCard from '../../Component/BountyCard'
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
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
=======
  const [modalData, setModalData] = useState(null);

  // Pull to refresh state
  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const changeModalVisible =(bool:boolean) =>{
    setModalVisible(bool)
  }

  const changeModalData =(data:BountyQueryType) =>{
    setModalData(data)
  }

  return (
    <SafeAreaView edges={['left', 'right']}>
      <FlatList
          contentContainerStyle={{ flexGrow: 1, alignItems:"center", backgroundColor: "#FFFFF"}}
          data = {bountyData}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                // Refetch bounties data
                setRefreshing(true);
                refetch()
                  .then(res => setRefreshing(false))
                  .catch(err => {
                    setRefreshing(false);
                    alert("Error refreshing bounties");
                  });
              }}
            />
          }
          renderItem = {({item}) => 
              
                <Container style = {[styles.bountyBox, styles.shadowProp]}>
                  <Pressable onPress ={ () => {changeModalVisible(true); changeModalData(item)}} style = {styles.pressable}>
                    <View style = {styles.imagebox}>
                      <Image style={styles.avatar} source={{ uri: item.images[0] }} />
                    </View>
                  <View style = {styles.leftbox}>
                        <Text style={styles.name_text}>{item.name}</Text>
                          {item.category == "pet" ? (
                          <View style = {styles.descriptionbox}>
                            <Text style={styles.description_text}>{item.breed}</Text>
                            <Text style={styles.description_text}>Age:{item.age}</Text>
                          </View>
                          ):(
                            <View style = {styles.descriptionbox}>
                            <Text style={styles.description_text}>{item.category}</Text>
                            <View style = {{flexDirection:"row"}}>
                              <Text style={styles.description_text}>Age: {item.age}</Text>
                              <Text style={styles.description_text}>Gender: {item.gender}</Text>
                            </View>
                            
                          </View>
                          )}
                          
                        
                        
                  </View>
                  <View style = {styles.rightbox}>
                      <Text style={styles.timestamp}>{item.lastSeen.toDate().toString()}</Text>
                      <Text style={styles.location}>{item.location.toJSON().longitude}</Text>
                  </View>
                  </Pressable>
                  <Modal
                    visible = {isModalVisible}
                    animationType = "slide">
                    <BountyCard
                    changeModalVisible ={changeModalVisible}
                    data = {modalData}
                    />
                    </Modal>
                    
                </Container>

          
          }
        />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  name_text: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: 'stretch',
  },
  description_text: {
    fontWeight: "normal",
    fontSize: 14,
    fontFamily: "Helvetica",
    paddingHorizontal:5
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
>>>>>>> Stashed changes
    aspectRatio: 1, 
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
  },
  descriptionbox: {
    width:"100%",
<<<<<<< Updated upstream
    height: "75%",
    marginTop: 20,
    justifyContent:"center"
  },
  imagebox:{
    position: "relative",
    flex: 2,
    paddingHorizontal: 5
=======
    height: "70%",
    justifyContent:"center",
    backgroundColor:"orange"
  },
  imagebox:{
    position: "relative",
    justifyContent:"center",
    flex: 2,
    paddingHorizontal: 5,
    backgroundColor:"blue"
>>>>>>> Stashed changes
  },
  leftbox:{
    position: "relative",
    flex: 6,
    justifyContent: "space-around",
    paddingVertical:15,
    paddingLeft:5,
<<<<<<< Updated upstream
=======
    backgroundColor: "red",
>>>>>>> Stashed changes
    //borderBottomWidth: 2
  },
  rightbox:{
    position: "relative",
<<<<<<< Updated upstream
    flex: 1.5,
=======
    flex: 2,
>>>>>>> Stashed changes
    justifyContent: "space-between",
    paddingTop:15,
    paddingRight:5,
    paddingBottom: 25,
<<<<<<< Updated upstream
=======
    backgroundColor: "green"
>>>>>>> Stashed changes
    //borderBottomWidth: 2

  },
  pressable: {
    //borderBottomWidth: 1,
    //borderWidth: 1,
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
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
<<<<<<< Updated upstream
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
=======
})

export default FeedPage;
>>>>>>> Stashed changes
