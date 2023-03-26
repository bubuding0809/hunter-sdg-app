import React, { useState, FunctionComponent} from "react";
import { Center, Pressable, VStack, Container, Row} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import {StyleSheet, FlatList,Modal,View,Text,Button, Image, Dimensions,TouchableWithoutFeedback} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowHeight = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;
type prop = {
    changeModalVisible: (bool:boolean) => void
}






function BountyCard ({changeModalVisible}:prop) {
    const [topbg,settopbg] = useState('rgba(0, 0, 0, 0.0)')
    const [IsDesc,setIsDesc] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <SafeAreaView style = {styles.topbox}
        edges={['left', 'right','top']}>
        <TouchableWithoutFeedback onPress={()=>{setModalVisible(false)}}>
            
        
            
                <Container style = {styles.picturebox}>
                    <Container style = {styles.imagebox}>
                        <Image style = {styles.profilePhoto} source= {{ uri: 'https://cdn.vox-cdn.com/thumbor/CJBBOUHXygJR6PVSCuCn_RIOBXM=/0x0:6080x2546/1220x813/filters:focal(2406x699:3378x1671):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65753797/elsainfall.0.jpg'}}/>
                    </Container>
                </Container>
                </TouchableWithoutFeedback>
                <Container style = {styles.togglebox}>
                    <View style  = {styles.leftbutton}>
                        <Button title = "DESCRIPTION" onPress={ () => setIsDesc(true)}></Button>
                    </View>
                    <View style  = {styles.rightbutton}>
                        <Button title = "PHOTOS" onPress={ () => setIsDesc(false)}></Button>
                    </View>
                </Container>
                <Container style = {styles.bottombox}>
                    { IsDesc ? (
                        <Container style = {styles.description_box}>
                            <View style = {{width:"100%",flexDirection: "row", justifyContent:"space-between", backgroundColor:"white",paddingVertical:5,paddingLeft:5,paddingRight:70, marginTop:20}}>
                                <View style = {{flexDirection:"row"}}>
                                    <Text style={{fontWeight: "bold"}}> Age: </Text><Text> 7</Text>
                                </View>
                                <View style = {{flexDirection:"row"}}>
                                    <Text style={{fontWeight: "bold"}}> Gender: </Text><Text>Female</Text>
                                </View>
                            
                            </View>
                            <View style = {{flexDirection:"row",width:"100%", backgroundColor:"white",paddingLeft:5}}>
                                <Text style={{fontWeight: "bold"}}> Last Seen Time: </Text>
                                <Text>blah blah blah</Text>
                            </View>
                            <View style = {{flexDirection:"row",width:"100%",  backgroundColor:"white",paddingLeft:5}}>
                                <Text style={{fontWeight: "bold"}}> Last Seen Location: </Text>
                                <Text> Gardens by the bay...</Text>
                            </View>
                            <View style = {{width:"100%", backgroundColor:"white",paddingLeft:5}}>
                            <Text style={{fontWeight: "bold"}}> Appearance:</Text>
                                <Text style={{paddingLeft:5}}>Appearance:....</Text>
                            </View>
                            <View style = {{width:"100%",  backgroundColor:"white",paddingLeft:5, marginBottom:20}}>
                                <Text style={{fontWeight: "bold"}}> Additional Information</Text>
                                <Text style={{paddingLeft:5}}>Additional Information:......</Text>
                            </View>
                        </Container>
                            
                        
                        ) : (
                            //add carousell function here
                            <Center marginTop={10}>
                            <Image style = {styles.photos} source= {{ uri: 'https://cdn.vox-cdn.com/thumbor/CJBBOUHXygJR6PVSCuCn_RIOBXM=/0x0:6080x2546/1220x813/filters:focal(2406x699:3378x1671):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65753797/elsainfall.0.jpg'}}/>
                            </Center>
                            
                        )}
                </Container>
                <Container style = {styles.buttonbox}>
                    <View>
                        <Button title = "GO BACK" color="white" onPress={() => changeModalVisible(false)}></Button>
                    </View>
                    <View>
                        <Button title = "Hunt" color="white" onPress={() => {
                            setModalVisible(true)
                            }}></Button>
                    </View>
                </Container>
                <Container>
                </Container>
            <Modal
                visible={modalVisible}
                animationType="none"
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(false)
                }}>
                <TouchableOpacity onPress={() =>{
                        setModalVisible(false)
                    } }
                    style={{
                        height: '100%',
                        marginTop: 'auto',
                        backgroundColor:'rgba(0, 0, 0, 0.5)',
                        }}>

                </TouchableOpacity>
                <Modal            
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(false)
                }}>
                                    <TouchableOpacity onPress={() =>{
                        setModalVisible(false)
                    } }
                    style={{
                        height: '100%',
                        marginTop: 'auto',
                        backgroundColor:'rgba(0, 0, 0, 0.0)',
                        }}>

                </TouchableOpacity>
                    <View style={{
                        height: '50%',
                        marginTop: 'auto',
                        backgroundColor:'white',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        
                        }}>
                            <Center>
                            <Text style ={{fontSize:30, fontWeight:'bold', marginTop:40}}>Join search</Text>
                            <Text style = {{fontSize:20,color:'grey',marginTop:20}}>Please note that you can only join 1</Text>
                            <Text style = {{fontSize:20,color:'grey',marginTop:0}}>search party at a time</Text>
                            </Center>
                        <View style ={styles.ImInContainer}>
                        <Button title="I'm In!" color='white' onPress={() => setModalVisible(false)} />
                        </View>

                        <View style ={styles.CancelContainer}>
                        <Button title="Cancel" color='black' onPress={() => {
                            setModalVisible(false)
                            }} />
                        </View>
                        
                        
                    </View>
                </Modal>
            </Modal>
            
        </SafeAreaView>


        
        
    );
}

const styles = StyleSheet.create({
    ImInContainer:{
        position: 'absolute',
        left: 50,
        right: 50,
        marginTop: 250,
        backgroundColor: 'black',
        borderTopWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius:40
      },
      CancelContainer:{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 60,
        backgroundColor: 'white',
        padding: 10,
        borderRadius:40
      },
    topbox:{
        paddingVertical:0,
        maxHeight:"100%",
        flex:1,
        display:"flex",
        maxWidth: WIDTH,
        backgroundColor:"blue",
        borderColor:"red"
    },
    picturebox:{
        maxWidth:"100%",
        flex:4,
        backgroundColor:"black",
        justifyContent:"center",
        alignItems:"center",

    },
    imagebox:{
        height: 150,
        aspectRatio:1,
        backgroundColor:"white",
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        //paddingTop:70,
        marginTop:70
    },
    profilePhoto:{
        height:180,
        aspectRatio:1,
        borderRadius:150,
        borderWidth:3,
        borderColor:"white",
        paddingTop:30
    },
    togglebox:{
        maxWidth:"100%",
        flex:1,
        width:WIDTH,
        position:"relative",
        backgroundColor:"black",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    leftbutton:{
        width:100,
        height:40,
        backgroundColor:"white",
        borderTopLeftRadius:15,
        borderBottomLeftRadius: 15,
    },
    rightbutton:{
        width:100,
        height:40,
        backgroundColor:"white",
        borderTopRightRadius:15,
        borderBottomRightRadius: 15,
        marginHorizontal: 30
    },
    bottombox:{
        maxWidth:"100%",
        flex:5,
        position:"relative",
        backgroundColor:"black",
        borderColor:"red",
        justifyContent:"center",
        alignItems:"center"
    },
    description_box:{
        backgroundColor:"white",
        height: "95%",
        width:"95%",
        borderRadius:20,
        justifyContent:"space-between",
    },
    photos:{
        width: 100,
        height: 100,
    },
    buttonbox:{
        maxWidth:"100%",
        flex:1.5,
        position:"relative",
        backgroundColor:"black",
        borderColor:"red",
        flexDirection: "row",
        justifyContent:"center"
    }

})

export default BountyCard;