import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {moderateScale} from '../../helpers/Metrics';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Theme from '../../utils/theme';

const CommonHeader = () => {
  return (
    <View style={styles.main_contain}>
      <View style={styles.inner_contain}>
          <Text style={styles.reward_txt}>Header Component</Text>
      </View>
    </View>
  );
};

export {CommonHeader};

const styles = StyleSheet.create({
  main_contain: {
    height: hp(10),
    width: '100%',
    alignItems: 'center',
  },
  inner_contain: {
    width: '95%',
    height: 70,
    justifyContent: 'center',
    alignItems:'center',
  },
  left_contain: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_img: {
    height: hp(2.5),
    width: wp(20),
    tintColor: Theme.APP_WHITE_COLOR,
  },
  right_contain: {
    width: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  reward_txt: {
    color: Theme.APP_WHITE_COLOR,
    fontSize: moderateScale(16),
  },
});
