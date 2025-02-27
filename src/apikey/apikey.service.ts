import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { ApiKey } from './entities/api-key-entity';
import { CreateApiKeyDto } from './dto/create-api-key.dto';

const scryptAsync = promisify(scrypt);

@Injectable()
export class ApikeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  private async hashApiKey(key: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scryptAsync(key, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  private async verifyApiKey(key: string, hash: string): Promise<boolean> {
    const [salt, storedHash] = hash.split(':');
    const derivedKey = (await scryptAsync(key, salt, 64)) as Buffer;
    const storedHashBuffer = Buffer.from(storedHash, 'hex');
    return timingSafeEqual(derivedKey, storedHashBuffer);
  }

  async generateApiKey(
    createApiKeyDto: CreateApiKeyDto,
  ): Promise<{ apiKey: string }> {
    const prefix = 'sk_bot_';
    const randomKey = randomBytes(24).toString('hex');
    const apiKey = `${prefix}${randomKey}`;
    const keyHash = await this.hashApiKey(apiKey);

    const apiKeyEntity = this.apiKeyRepository.create({
      ...createApiKeyDto,
      keyHash,
    });
    await this.apiKeyRepository.save(apiKeyEntity);

    // Solo retornamos la apiKey una vez
    return { apiKey };
  }

  async validateApiKey(key: string): Promise<boolean> {
    const apiKeyEntity = await this.apiKeyRepository.findOne({
      where: { isActive: true },
    });

    if (!apiKeyEntity) return false;

    const isValid = await this.verifyApiKey(key, apiKeyEntity.keyHash);

    if (isValid) {
      apiKeyEntity.lastUsed = new Date();
      await this.apiKeyRepository.save(apiKeyEntity);
    }

    return isValid;
  }
}
