import React from 'react';
import { Text, StyleSheet, View, ImageBackground, ScrollView } from 'react-native'
import Button from '../components/Button'
import * as ImagePicker from 'expo-image-picker'

const Instructions = ({navigation, route}) => {

  const { lib } = route.params

  const [image, setImage] = React.useState(null)

  const handlePicGalery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita que sua aplicação acesse as imagens'
      )
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: true,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }

  }

  const handleCamera = async () => {
    const { status: cameraStatus } = await ImagePicker.getCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      const { status: requestCameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (requestCameraStatus !== 'granted') {
        alert('Permissão de câmera necessária para tirar fotos!');
        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
    });
  
    if (result.cancelled) {
      alert('Captura de imagem cancelada.');
      return;
    }
  
    if (result.error) {
      alert('Erro ao capturar imagem: ' + result.error);
      return;
    }
      if(result.assets !== null){
        setImage(result.assets[0].uri);
      }
  };


  React.useEffect(() => {
    if (image) {
      goToCheck(image)
    }
  }
  , [image])

  const goToCheck = () => {
    navigation.navigate('Check', { image })
  }

  return (
      <ImageBackground
        source={require('../assets/background.png')}
        style={{width: '100%', height: '100%'}}
      >
        <ScrollView>
        <View style={styles.container}>
          {!lib ? (
            <>
          <Text style={styles.title}>Instruções para captura da imagem</Text>

          <Text style={styles.topic}>Preparação: </Text>
          <Text style={styles.text}>
            • Se encaminhe para um ambiente bem iluminado.{'\n'}
            • Limpe a lente da câmera. {'\n'}
            • Atente-se para que a pele esteja limpa. {'\n'}
          </Text>
          <Text style={styles.topic}>Posicionamento:</Text>
          <Text style={styles.text}>
            • Tire a foto de forma que apareça apenas a lesão e pele ao fundo. {'\n'}
            • Escolha local bem iluminado, sem sombras. {'\n'}
            • Evite reflexos de luz. {'\n'}
          </Text>
          <Text style={styles.topic}>Centralização e Captura: </Text>

          <Text style={styles.text}>
            • Centralize a lesão na tela.{'\n'}
            • Mantenha o dispositivo estável. {'\n'}
            • Capture a foto com foco. {'\n'}
            • Utilize a ferramenta de corte habilitada para ajustar a imagem. {'\n'}
          </Text>
          <Text style={styles.topic}>Revisão e Envio: </Text>
          <Text style={styles.text}>
          • Revise as fotos. {'\n'}
          • Envie conforme instruído no app. {'\n'}
          </Text>
          <Text style={styles.topic}>Avisos: </Text>
          <Text style={styles.text}>
          • Este aplicativo não substitui a avaliação médica. {'\n'}
          • Este aplicativo não fornece diagnóstico. {'\n'}
          • Este aplicativo não fornece tratamento e prescrição. {'\n'}
          • Este aplicativo não armazena imagens. {'\n'}
          </Text>
          </>
          ) : (
            <>
            <Text style={styles.title}>Instruções para escolha da imagem</Text>
            <Text style={styles.topic}>Escolha da imagem: </Text>
            <Text style={styles.text}>
              • Escolha uma foto com foco. {'\n'}
              • Utilize a ferramenta de corte habilitada para ajustar 
              a imagem de maneira que a lesão fique centralizada e que somente a pele fique visível. {'\n'}
            </Text>
            <Text style={styles.topic}>Avisos: </Text>
            <Text style={styles.text}>
              • Este aplicativo não substitui a avaliação médica. {'\n'}
              • Este aplicativo não fornece diagnóstico. {'\n'}
              • Este aplicativo não fornece tratamento e prescrição. {'\n'}
              • Este aplicativo não armazena imagens. {'\n'}
            </Text>
            </>
          )}
        </View>
        <View style={styles.advance}>
        <Button 
            color='#A36D49' 
            text= {lib ? "Escolher imagem" : "Tirar foto"} 
            onPress={lib ? ()=>handlePicGalery() : () => handleCamera()} />
        </View>
        </ScrollView>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    padding: 20,
    borderWidth: 1,
    borderColor: '#A36D49',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 30,
    backgroundColor: '#fff',
  },
  advance: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  topic: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  }
})

export default Instructions