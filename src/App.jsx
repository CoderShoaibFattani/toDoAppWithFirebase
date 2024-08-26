import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config/firebase";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const usersTask = await getDocs(collection(db, "tasks"));
      const tasksData = usersTask.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddTask = async () => {
    if (!task.trim()) return;
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        content: task,
        completed: false,
        createdAt: new Date(),
      });
      setTasks([...tasks, { id: docRef.id, content: task, completed: false }]);
      console.log("Document written with ID: ", docRef.id);
      setTask("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleEditTask = async (id, editedTask) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        content: editedTask,
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, content: editedTask } : task
        )
      );
      setEditingTask(null);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <Paper
      sx={{
        width: "40vw",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "darkgreen",
        color: "white",
      }}
    >
      <Typography variant="h1" component="h1" textAlign="center">
        To Do App
      </Typography>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <TextField
          fullWidth
          sx={{ backgroundColor: "white" }}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          sx={{ padding: "15px 20px" }}
          onClick={handleAddTask}
        >
          <AddIcon />
        </Button>
      </Box>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        {tasks.map((task) => (
          <Box
            key={task.id}
            sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
          >
            {editingTask === task.id ? (
              <>
                <TextField
                  value={task.content}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, content: e.target.value } : t
                      )
                    )
                  }
                  fullWidth
                  sx={{ backgroundColor: "white", marginRight: "10px" }}
                />
                <Button
                  onClick={() => handleEditTask(task.id, task.content)}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography sx={{ flexGrow: 1 }}>{task.content}</Typography>
                <Button
                  onClick={() => setEditingTask(task.id)}
                  sx={{ marginRight: "10px" }}
                >
                  <EditIcon />
                </Button>
                <Button onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </Button>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default App;
