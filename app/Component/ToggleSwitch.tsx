import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface Props {
    selectionMode: any
    option1: string
    option2: string
    onSelectSwitch: any
    selectionColor: string
}

const ToggleSwitch:React.FC<Props> = (
    {selectionMode,
    option1,
    option2,
    onSelectSwitch,
    selectionColor}
) =>{
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updatedSwitchData = val => {
      {setSelectionMode(val);
      onSelectSwitch(val);
        
        
      }};
    return(
        <View>
      <View
        style={{
          height: 50,
          width: 320,
          backgroundColor: 'white',
          borderRadius: 25,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 1 ? selectionColor : 'white',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? 'white' : selectionColor,
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 2 ? selectionColor : 'white',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? 'white' : selectionColor,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
};



export default ToggleSwitch;