import React, { useState } from "react";
import { Center, Pressable, VStack, Container, Row} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import {StyleSheet, FlatList,Modal,View,Text,Button, Image} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";


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

  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedItem, setSelectedItem] = useState(DATA[0]);
  const [IsDesc,setIsDesc] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
  };

  const openBounty = (item: any): void => {
    setModalVisible(true);
    setSelectedItem(item);
  };
  
  

  return (
    <SafeAreaView edges={['left', 'right']}>
      

        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data = {DATA}
          renderItem = {({item}) => 
            <VStack space = {10}>
              
                <Container style = {styles.bountyBox}>
                  <View style = {{margin: 10}}>
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
    //borderBottomWidth: 3,
    backgroundColor: "white",
  },
  avatar: {
    width: 60,
    height: "100%",
    marginBottom: 10
  },
  pressable: {
    borderBottomWidth: 1,
    borderColor: "grey",
    width: "100%",
    height: "100%",
    padding:5,
    paddingLeft: 15
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