import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import fonts from '../../utils/fonts';
import Theme from '../../utils/theme';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {moderateScale} from '../../helpers/Metrics';
import Icon from 'react-native-vector-icons/FontAwesome';

interface PrimaryButtonIconProps {
  icon: ImageSourcePropType | undefined;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  buttonText: string;
}

const PrimaryButtonIcon = ({
  icon,
  onPress,
  buttonText,
}: PrimaryButtonIconProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{buttonText}</Text>
      <Icon
        name="arrow-right"
        style={styles.shippingIcon}
        size={heightPercentageToDP(3)}
        color={Theme.PRIMARY_ACTIVE_COLOR}
      />
    </TouchableOpacity>
  );
};

export {PrimaryButtonIcon};

const styles = StyleSheet.create({
  buttonContainer: {
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(5),
    flexDirection: 'row',
    backgroundColor: Theme.SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  shippingIcon: {
    width: widthPercentageToDP(10),
    height: heightPercentageToDP(3),
    textAlign: 'center',
  },
  buttonText: {
    fontSize: moderateScale(13),
    color: Theme.PRIMARY_ACTIVE_COLOR,
    fontWeight: '800',
  },
});
