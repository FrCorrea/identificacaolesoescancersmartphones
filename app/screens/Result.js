
import { Button, StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Button 
      color='blue' 
      style={styles.button} 
      title="Entrar" 
      onPress={() => console.log('Button clicked')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 20
  },
  button: {
    width: 100,
    height: 100
  }
})
