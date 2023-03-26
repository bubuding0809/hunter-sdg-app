import React, { useState, FunctionComponent} from "react";
import { Center, Pressable, VStack, Container, Row} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../context/FirebaseAuthContext";
import {StyleSheet, FlatList,Modal,View,Text,Button, Image, Dimensions, TouchableOpacity} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import useBountiesQuery from "../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../utils/scripts/hooks/queries/useGetBounties";
import ToggleSwitch from "./ToggleSwitch";

const WIDTH = Dimensions.get('window').width;
type CarouselProp = {
    data: BountyQueryType
}

const CarouselRenderItems = ({item}: {item: BountyQueryType}) =>{
    return(
        <TouchableOpacity onPress = {() => console.log("clicked")}>
            <Text>Hello</Text>
            <Image style = {styles.carousel_photos} source= {{ uri: "https://images.unsplash.com/photo-1596364725424-7673f05f64b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTk4OTh8MHwxfHNlYXJjaHw1fHxhZHVsdHN8ZW58MHwxfHx8MTY3OTEzNDk4OA&ixlib=rb-4.0.3&q=80&w=1080"}}/>
        </TouchableOpacity>
    );
};

function Carousel({data}:CarouselProp){
    return(
        <Container style = {styles.carousel_box}>
            <FlatList 
            data = {data.images} 
            renderItem = {CarouselRenderItems as any}
            />
            
        </Container>
    );
    
};
type BountyCardProp = {
    changeModalVisible: (bool:boolean) => void,
    data: BountyQueryType
}

function BountyCard ({changeModalVisible,data}:BountyCardProp) {
    const [IsDesc,setIsDesc] = useState(true);

    return(
        <SafeAreaView style = {styles.topbox}
        edges={['left', 'right','top']}>
            
                <Container style = {styles.picturebox}>
                    <Container style = {styles.imagebox}>
                        <Image style = {styles.profilePhoto} source= {{ uri: data.images[0]}}/>
                    </Container>
                </Container>
                <Container style = {styles.togglebox}>
                    <ToggleSwitch
                        selectionMode = {1}
                        option1 =   'DESCRIPTION'
                        option2 = {'PHOTOS'}
                        onSelectSwitch = {() => setIsDesc(!IsDesc)}
                        selectionColor = {'grey'}
                    />
                </Container>
                <Container style = {styles.bottombox}>
                    { IsDesc ? (
                        <Container style = {styles.description_box}>
                            <View style = {{width:"100%",flexDirection: "row", justifyContent:"space-between", backgroundColor:"white",paddingVertical:5,paddingLeft:5,paddingRight:70, marginTop:20}}>
                                <View style = {{flexDirection:"row"}}>
                                    <Text style={{fontWeight: "bold"}}> Age: </Text><Text> {data.age}</Text>
                                </View>
                                <View style = {{flexDirection:"row"}}>
                                    <Text style={{fontWeight: "bold"}}> Gender: </Text><Text>{data.gender}</Text>
                                </View>
                            
                            </View>
                            <View style = {{flexDirection:"row",width:"100%", backgroundColor:"white",paddingLeft:5}}>
                                <Text style={{fontWeight: "bold"}}> Last Seen Time: </Text>
                                <Text> data.lastseen </Text>
                            </View>
                            <View style = {{flexDirection:"row",width:"100%",  backgroundColor:"white",paddingLeft:5}}>
                                <Text style={{fontWeight: "bold"}}> Last Seen Location: </Text>
                                <Text> data.location</Text>
                            </View>
                            <View style = {{width:"100%", backgroundColor:"white",paddingLeft:5}}>
                            <Text style={{fontWeight: "bold"}}> Appearance:</Text>
                                <Text style={{paddingLeft:5}}>{data.appearance}</Text>
                            </View>
                            <View style = {{width:"100%",  backgroundColor:"white",paddingLeft:5, marginBottom:20}}>
                                <Text style={{fontWeight: "bold"}}> Additional Information</Text>
                                <Text style={{paddingLeft:5}}>{data.additionalInfo}</Text>
                            </View>
                        </Container>
                            
                        
                        ) : (
                            //add carousell function here
                            <Center style = {{backgroundColor:"white",height:"100%", width:"100%"}}>
                            <Carousel
                            data = {data}
                            />
                            </Center>
                            
                        )}
                </Container>
                <Container style = {styles.buttonbox}>
                    <View>
                        <Button title = "GO BACK" color="white" onPress={() => changeModalVisible(false)}></Button>
                    </View>
                    <View>
                        <Button title = "HUNT" color="white" onPress={() => changeModalVisible(false)}></Button>
                    </View>

                    
                </Container>
                <Container>
                </Container>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
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
    },
    carousel_box:{
        height: "85%",
        width: "95%",
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
    },
    carousel_photos:{
        height:"100%",
        aspectRatio:1,
        borderRadius: 50
    }

})

export default BountyCard;