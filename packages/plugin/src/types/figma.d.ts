declare namespace figma {
  function notify(message: string): void;

  interface UI {
    show(): void;
    hide(): void;
    resize(width: number, height: number): void;
    onmessage: (callback: (msg: any) => void) => void;
    postMessage(msg: any): void;
  }

  function showUI(html: string, options?: { width?: number; height?: number }): void;

  interface Widget {
    register(component: React.ComponentType): void;
  }

  const widget: Widget;
}