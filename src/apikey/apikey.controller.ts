import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApikeyService } from './apikey.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api-keys')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApikeyService) {}

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async createApiKey(
    @Body(new ValidationPipe({ transform: true }))
    createApiKeyDto: CreateApiKeyDto,
  ) {
    return this.apiKeyService.generateApiKey(createApiKeyDto);
  }
}
