import React from 'react';
import { Text, StyleSheet, View, ImageBackground, Image } from 'react-native';
import Button from '../components/Button'


const Check = ({ route, navigation }) => {
  // A imagem está no parâmetro 'image' do objeto 'route.params'
  const { image } = route.params;

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={{ width: '100%', height: '100%'}}
    >
      <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: '10%' }}>Verifique a imagem</Text>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={{ width: 300, height:500, borderRadius: 12, resizeMode: 'cover'}}
        />
      </View>
      <View style={styles.advance}>
        <Button
          color='#A36D49'
          text="Enviar Foto Para Análise"
          onPress={() => navigation.navigate("Analysis", {image})} // Adicione a lógica para enviar a foto
        />
        <Button
          color='#A36D49'
          text="Voltar"
          onPress={() => {navigation.navigate("Instructions")}} // Adicione a lógica para enviar a foto
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: '#A36D49',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: "5%",
    backgroundColor: '#fff',
    width: 305,
    height: 505,
  },
  advance: {
    alignItems: 'center',
    width: '100%',
    gap: 8,
  }
});

export default Check;
