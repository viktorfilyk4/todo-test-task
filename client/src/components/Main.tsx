import React, { useEffect, useState } from "react"
import TodosListBox from "./TodosListBox"
import styles from "./Main.module.css"

// TODO: move types to separate file

export type StateName = "backlog" | "in_progress" | "done"

export type Todo = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  stateId: number
}

export type State = {
  id: number
  name: StateName
  todos: Todo[]
}

type TodosGetRequestResponse = State[]

export default function Main() {
  const [states, setStates] = useState<State[]>([])

  useEffect(() => {
    async function fetchStates(): Promise<TodosGetRequestResponse> {
      const res = await fetch("http://localhost:3000/states") // TODO: move url to env variables
      const data = await res.json()
      return data
    }

    // TODO: handle exceptions and validation (other fetches too)
    fetchStates()
      .then((data) => {
        setStates(data)
      })
      .catch((err) => {})
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.descriptionContainer}>
        <h1>Todo Board</h1>
        <p className={styles.description}>Board description</p>
      </div>
      <div className={styles.listsContainer}>
        {[...states].sort((a, b) => a.id - b.id).map((state) => {
          return (
            <TodosListBox
              key={state.id}
              stateId={state.id}
              stateName={state.name}
              stateTodos={state.todos}
            />
          )
        })}
      </div>
    </div>
  )
}
