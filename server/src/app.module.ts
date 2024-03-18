import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { StatesModule } from './states/states.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    DbModule,
    TodosModule,
    StatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
