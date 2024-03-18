import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

// TODO: Think of - instead of returning `id` in response body from DB, change to some `hash_id`

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    // the same as const todo1 = new Todo(), todo.title = '...', todo.stateId = 12
    const todoToCreate = this.todosRepository.create({
      title: createTodoDto.title,
      stateId: createTodoDto.stateId,
    }); // TODO: this or `{ createTodoDto }` ??? (other methods too)

    const result = await this.todosRepository.save(todoToCreate);

    return result
  }

  async findAll() {
    const todos = await this.todosRepository.find({
      relations: {
        state: true, // TODO: add changing this with query param
      },
    });
    return todos;
  }

  async findOne(id: number) {
    const result = await this.todosRepository.findOneBy({ id });
    return result
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const result = await this.todosRepository.update(id, {
      title: updateTodoDto.title,
      stateId: updateTodoDto.stateId,
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.todosRepository.delete(id);
    return result;
  }
}
