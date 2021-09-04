export interface MessagingProtocol {
  sendMessage(message: string): void;
  sendAlert(alert: string): void;
}
