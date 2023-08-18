export class NotificationDTO {
  id: string;
  type: string;
  parameters: string[];
  isRead: boolean;

  constructor(id?: string, type?: string, parameters?: string[], isRead?: boolean) {
    this.id = id || '';
    this.type = type || '';
    this.parameters = parameters || [];
    this.isRead = isRead || false;
  }
}
