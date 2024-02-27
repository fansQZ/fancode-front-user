type EventListenerCallback<T = any> = (data: T) => void;

class EventDispatcher<T = any> {
  private listeners: { [event: string]: EventListenerCallback<T>[] };
  constructor() {
    this.listeners = {};
  }

  // 注册事件
  public on(event: string, callback: EventListenerCallback<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  // 移除事件
  public off(event: string, callback: EventListenerCallback<T>): void {
    if (!this.listeners[event]) return;
    const index = this.listeners[event].indexOf(callback);
    if (index > -1) {
      this.listeners[event].splice(index, 1);
    }
  }

  // 分发事件
  public dispatch(event: string, data: T): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }
}

// 使用示例
const dispatcher = new EventDispatcher<string>();
dispatcher.on('myEvent', (data) => {
  console.log(data); // data 类型为 string
});
dispatcher.dispatch('myEvent', 'Hello, World!');
