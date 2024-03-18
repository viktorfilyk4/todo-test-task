import React, { MouseEventHandler, ReactNode } from "react"
import styles from "./PrimaryButton.module.css"

// TODO: think about better naming (for other buttons too)
export default function PrimaryButton({
  onClickHandler,
  children
}: {
  onClickHandler: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}) {
  return (
    <button className={styles.button} onClick={onClickHandler}>
      {children}
    </button>
  )
}
