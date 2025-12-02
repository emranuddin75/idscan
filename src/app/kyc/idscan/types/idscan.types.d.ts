
declare global {
  interface Window {
    IDScan: any;
  }
}
export {};

declare interface JourneyConfig {
  container: string | HTMLElement;

  backendUrl: string;

  auth?: boolean;

  token?: string;                     // ✔ add this
  template?: any;                    // overrides
  dictionary?: Record<string, string>;

  onJourneyEvent?: (event: any) => void;
}

declare class JourneyContainer {
  constructor(config: JourneyConfig);

  initialize(): Promise<void>;
  destroy(): void;

  on(event: string, callback: (event: any) => void): void;
  sendAction(action: string, payload?: any): void;

  getState(): any;
}
