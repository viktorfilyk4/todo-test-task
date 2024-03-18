import React, { MouseEventHandler, ReactNode } from "react"
import styles from "./SecondaryButton.module.css"

export default function SecondaryButton({
  onClickHandler,
  children
}: {
  onClickHandler: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}) {
  return <button className={styles.button} onClick={onClickHandler}>{children}</button>
}
