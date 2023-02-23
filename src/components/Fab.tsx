import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';

interface FabProps {
  onPress: () => void;
  label: string;
  position: {
    right?: number;
    bottom?: number;
    left?: number;
  };
}

const Fab = ({onPress, label, position}: FabProps) => {
  return (
    <View style={{...styles.fabContainer, ...position}}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#28425b', false, 30)}>
        <View style={styles.fab}>
          <Text style={styles.fabText}>{label}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default Fab;

Fab.defaultProps = {
  position: {
    right: 25,
    bottom: 25,
  },
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
  },
  fab: {
    backgroundColor: '#5856D6',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 10,
  },
  fabText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
