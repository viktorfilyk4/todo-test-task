import React from "react"
import styles from "./TodoInput.module.css"

export default function TodoInput({
  onChangeHandler,
  inputValue,
  disabled = true
}: {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>
  inputValue: string,
  disabled?: boolean
}) {
  return (
    <input
      className={styles.input}
      type='text'
      placeholder="Enter text for this todo..."
      value={inputValue}
      disabled={disabled}
      onChange={onChangeHandler}
    />
  )
}
