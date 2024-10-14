import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Button } from 'react-native'; 
import { StatusBar } from 'react-native';

const mockData = [
  {
    id: 1,
    name: 'Buy groceries',
  },
  {
    id: 2,
    name: 'finish homework',
  },
  {
    id: 3,
    name: 'play video games',
  }
]

export default function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [ItemInEdit, setItemInEdit] = useState(null);
  const [EditedText, setEditedText] = useState('');

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now().toString(), name: inputText },
      ]);
      setInputText(''); // Clear input after adding
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputText}
        value={inputText}
        placeholder='Add a todo'
      />
      <Button title='Add' onPress={addTodo} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.itemListed}>
            {
              ItemInEdit === item.id ?
                <TextInput
                  value={EditedText}
                  onChangeText={setEditedText}
                  style={{ ...styles.input, width: '70%' }}
                  placeholder='Edit a todo'
                /> :
                <Text style={styles.ItemName}>{item.name}</Text>
            }

            <View style={styles.actions}>
              {
                ItemInEdit === item.id ? (
                  <AntDesign
                    name='check'
                    size={24}
                    color="green"
                    onPress={() => {
                      setTodos((prevTodos) =>
                        prevTodos.map(todo =>
                          todo.id === item.id ?
                            {
                              ...todo,
                              name: EditedText
                            } : todo));
                      setItemInEdit(null);
                      setEditedText('');
                    }}
                  />
                ) : (
                  <AntDesign
                    name="edit"
                    size={24}
                    color="green"
                    onPress={() => 
                      setItemInEdit(item.id)
                    }
                  />
                )
              }

              <AntDesign
                style={{ marginLeft: 20 }}
                name="delete"
                size={24} color="red"
                onPress={() => {
                  setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
                }}
              />
            </View>
          </View>)}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight, // for Android only & we have the SafeAreaView for IOS only 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    boardercolor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  itemListed: {
    marginLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: '80%',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '20%'
  },
  ItemName: {
    fontSize: 18
  }

});
