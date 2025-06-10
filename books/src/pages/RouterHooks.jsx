
import React, { useReducer, useEffect, useRef } from "react";

const initialForm = {
  name: "Amelie",
  surname: "Grob",
  age: 18,
};

function formReducer(state, action) {
  switch (action.type) {
    case "incremented_age":
      return { ...state, age: state.age + 1 };
    case "decremented_age":
      return { ...state, age: state.age - 1 };
    case "changed_name":
      return { ...state, name: action.nextName };
    case "changed_surname":
      return { ...state, surname: action.nextSurName };
    default:
      throw new Error("Acción desconocida: " + action.type);
  }
}

// Reducer para el cronómetro
const initialClock = { time: 0, running: false };

function clockReducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, running: true };
    case "stop":
      return { ...state, running: false };
    case "reset":
      return { time: 0, running: false };
    case "tick":
      return { ...state, time: state.time + 1 };
    default:
      throw new Error("Acción desconocida: " + action.type);
  }
}

export default function RouterHooks() {
  const [form, dispatchForm] = useReducer(formReducer, initialForm);
  const [clock, dispatchClock] = useReducer(clockReducer, initialClock);
  const intervalRef = useRef(null);

  // useEffect para manejar el tiempo del reloj
  useEffect(() => {
    if (clock.running) {
      intervalRef.current = setInterval(() => {
        dispatchClock({ type: "tick" });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [clock.running]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Ejercicio 2: Router & Hooks</h2>
      <h1>Person Profile Form</h1>
      <label>Nombre:</label>
      <input
        value={form.name}
        onChange={(e) =>
          dispatchForm({ type: "changed_name", nextName: e.target.value })
        }
      />
      <label>Apellido:</label>
      <input
        value={form.surname}
        onChange={(e) =>
          dispatchForm({ type: "changed_surname", nextSurName: e.target.value })
        }
      />
      <div>
        <button onClick={() => dispatchForm({ type: "incremented_age" })}>
          + Edad
        </button>
        <button onClick={() => dispatchForm({ type: "decremented_age" })}>
          - Edad
        </button>
      </div>
      <p><strong>Nombre:</strong> {form.name}</p>
      <p><strong>Apellido:</strong> {form.surname}</p>
      <p><strong>Edad:</strong> {form.age}</p>

      <hr />

      <h1>Cronómetro</h1>
      <p><strong>Segundos:</strong> {clock.time}</p>
      <button onClick={() => dispatchClock({ type: "start" })}>Start</button>
      <button onClick={() => dispatchClock({ type: "stop" })}>Stop</button>
      <button onClick={() => dispatchClock({ type: "reset" })}>Reset</button>
    </div>
  );
}
