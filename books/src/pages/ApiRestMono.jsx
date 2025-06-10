import React, { useState, useEffect, createContext, useContext } from "react";
import { Container, Card, Checkbox, Button, Form, Divider } from "semantic-ui-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = "https://64a77b7b0c6d844abedf962d.mockapi.io/api/v1/todo";
const ApiContext = createContext();
const useApiContext = () => useContext(ApiContext);

function CreateTodo() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [due, setDue] = useState("");
  const { addTodo } = useApiContext();

  const handleSubmit = () => {
    if (!text.trim() || !author.trim()) return alert("Completa los campos");
    addTodo({ id: uuidv4(), text, author, due, completed: false });
    setText("");
    setAuthor("");
    setDue("");
  };

  return (
    <Form>
      <Form.Field>
        <label>Texto</label>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Escribe un texto" />
      </Form.Field>
      <Form.Field>
        <label>Autor</label>
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor" />
      </Form.Field>
      <Form.Field>
        <label>Fecha de entrega</label>
        <input type="date" value={due} onChange={e => setDue(e.target.value)} />
      </Form.Field>
      <Button onClick={handleSubmit} primary>Agregar Todo</Button>
    </Form>
  );
}

function UpdateTodo({ todo }) {
  const { updateTodo } = useApiContext();
  return (
    <Checkbox toggle checked={todo.completed} onChange={() => updateTodo(todo.id)} />
  );
}

function DeleteTodo({ todo }) {
  const { deleteTodo } = useApiContext();
  return (
    <Button color="red" onClick={() => deleteTodo(todo.id)}>Eliminar</Button>
  );
}

function ReadTodos() {
  const { todos } = useApiContext();

  if (!todos.length) return <p>No hay tareas aún.</p>;

  return (
    <Card.Group>
      {todos.map(todo => (
        <Card key={todo.id} fluid>
          <Card.Content>
            <Card.Header>{todo.text}</Card.Header>
            <Card.Meta>Autor: {todo.author}</Card.Meta>
            <Card.Description>Entrega: {todo.due || "Sin fecha"}</Card.Description>
            <UpdateTodo todo={todo} />
          </Card.Content>
          <Card.Content extra>
            <DeleteTodo todo={todo} />
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}

export default function ApiRestMono() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error("Error al obtener todos:", error);
    }
  }

  async function addTodo(newTodo) {
    try {
      const res = await axios.post(API_URL, newTodo);
      setTodos(prev => [...prev, res.data]);
    } catch (error) {
      console.error("Error al agregar todo:", error);
    }
  }

  async function updateTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    try {
      const updated = { ...todo, completed: !todo.completed };
      await axios.put(`${API_URL}/${id}`, updated);
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Error al actualizar todo:", error);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error al eliminar todo:", error);
    }
  }

  return (
    <ApiContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      <Container style={{ marginTop: "2em" }}>
        <h2>Ejercicio 5: API Rest Mono</h2>
        <CreateTodo />
        <Divider />
        <ReadTodos />
      </Container>
    </ApiContext.Provider>
  );
}
