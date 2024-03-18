import React, { MouseEventHandler, ReactNode } from "react"
import styles from './EventButton.module.css'

export default function EventButton({
  onClickHandler,
  children
}: {
  onClickHandler: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}) {
  return <button className={styles.button} onClick={onClickHandler}>{children}</button>
}
