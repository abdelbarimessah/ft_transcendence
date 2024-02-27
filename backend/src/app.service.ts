import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private userSocket = new Map<string, string>();

  set(key: string, value: any) {
    this.userSocket.set(key, value);
  }

  get(key: string) {
    return this.userSocket.get(key);
  }


  delete(key: string) {
    this.userSocket.delete(key);
  }

  getUserIdFromSocketId(clientId) {
    const userId = Array.from(this.userSocket.entries()).find(
      ([, value]) => value === clientId,
    )?.[0];
    return userId;
  }
}
