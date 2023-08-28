// Global Imports
import { StyleSheet, View, Text } from 'react-native';

// Private Imports
// THIS RUNS THE WHOLE APP
import Footsie from './src/pages/foundation/footsie';

export default function App() {

  return (
    <View style={[application.container, {justifyContent: 'center', alignItems: 'center'}]}>
      <Text style={{fontSize: 20}}>Testing Ground</Text>
      <Text style={{fontSize: 20}}>No API Calls Made</Text>
    </View>
  );
}


const application = StyleSheet.create({
  container: {
    flex: 1,
  }
})
