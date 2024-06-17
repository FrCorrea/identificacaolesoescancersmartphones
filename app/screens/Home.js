import { StyleSheet, View, ImageBackground, Text} from 'react-native'
import MenuIcon from '../assets/menu.svg'
import React from 'react'
import Button from '../components/Button'

const Home = ({navigation}) => {

  return (
      <ImageBackground
        source={require('../assets/background.png')}
        style={{width: '100%', height: '100%'}}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer} >
            <MenuIcon width={450} height={400} />
          </View>
          <Text style={{textAlign: 'center', fontSize: 16, color: '#A36D49', marginBottom: '5%' }}>
            Aplicativo desenvolvido para auxiliar na identificação de câncer 
            de pele do tipo não melanoma como trabalho de conclusão de curso da UTFPR.
            </Text>
          <View style={styles.buttons}>
            <Button
            color='#A36D49'
            text="Tirar Foto"
            onPress={() => navigation.navigate("Instructions", {lib: false})} />
            <Button
            color='#A36D49' 
            text="Encontrar na galeria" 
            onPress={() => navigation.navigate("Instructions", {lib: true})} />
          </View>
          <Text style={styles.bottomText}>
            Este aplicativo não substitui a avaliação de um profissional da saúde e não retém dados do usuário
            </Text>
        </View>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    gap: 24,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: '5%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
    borderColor: '#A36D49',
    borderWidth: 1,
    color: '#A36D49'
  }
})

export default Home