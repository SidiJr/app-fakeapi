import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { FlatList } from "react-native-web";

export default function App() {
  const [categorias, setCategorias] = useState();
  const [produtos, setProdutos] = useState();
  const [carregando, setCarregando] = useState(false);

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
        setCategorias(data.slice(0, 5));
      } catch (error) {}
    }
    getCategories();
  }, []);

  const getProduto = useCallback(async (id) => {
    try {
      setCarregando((prev) => !prev);
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${id}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar as categorias.");
      }
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      setCarregando((prev) => !prev);
    } finally {
      setCarregando((prev) => !prev);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>
          Clique em uma categoria para vizualizar os produtos!
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.sidebarContainer}>
          <FlatList
            style={styles.categorias}
            data={categorias}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => getProduto(item.id)}
              >
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.mainContainer}>
          {carregando ? (
            <View style={styles.carregando}>
              <Text style={styles.produtoTitulo}>Carregando...</Text>
            </View>
          ) : (
            <FlatList
              data={produtos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.produto}>
                  <View style={styles.produtoWrapper}>
                    <Image
                      source={{ uri: item.images[0] }}
                      style={styles.produtoImagem}
                    />
                    <Text  style={styles.produtoPreco}>Preço: R${item.price}</Text>
                  </View>
                  <Text style={styles.produtoTitulo}>{item.title}</Text>
                </View>
              )}
            />
          )}
        </View>
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
    color: "#FFFAF0",
    fontSize: 20,
    textAlign: "center",
  },
  sidebarContainer: {
    width: "25%",
    height: "100%",
  },
  mainContainer: {
    width: "75%",
    height: "100%",
    backgroundColor: "#FFFAF0",
  },
  categorias: {
    backgroundColor: "grey",
  },
  listItem: {
    backgroundColor: "black",
    color: "#FFFAF0",
    margin: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  buttonText: {
    color: "#FFFAF0",
    fontSize: 12,
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  produto: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  produtoImagem: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  produtoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  carregando: {
    paddingTop: 50,
  },
  produtoWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  produtoPreco: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
});
