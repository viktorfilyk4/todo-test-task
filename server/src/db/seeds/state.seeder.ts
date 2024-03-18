import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { State } from 'src/states/entities/state.entity';

export default class StateSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const repository = dataSource.getRepository(State);

    const result = await repository.find();
    if (result.length > 0) return;

    for (const name of ['backlog', 'in_progress', 'done']) {
      await repository.insert({ name })
    }
  }
}
