import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { StudentsService } from './students.service';
import { Cupo, CupoRegistro } from './entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<Array<Cupo>> {
    return await this.studentsService.findAll();
  }

  @Get('registers')
  @UseGuards(AuthGuard)
  async findAllRegister(): Promise<Array<CupoRegistro>> {
    return await this.studentsService.findAllRegister();
  }

  @Post('register')
  @UseGuards(AuthGuard)
  async registerCupo(@Body() { cupo_id }: { cupo_id: string }) {
    return await this.studentsService.parserCupoToCupoRegistro(cupo_id);
  }
}
