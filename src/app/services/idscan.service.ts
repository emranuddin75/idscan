import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IdScanService {

  async getWebSdkToken(): Promise<string> {
    // TODO: Replace with your real backend API call
    return "DEMO_TOKEN_FROM_BACKEND";
  }
}
