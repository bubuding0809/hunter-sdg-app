import React, { useState, FunctionComponent, Fragment} from "react";
import { Center, Pressable, VStack, Container, Row} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import {StyleSheet, FlatList,Modal,View,Text,Button, Image, Dimensions, TouchableOpacity, StatusBar} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import ToggleSwitch from "./ToggleSwitch";
import moment from 'moment';
import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const CarouselRenderItems = ({SingularPicture}: {SingularPicture: string}) =>{
    return(
        <TouchableOpacity onPress = {() => console.log(SingularPicture)}>
                <Image style = {styles.carousel_photos} source= {{ uri: SingularPicture}}/>
        </TouchableOpacity>
    );
};

function Carousel({data}:{data: BountyQueryType}){
    // let flatListRef = useRef<FlatList | null>();
    return(
        <Container style = {styles.carousel_box}>
            <FlatList
            horizontal = {true}
            showsHorizontalScrollIndicator = {false}
            pagingEnabled = {true}
            data = {data.images} //list of strings
            renderItem =  {({item: image}) => {
                return <CarouselRenderItems SingularPicture ={image} />
            }}/>
            
        </Container>
    );
    
};
type BountyCardProp = {
    changeModalVisible: (bool:boolean) => void,
    data: BountyQueryType
}

function BountyCard ({changeModalVisible,data}:BountyCardProp) {
    const [IsDesc,setIsDesc] = useState(true);

    const switchfunction = val => {
       { val == 1 ? (setIsDesc(true)):(setIsDesc(false))};
    }
    return(
        <SafeAreaView style = {styles.topbox} >
            <StatusBar
            barStyle="light-content"
            />
                    
                <Container style = {styles.picturebox}>
                    <View style = {{position:"absolute",left:10,top:40, }}>
                        <Button title = "BACK" color="white" onPress={() => changeModalVisible(false)}></Button>
                    </View>
                   <View style = {{backgroundColor:"#E5E5E5",height: "40%",width:"100%",bottom:0,position:"absolute"}}></View>
                    <Container style = {styles.imagebox}>
                        <Image style = {styles.profilePhoto} source= {{ uri: data.images[0]}}/>
                    </Container>
                </Container>
                <Container style = {styles.togglebox}>
                    <ToggleSwitch
                        selectionMode = {1}
                        option1 =   'DESCRIPTION'
                        option2 = {'PHOTOS'}
                        onSelectSwitch = { switchfunction}
                        selectionColor = {'#000000'}
                    />
                </Container>
                <Container style = {styles.bottombox}>
                    { IsDesc ? (
                        <Container style = {styles.description_box}>
                            <View style = {{width:"100%",flexDirection: "row",
                            backgroundColor:"white",paddingHorizontal:5, marginTop:20, paddingRight:100}}>
                                <View style = {{flex:1,flexDirection:"row",justifyContent: 'flex-start'}}>
                                    <Text style={{fontWeight: "bold"}}> Age: </Text><Text> {data.age}</Text>
                                </View>
                                <View style = {{flex:1,flexDirection:"row",justifyContent: 'flex-end'}}>
                                    <Text style={{fontWeight: "bold"}}> Gender: </Text><Text>{data.gender}</Text>
                                </View>
                            
                            </View>
                            <View style = {{flexDirection:"row",width:"100%", backgroundColor:"white",paddingLeft:5}}>
                                <Text style={{fontWeight: "bold"}}> Last Seen Time: </Text>
                                <Text> {data.lastSeen.toDate().toDateString()} </Text>
                            </View>
                            <View style = {{flexDirection:"row",width:"100%",  backgroundColor:"white",paddingLeft:5}}>
                                <Text style={{fontWeight: "bold"}}> Last Seen Location: </Text>
                                <Text>{data.description}</Text>
                            </View>
                            <View style = {{width:"100%", backgroundColor:"white",paddingLeft:5,}}>
                            <Text style={{fontWeight: "bold" }}> Appearance:</Text>
                                <Text style={{paddingLeft:5,textAlign:"justify", paddingRight: 10}}>{data.appearance}</Text>
                            </View>
                            <View style = {{width:"100%",  backgroundColor:"white",paddingLeft:5, marginBottom:20}}>
                                <Text style={{fontWeight: "bold"}}> Additional Information</Text>
                                <Text style={{paddingLeft:5,textAlign:"justify", paddingRight: 10}}>{data.additionalInfo}</Text>
                            </View>
                        </Container>
                            
                        
                        ) : (
                            //add carousell function here
                            <Carousel
                            data = {data}
                            />
                            
                        )}
                </Container>
                <Container style = {styles.buttonbox}>
                    <View>
                        <Button title = "HUNT" color="black" onPress={() => changeModalVisible(false)}></Button>
                    </View>

                    
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
        height:200,
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
        backgroundColor:"#E5E5E5",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    bottombox:{
        maxWidth:"100%",
        width:"100%",
        flex:5,
        position:"relative",
        backgroundColor:"#E5E5E5",
        justifyContent:"center",
        alignItems:"center",
        // borderColor:"red",
        // borderWidth:1,
    },
    description_box:{
        backgroundColor:"white",
        height: "95%",
        width:"100%",
        borderRadius:20,
        justifyContent:"space-between",
        paddingHorizontal:3,
        // borderColor:"red",
        // borderWidth:1
    },
    buttonbox:{
        maxWidth:"100%",
        flex:1.5,
        position:"relative",
        backgroundColor:"#E5E5E5",
        borderColor:"red",
        flexDirection: "row",
        justifyContent:"center"
    },
    carousel_box:{
        height: "85%",
        aspectRatio:1,
        alignItems:"center",
        justifyContent:"center",
    },
    carousel_photos:{
        height:"100%",
        aspectRatio:1,
        //marginRight:30
    }

})

export default BountyCard;