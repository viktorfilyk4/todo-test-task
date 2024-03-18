import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      const result = await this.todosService.create(createTodoDto);

      // TODO: make standartized response object for all handlers
      return {
        statusCode: HttpStatus.CREATED,
        entity: result,
      };
    } catch (error) {
      // This exception is optional, due to Global Exception Layer,
      // But we can add some logger here later or provide error message in response

      // The same for other methods

      throw new InternalServerErrorException();
    }
  }

  // TODO: add query param to return todos with or without `states` relation (others methods too)
  @Get()
  async findAll() {
    try {
      const allTodos = await this.todosService.findAll();

      return {
        statusCode: HttpStatus.OK,
        todos: allTodos,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.todosService.findOne(id);

      return {
        statusCode: HttpStatus.OK,
        todo: !!result ? result : {},
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    try {
      const result = await this.todosService.update(id, updateTodoDto);

      if (result.affected === 0) {
        return {
          statusCode: HttpStatus.OK,
          message: `No entity with id ${id} found`,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: `Entity with id ${id} updated`,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.todosService.remove(id);

      if (result.affected === 0) {
        return {
          statusCode: HttpStatus.OK,
          message: `No entity with id ${id} found`,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: `Entity with id ${id} deleted`,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
