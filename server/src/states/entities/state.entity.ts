import { Todo } from "src/todos/entities/todo.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Todo, (todo) => todo.state)
  todos: Todo[]
}
