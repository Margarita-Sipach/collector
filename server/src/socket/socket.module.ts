import { Module } from '@nestjs/common';
import { ItemsService } from 'src/items/items.service';
import { AppGateway } from './socket.gateway';

@Module({
  imports: [AppGateway],
  controllers: [],
  providers: [],
})
export class GatewayModule {}