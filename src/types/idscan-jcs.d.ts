// -------------------------------------------------------------
// GBG IDScan WebSDK – Full TypeScript Typings
// Author: ChatGPT (generated for Emran)
// -------------------------------------------------------------

declare module "*.min.js" {
  // ---------------------------
  // Top-level SDK Error Model
  // ---------------------------
  export interface JcsError {
    code: string;
    message: string;
    details?: any;
  }

  // ---------------------------
  // Core Journey State Machine
  // ---------------------------
  export type JourneyState =
    | "started"
    | "in_progress"
    | "awaiting_input"
    | "completed"
    | "failed"
    | "cancelled"
    | "ended"
    | string;

  export type FlowState =
    | "none"
    | "identity_front"
    | "identity_back"
    | "address"
    | "selfie"
    | "liveness"
    | string;

  export interface JourneyInfo {
    journeyId: string;
    state: JourneyState;
    flowState: FlowState;
    action?: string;
    actionAttempt?: number;
    timestamp?: number;
    metadata?: any;
  }

  // ---------------------------
  // Event Model
  // ---------------------------
  export interface JourneyEventBase {
    type: string;
    timestamp: number;
  }

  export interface InitializationEvent extends JourneyEventBase {
    type: "initializing";
    message: string;
  }

  export interface FlowStateChangedEvent extends JourneyEventBase {
    type: "flow_state";
    state: FlowState;
  }

  export interface JourneyStateChangedEvent extends JourneyEventBase {
    type: "journey_state";
    state: JourneyState;
  }

  export interface CaptureEvent extends JourneyEventBase {
    type: "capture";
    provider: string;
    result: any;
  }

  export interface LivenessEvent extends JourneyEventBase {
    type: "liveness_action";
    action: LivenessAction;
    result?: LivenessResult;
  }

  export type JourneyEvent =
    | InitializationEvent
    | FlowStateChangedEvent
    | JourneyStateChangedEvent
    | CaptureEvent
    | LivenessEvent
    | JourneyEventBase;

  // ---------------------------
  // Liveness
  // ---------------------------
  export type LivenessAction =
    | "Smile"
    | "Frown"
    | "TiltLeft"
    | "TiltRight"
    | "TiltUp"
    | "TiltDown"
    | "LookStraight"
    | "NO_ACTION"
    | string;

  export type LivenessResult =
    | "Failed"
    | "Passed"
    | "ActionTimedOut"
    | "Interrupted"
    | "Undefined";

  // ---------------------------
  // Template Override System
  // ---------------------------
  export interface TemplateOverride {
    type: "function" | "html";
    processor?: "mustache" | "none";
    provider: () => string;
  }

  export interface TemplateOverrideMap {
    [providerName: string]: TemplateOverride;
  }

  // ---------------------------
  // Translation Override System
  // ---------------------------
  export type TranslationMap = Record<string, string>;

  // ---------------------------
  // Provider Types
  // ---------------------------
  export type ProviderName =
    | "camera"
    | "filesystem"
    | "smartcapture"
    | "view"
    | "gateway"
    | "liveness"
    | "cropper"
    | "scanner"
    | "journeyselect"
    | "result";

  export interface ProviderConfig {
    enabled?: boolean;
    template?: string;
  }

  export interface ProvidersConfig {
    camera?: ProviderConfig;
    filesystem?: ProviderConfig;
    smartcapture?: ProviderConfig;
    view?: ProviderConfig;
    gateway?: ProviderConfig;
    liveness?: ProviderConfig;
    cropper?: ProviderConfig;
    scanner?: ProviderConfig;
    journeyselect?: ProviderConfig;
    result?: ProviderConfig;
    [provider: string]: ProviderConfig | undefined;
  }

  // ---------------------------
  // Main JourneyContainer Config
  // ---------------------------
  export interface JourneyConfig {
    backendUrl: string;
    username?: string;
    password?: string;
    language?: string;

    container: HTMLElement | string;

    templates?: TemplateOverrideMap;
    translations?: TranslationMap;

    providers?: ProvidersConfig;

    scanSettings?: {
      enableLiveness?: boolean;
      enableSmartCapture?: boolean;
      enableFileInput?: boolean;
      [setting: string]: any;
    };

    metadata?: Record<string, any>;
  }

  // ---------------------------
  // JourneyContainer Interface
  // ---------------------------
  export class JourneyContainer {
    constructor(config: JourneyConfig);

    // Core lifecycle
    initialize(): Promise<void>;
    destroy(): void;

    // Journey operations
    start(): Promise<void>;
    cancel(): Promise<void>;
    restart(): Promise<void>;

    // State access
    getJourneyInfo(): JourneyInfo;
    getState(): JourneyState;
    getFlowState(): FlowState;

    // Action dispatch
    sendAction(action: string, payload?: any): Promise<void>;

    // Event subscription
    on(
      eventName: string,
      callback: (event: JourneyEvent) => void
    ): void;

    off(
      eventName: string,
      callback: (event: JourneyEvent) => void
    ): void;

    // Developer utilities
    logState?(): void;
  }
}
