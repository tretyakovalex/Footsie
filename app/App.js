// Global Imports
import { StyleSheet, View } from 'react-native';

// Private Imports
import Footsie from './pages/foundation/footsie';

export default function App() {
  return (
    <View style={application.container}>
      <Footsie />
    </View>
  );
}

const application = StyleSheet.create({
  container: {
    flex: 1,
  },
});
