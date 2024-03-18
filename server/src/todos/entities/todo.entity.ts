import { State } from 'src/states/entities/state.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @CreateDateColumn()
  createdAt: any;

  @UpdateDateColumn()
  updatedAt: any;

  @Column('int')
  stateId: number;

  @ManyToOne(() => State, (state) => state.todos)
  @JoinColumn({ name: 'stateId' })
  state: State;
}
