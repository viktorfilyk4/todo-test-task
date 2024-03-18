import { IsDefined, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateTodoDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsDefined()
  @IsInt()
  // `state` table should be already populated with 3 states with id [1, 2, 3]
  @Min(1) 
  @Max(3)
  readonly stateId: number;
}
