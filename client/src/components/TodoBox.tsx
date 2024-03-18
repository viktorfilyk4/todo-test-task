import React, { SyntheticEvent, useRef, useState } from "react"
import TagBadge from "./TagBadge"
import PrimaryButton from "./buttons/PrimaryButton"
import TodoInput from "./TodoInput"
import EventButton from "./buttons/EventButton"
import styles from "./TodoBox.module.css"
import Pencil from "../assets/pencil.svg"
import Close from "../assets/close.svg"
import Trash from "../assets/trash.svg"

export type TodosPatchRequestResponse = {
  statusCode: number
  message: string
}

export default function TodoBox({
  text,
  id,
  deleteTodoHandler
}: {
  text: string
  id: number
  deleteTodoHandler: (id: number) => React.MouseEventHandler<HTMLButtonElement>
}) {
  const [inputValue, setInputValue] = useState(text)
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)

  const prevInputValueRef = useRef(text)

  const saveTodoHandler = (e: SyntheticEvent) => {
    setIsEditButtonClicked(false)

    if (prevInputValueRef.current === inputValue) return

    async function patchTodo(): Promise<TodosPatchRequestResponse> {
      const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: inputValue
        })
      })

      const data = await res.json()
      return data
    }

    // TODO: exceptions and validation
    patchTodo().then((data) => {
      setInputValue(inputValue)
      prevInputValueRef.current = inputValue
    })
  }

  const closeEditHandler = (e: SyntheticEvent) => {
    // TODO: check if it's ok to call two setState functions in one place (other places too)
    setIsEditButtonClicked(false)
    setInputValue(prevInputValueRef.current)
  }

  return (
    <div className={styles.box}>
      <TodoInput
        onChangeHandler={(e) => setInputValue(e.target.value)}
        inputValue={inputValue}
        disabled={!isEditButtonClicked}
      />
      <TagBadge>Critical</TagBadge>
      <span hidden={isEditButtonClicked}>
        <EventButton onClickHandler={(e) => setIsEditButtonClicked(true)}>
          <Pencil />
        </EventButton>
      </span>
      <div className={styles.editButtons} hidden={!isEditButtonClicked}>
        {/* TODO: implement this functionality later */}
        {/* <PrimaryButton onClickHandler={(e) => {}}>
          <span>{"*arrow*"}</span>
          <span>Move to ...</span>
        </PrimaryButton>
        <PrimaryButton onClickHandler={(e) => {}}>
          <span>{"*arrow*"}</span>
          <span>Move to ...</span>
        </PrimaryButton> */}
        <PrimaryButton onClickHandler={saveTodoHandler}>
          <span>Save</span>
        </PrimaryButton>
        <PrimaryButton onClickHandler={deleteTodoHandler(id)}>
          <Trash />
          <span>Delete</span>
        </PrimaryButton>
        <EventButton onClickHandler={closeEditHandler}>
          <Close />
        </EventButton>
      </div>
    </div>
  )
}
