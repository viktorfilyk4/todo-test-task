import React, { useState } from "react"
import TodoBox, { TodosPatchRequestResponse } from "./TodoBox"
import TodoInput from "./TodoInput"
import PrimaryButton from "./buttons/PrimaryButton"
import SecondaryButton from "./buttons/SecondaryButton"
import EventButton from "./buttons/EventButton"
import { StateName, Todo } from "./Main"
import styles from "./TodosListBox.module.css"
import Plus from "../assets/plus.svg"
import Close from "../assets/close.svg"

// TODO: make standartized types for all responses and move to separate file
type TodosPostRequestResponse = {
  statusCode: number
  entity: Todo
}

type TodosDeleteRequestResponse = TodosPatchRequestResponse

export default function TodosListBox({
  stateId,
  stateName,
  stateTodos
}: {
  stateId: number
  stateName: StateName
  stateTodos: Todo[]
}) {
  const [isAddingNewTodo, setIsAddingNewTodo] = useState(false)
  const [newTodoInput, setNewTodoInput] = useState("")
  const [listTodos, setListTodos] = useState<Todo[]>(stateTodos)

  const createTodoHandler = (e: React.SyntheticEvent) => {
    setIsAddingNewTodo(false)

    if (newTodoInput.length === 0) {
      return
    }

    async function createTodo(): Promise<TodosPostRequestResponse> {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newTodoInput,
          stateId
        })
      })
      const data = await res.json()
      return data
    }

    setNewTodoInput("")

    // TODO: handle validation and exceptions
    createTodo().then((data) => {
      setListTodos((listTodos) => [...listTodos, data.entity])
    })
  }

  const deleteTodoHandler = (id: number) => (e: React.SyntheticEvent) => {
    async function deleteTodo(): Promise<TodosDeleteRequestResponse> {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
      })

      const data = await res.json()
      return data
    }

    deleteTodo().then((data) => {
      setListTodos(listTodos.filter((todo) => todo.id !== id))
    })
  }

  return (
    <div className={styles.listBoxContainer}>
      {/* must be sticked */}
      <div className={styles.listBoxNameContainer}>
        <p className={styles.listBoxName}>{stateName}</p>
      </div>

      {/* this wrapper needed for scroll */}
      <div className={styles.scrollContainer}>
        <div className={styles.todosContainer}>
          {[...listTodos]
            .sort((a, b) => a.id - b.id)
            .map((todo) => (
              <TodoBox
                key={todo.id}
                id={todo.id}
                text={todo.title}
                deleteTodoHandler={deleteTodoHandler}
              />
            ))}
        </div>
        {/* Adding new todo section */}
        <div hidden={!isAddingNewTodo}>
          <TodoInput
            inputValue={newTodoInput}
            onChangeHandler={(e) => setNewTodoInput(e.target.value)}
            disabled={false}
          />
          <div>
            <PrimaryButton onClickHandler={createTodoHandler}>
              <Plus />
              <span>Add todo</span>
            </PrimaryButton>
            <EventButton
              onClickHandler={() => {
                setIsAddingNewTodo(false)
                setNewTodoInput("")
              }}
            >
              <Close />
            </EventButton>
          </div>
        </div>
      </div>

      {/* this button will be sticked to bottom */}
      <div className={styles.addTodoContainer} hidden={isAddingNewTodo}>
        <SecondaryButton onClickHandler={() => setIsAddingNewTodo(true)}>
          <Plus />
          <span>Add a todo</span>
        </SecondaryButton>
      </div>
    </div>
  )
}
