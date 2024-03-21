import { Alert, FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { Header } from "../components/Header";
import { Task } from "../components/Task";
import { useState } from "react";
import { taskDTO } from "../dtos/TaskDTO";
import { Empty } from "../components/Empty";
import { uuid } from "../utils/uuid";

export function HomeScreen() {
  const [tasks, setTasks] = useState<taskDTO[]>([])
  const [newTask, setNewTask] = useState('')

  function handleTaskAdd() {
    if(newTask !== '' && newTask.length >= 5) {
      setTasks((tasks => [... tasks, {id: uuid(), isCompleted: false, title: newTask.trim()}]))
    }
    else {
      Alert.alert("Não é possível adicionar uma tarefa vazia ou menor que 5 digitos.")
    }
    setNewTask('')
  }

  function handleTaskDone(id: string) {
    setTasks((task) => 
      task.map((task) =>
        {task.id === id ? (task.isCompleted = !task.isCompleted): null
          return task
        }
      ),
    )
  }

  function handleTaskDeleted(id: string) {
    Alert.alert('Excluir tarefa', 'Deseja excluir esta tarefa?', [
      {
        text: 'Sim',
        style: 'default',
        onPress: () => setTasks((tasks) => tasks.filter((task) => task.id !== id))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  const totalTasksCreated = tasks.length
  const totalTasksCompleted = tasks.filter(({isCompleted}) => isCompleted).length

  return (
    <View style={styles.container}>
      <Header task={newTask} onChangeText={setNewTask} onPress={handleTaskAdd} />
      <View style={styles.tasksContainer}>
        <View style={styles.info}>
          <View style={styles.row}>
          <Text style={styles.tasksCreated}>Criadas</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>{totalTasksCreated}</Text>
          </View>
          </View>

          <View style={styles.row}>
          <Text style={styles.tasksDone}>Concluídas</Text>
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>{totalTasksCompleted}</Text>
          </View>
          </View>
        </View>

        <FlatList 
          data={tasks}
          keyExtractor={(tasks) => tasks.id}
          renderItem={({item}) => (
            <Task
              key={item.id}
              onTaskDone={() => handleTaskDone(item.id!)}
              onTaskDeleted={() => handleTaskDeleted(item.id)}
              {...item}
            />
          )}
          ListEmptyComponent={<Empty />}
        />
      </View>
    </View>
  )
}