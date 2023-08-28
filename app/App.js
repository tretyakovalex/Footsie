// Global Imports
import { StyleSheet, View } from 'react-native';

// Private Imports
import Footsie from './src/pages/foundation/footsie';

export default function App() {
  return (
    <View
      style={[
        application.container,
        { justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <Footsie />
    </View>
  );
}

const application = StyleSheet.create({
  container: {
    flex: 1,
  },
});
