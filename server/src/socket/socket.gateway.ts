import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "src/users-items/comments.model";
import { APIService } from "src/base/api.service";
import { ItemsService } from "src/items/items.service";
@WebSocketGateway({
  cors: true,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor() {}

  @SubscribeMessage("comment")
  async handleMessage(client: Socket, payload) {
    this.server.emit("comment", payload);
  }

  afterInit(server: Server) {
    console.log("Init");
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
