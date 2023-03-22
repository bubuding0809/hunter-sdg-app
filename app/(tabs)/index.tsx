import React, { useState } from "react";
import { Center, Pressable, VStack, Container, Row} from "native-base";
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

            <Center style={{paddingTop:50}}>
              <Image style={styles.avatarModal} source={{ uri: selectedItem.avatarUrl }} />
              <Text style ={styles.modalName}>{selectedItem.fullName}</Text>
              <Text style ={{fontSize:15}}>{selectedItem.timeStamp}</Text>
            </Center>

          <View>
            <Center style={{ marginTop: 35, borderWidth: 0 }}>
              {/* { IsDesc? (





              ):(




              )
              
            
            
            
            
            } */}
              <View style = { IsDesc ? styles.DescContainerActive:styles.DescContainerInactive}>
                <Button title="Description" onPress={() => setIsDesc(true)} color="black" />
              </View>
              <View style = { IsDesc ? styles.PhotoContainerInactive:styles.PhotoContainerActive}>
                <Button title="Photos" onPress={ () => setIsDesc(false)} color="black" />
              </View>
            </Center>
          </View>

            { IsDesc ? (

              <View style={{marginTop:50, backgroundColor:'grey'}}>
                <View style={{backgroundColor:'lightgrey', flexDirection:'row'}}>
                  <Text style={{marginLeft:20, fontSize:18,fontWeight:"bold"}}>Age: </Text>
                  <Text style={{fontSize:20}}>{selectedItem.age}</Text>
                  <Text style={{marginLeft:140, fontSize:18,fontWeight:"bold"}}>Gender: </Text>
                  <Text style={{fontSize:20}}>{selectedItem.gender}</Text>
                </View>

                <View style={{backgroundColor:'lightgrey', flexDirection:'row'}}>
                  <Text style={{marginTop:10,marginLeft:20, fontSize:18,fontWeight:"bold"}}>Last seen: </Text>
                  <Text style={{marginTop:10, fontSize:18}}>Insert info</Text>
                </View>

                <View style={{backgroundColor:'lightgrey', flexDirection:'row'}}>
                  <Text style={{marginTop:10,marginLeft:20, fontSize:18,fontWeight:"bold"}}>Location: </Text>
                  <Text style={{marginTop:10, fontSize:18}}>Insert info</Text>
                </View>

                <View style={{backgroundColor:'lightgrey', flexDirection:'row'}}>
                  <Text style={{marginTop:10,marginLeft:20, fontSize:18,fontWeight:"bold"}}>Appearance: </Text>
                  <Text style={{marginTop:10, fontSize:18}}>Insert info</Text>
                </View>

                <View style={{backgroundColor:'lightgrey', flexDirection:'row'}}>
                  <Text style={{marginTop:10,marginLeft:20, fontSize:18,fontWeight:"bold"}}>Additional Information: </Text>
                  <Text style={{marginTop:10, fontSize:18}}>Insert info</Text>
                </View>

              </View>
            ) : (
              <Center marginTop={10}>
                <Image style={styles.photos} source={{ uri: selectedItem.avatarUrl }} />
              </Center>
              
            )}

            <View style = {styles.HuntButtonContainer}>
              <Button title="Hunt" onPress={()=>{}} color="white" />
            </View>

            <View style = {styles.modalCloseButtonContainer}>
              <Button title="Close" onPress={closeModal} color="white" />
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