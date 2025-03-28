import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, FlatList } from "react-native-web";

// Faça um aplicativo com expo que, usando https://fakeapi.platzi.com/en/about/introduction/, contenha:

// 1. Liste todas as categorias (coloque botões para carregar seus produtos).
//[GET] https://api.escuelajs.co/api/v1/categories
// 2. Atualize o FlatList com os produtos da categoria escolhida;
// 3. Defina estilos para as categorias e produtos

export default function App() {
  const [dados, setDados] = useState();
  // const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState();

  console.log("dados: ", dados);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar as categorias.");
        }
        const data = await response.json();
        setDados(data.slice(0, 5));
      } catch (error) {
        setErro(error.message);
      } finally {
        // setCarregando(false);
      }
    }
    getCategories();
  }, []);

  const getProduto = useCallback(async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      if (!response.ok) {
        throw new Error("Erro ao buscar as categorias.");
      }
      const data = await response.json();
      setDados(data.slice(0, 5));
    } catch (error) {
      setErro(error.message);
    } finally {
      // setCarregando(false);
    }
  }, []);

  //fazer tratativa de erro e loader

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>
          Clique em uma categoria para vizualizar os produtos
        </Text>
      </View>
      <View style={styles.sidebarContainer}>
        <FlatList
          style={styles.flatList}
          data={dados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listItem}>
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: "black",
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  navbarText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  sidebarContainer: {
    width: "25%",
    height: "100%",
  },
  flatList: {
    backgroundColor: "grey",
  },
  listItem: {
    backgroundColor: 'black',
    color: 'white',
    margin: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});
