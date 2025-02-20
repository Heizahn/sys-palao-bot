import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cupo } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Cupo)
    private readonly cupoRepository: Repository<Cupo>,
  ) {}

  async findAll(): Promise<Array<Cupo>> {
    return this.cupoRepository.find({
      order: {
        create_at: 'ASC',
      },
    });
  }
}
