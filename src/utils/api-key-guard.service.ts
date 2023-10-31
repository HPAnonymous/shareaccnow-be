import { ApiKeyService } from '@/api-key/api-key.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const key = req.headers['x-api-key'] ?? req.query.api_key

    return this.apiKeyService.validateApiKey(key)
  }
}
