import React, { ReactNode } from "react"
import styles from "./TagBadge.module.css"

export default function TagBadge({ children }: { children: ReactNode }) {
  return <span className={styles.tagBadge}>{children}</span>
}
