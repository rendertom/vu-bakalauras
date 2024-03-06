import { Link, router } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

const HomePage = () => {
  return (
    <View>
      <Text>BOOM 123</Text>
      <Link href="/users/1">Go to user 1</Link>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/users/[id]",
            params: { id: 2 },
          })
        }
      >
        <Text>Go to user 2</Text>
      </Pressable>
    </View>
  );
};

export default HomePage;

// import { StatusBar } from 'expo-status-bar';
// import { Alert, StyleSheet, Text, View } from 'react-native';

// class Abc {
//   constructor(name) {
//     this.name = name;
//   }

//   getName() { return this.name; }
//   setName(name) { this.name = name; }
// }

// const abc = new Abc("Hello 123123");

// const set = () => {
//   abc.setName("new name")
//   alert('in');
// }

// const get = () => {
//   alert(abc.getName());
// }
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text onPress={()=>set()}> {abc.getName()} </Text>
//       <Text onPress={()=>get()}> {abc.getName()} </Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
