export class Messaging {
  sendMessage(message: string): void {
    console.log(message);
  }

  sendAlert(alert: string): void {
    console.log(`[Atention]: ${alert}`);
  }
}
