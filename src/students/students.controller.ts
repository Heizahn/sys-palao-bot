import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { StudentsService } from './students.service';
import { Cupo } from './entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Array<Cupo>> {
    return await this.studentsService.findAll();
  }
}
