import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// TODO: complete this class

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private statesRepository: Repository<State>,
  ) {}

  async create(createStateDto: CreateStateDto) {
    const stateToSave = this.statesRepository.create({
      name: createStateDto.name.toLowerCase()
    });

    const response = await this.statesRepository.save(stateToSave);

    return response;
  }

  async findAll() {
    const states = await this.statesRepository.find({
      relations: {
        todos: true // TODO: add changing this with query param
      }
    });
    return states;
  }

  async findOne(id: number) {
    const state = await this.statesRepository.findOneBy({ id });
    return state;
  }

  async findByName(name: string) {
    const state = await this.statesRepository.findOneBy({ name: name.toLowerCase() });
    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto) {
    const result = await this.statesRepository.update(id, {
      name: updateStateDto.name.toLowerCase()
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.statesRepository.delete(id);
    return result;
  }
}
