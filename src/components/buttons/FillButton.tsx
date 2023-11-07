import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React from 'react'
import Theme from '../../utils/theme';
import { moderateScale } from '../../helpers/Metrics';

interface FillButtonProps {
    text: string;
    onPress: ((event: GestureResponderEvent) => void) | undefined;
  }

const FillButton = (props: FillButtonProps) => {
  return (
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
  )
}

export {FillButton};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: Theme.PRIMARY_ACTIVE_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '95%',
        justifyContent:'center',
        alignItems:'center'
      },
      buttonText: {
        color: Theme.SECONDARY_COLOR,
        fontSize: moderateScale(18),
        fontWeight: 'bold'
      },
})