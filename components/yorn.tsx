import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Yorn = ({title,circle,bgBorder}:{title:string,circle:any,bgBorder:any}) => {
    const [activeButton, setActiveButton] = useState(false)
    const handleActive = (x:boolean)=>{ 
        setActiveButton(x)
}
    return (
        <TouchableOpacity
           
            className={`${bgBorder} bg-gray-6 h-20 w-44 rounded-xl flex flex-row justify-center items-center gap-4`}>
            <View className={` h-4 w-4 rounded-full ${circle}`}></View>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default Yorn