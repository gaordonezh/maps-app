import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, StyleProp, ViewStyle, StyleSheet} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

const BlackButton = ({title, onPress, style}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        ...(style as any),
        ...styles.blackButton,
      }}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

BlackButton.defaultProps = {
  style: {},
};

export default BlackButton;

const styles = StyleSheet.create({
  blackButton: {
    height: 50,
    width: 200,
    backgroundColor: 'black',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
