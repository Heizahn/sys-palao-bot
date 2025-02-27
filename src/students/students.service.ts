import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cupo, CupoRegistro } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Cupo)
    private readonly cupoRepository: Repository<Cupo>,
    @InjectRepository(CupoRegistro)
    private readonly cupoRegistroRepository: Repository<CupoRegistro>,
  ) {}

  async findAll(): Promise<Array<Cupo>> {
    return this.cupoRepository.find({
      order: {
        create_at: 'ASC',
      },
    });
  }

  async parserCupoToCupoRegistro(id: Cupo['id']) {
    const cupo = await this.cupoRepository.findOne({
      where: { id },
    });
    if (!cupo) {
      throw new Error('Cupo no encontrado');
    }
    try {
      const cupoRegistro = this.cupoRegistroRepository.create({
        ...cupo,
        create_at_register: new Date(),
      });
      await this.cupoRegistroRepository.save(cupoRegistro);
      await this.cupoRepository.delete({ id });
      return cupoRegistro;
    } catch (error) {
      console.error(error);
      throw new Error('Error al registrar el cupo');
    }
  }

  async findAllRegister(): Promise<Array<CupoRegistro>> {
    return this.cupoRegistroRepository.find({
      order: {
        create_at_register: 'DESC',
      },
    });
  }
}
