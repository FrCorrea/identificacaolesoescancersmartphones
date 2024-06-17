import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { Text, View, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import Button from '../components/Button';

const Analysis = ({route, navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState({});
    const { image } = route.params;

    const enviarImagem = async () => {
        try {
          if (!image) {
            console.error('Nenhuma imagem selecionada.');
            return;
          }
          const imgBase64 = await convertImageToBase64(image);
          const response = await fetch('https://2284-2804-14d-4684-80ed-c629-ccc4-7dad-891c.ngrok-free.app/enviar-imagem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imagem: imgBase64 }),
          });
          const result = await response.json();
          console.log(result)
          setResult(result);
          setIsLoading(false);
        } catch (error) {
          console.error('Erro ao enviar imagem:', error);
        }
      };
      const convertImageToBase64 = async (uri) => {
        const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        return base64;
      };

    useEffect(() => {
        setIsLoading(true);
        enviarImagem()
    }, []);

    return (
        <ImageBackground
            source={require('../assets/background.png')}
            style={{ width: '100%', height: '100%'}}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , marginHorizontal: 20}}>
                {isLoading ? (
                    <View style={styles.box}>
                        <Text style={styles.text}>Analisando imagem...</Text>
                        <ActivityIndicator size="large" color="#A36D49" />
                    </View>
                ) : (
                    <View style={styles.box}>
                        <Text style={styles.text} >A probabilidade de ser câncer de pele do tipo não melanoma é:</Text>
                        <Text style={styles.result} >{`${(result.NMELAN * 100).toFixed(2)}%` }</Text>
                        <Text style={styles.text}>Isto não é um diagóstico, apenas o resultado da rede neural. Não deixe de procurar seu médico</Text>
                        <Button text="Voltar ao início"  color= "#A36D49" onPress={() => {navigation.navigate("Home")}}/>
                        <Button text="Tirar outra foto" color= "#A36D49" onPress={() => {navigation.navigate("Instructions",{lib: false})}}/>
                        <Button text="Escolher da Galeria" color= "#A36D49" onPress={() => {navigation.navigate("Instructions", {lib: true})}}/>
                    </View>
                )}
        </View>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    result:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#A36D49',
    },

    box :{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderWidth: 2,
        borderColor: '#A36D49',
        borderRadius: 12,
        gap: 22,
    }
});

export default Analysis;