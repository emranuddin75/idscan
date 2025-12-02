import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdScanService } from '../services/idscan.service';
import { overrideTemplates } from '../templates/idscan.templates';
import { textTranslation } from '../translations/idscan.translations';

type JourneyEvent = string;

interface IJourneyEventMetaData {
  step?: string;
  target?: string;
  [key: string]: any;
}

interface IJourneyState {
  journey?: any;
  inputProvider?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-kyc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {

  private idscanService = inject(IdScanService);
  private ngZone = inject(NgZone)

  journeyCompleted = false;

  statusMessage = '';
  selectedDocType: string | null = null;
  journey: any;

  // Extracted values to show in Angular UI
  extracted = {
    licenceNumber: '',
    fullName: '',
    address: '',
    dob: '',
    issueDate: ''
  };

  ngOnInit(): void {}

  // -----------------------------------------------------
  // STEP 1 — USER SELECTS DOCUMENT TYPE
  // -----------------------------------------------------
  selectDocument(type: string) {
    this.selectedDocType = type;
    this.statusMessage = `Selected: ${type}`;
  }

  // -----------------------------------------------------
  // STEP 2 — START KYC
  // -----------------------------------------------------
  async startKyc(): Promise<void> {
    if (!this.selectedDocType) {
      this.statusMessage = "Please select Passport or Driving Licence";
      return;
    }

    this.statusMessage = "Initialising KYC...";

    try {
      // Token normally from API call
      const token = "lGooxwKKCx70jLXD74LlIBpI2e9RedmZcRoe_fd38mGZmoUhZqNVmk7qiHudphAZtYRKmFkKgXJpbiRs_JxbebXkWejumOqZNM8XC5qHmvQ0FD0Bfy9zCRDWlp89DA4mfRSwF48CuR6EtBDRu80f_pRi829ybKyLYeV3_bDiiQi8OLUdkS_wFU8uwxF1oltDxBPNzzF7C7ttMRdQcrz6xyGWAa5aHifGh5_CZQIrsNi2zUJNGuW49eP8GJ3LNJK8uzM-WIUmChRbEd0qyN8hWTBK_NWkfyf2DFJu3yJEtPlRsPytdpSFlTYoiG3asKaecWTazpiT9G_1K8vJd9NfVkPp9Dq1mkNpddLU7Dx872PnwXvwINJsYWoII7bY-yBpO9NLrI-ozktdqfi9KoaQ05Ky_i2J9jOPdKIj5InSn9ubOfWGNA-IoNp4KZTm7N5S-3UPQ3tJAK6vKD_S3aypi6kouZ66jsywHqdtj_B9bSUmnEDwYwooJNMbHasaP3oJ6EH87O17OiZkgGHFRAdcDnGOe3DeAplO-DZ6Ei3SeR1mI1mnidfCxEsfWUcbbVirRhXQutfVNu0kV_9FdChzBw"; //await this.idscanService.getWebSdkToken(); 


      const JC = (window as any).GBG?.Idscan?.JourneyContainer;
      if (!JC) {
        this.statusMessage = "IDScan SDK not loaded";
        return;
      }

      // ⭐ Correct WebSDK 23.1.0 configuration
      this.journey = new JC({
        container: '#idscanContainer',
        backendUrl: 'https://poc.idscan.cloud:443',
        token,
        auth: false,

        preventDefaultResultPage: true,  // ⭐ Stop classic GBG results page

        journeyDefinitions: {
          document: {
            allowedDocuments: [this.selectedDocType],
            captureBothSides: true,
            autoCapture: true,
            manualCapture: { enabled: false },
            enableFacematch: true,
            liveness: 'PASSIVE'
          }
        },

        smartCapture: {
          enabled: true,
          autoStart: true,
          timeout: 8000,
          workerScriptUrl: "/assets/idscan-sdk/ides-micro.js",
          asmScriptUrl: "/assets/idscan-sdk/idesmicro_asm.js",
          wasmScriptUrl: "/assets/idscan-sdk/idesmicro_asm.wasm"
        },

        inputProviders: {
          smartCapture: true,
          camera: false,
          filesystem: false
        },

        previewPages: {
          documentStep: { smartCapture: true }
        },

        template: overrideTemplates,
        dictionary: textTranslation,

        onJourneyEvent: (event: any, meta: any, state: any) =>  this.handleJourneyEvent(event, meta, state)
      });

      await this.journey.initialize();
      this.statusMessage = "KYC Started";

    } catch (err) {
      console.error("KYC Init Error:", err);
      this.statusMessage = "Failed to initialise KYC";
    }
  }

  // -----------------------------------------------------
  // EVENT HANDLER
  // -----------------------------------------------------
  private handleJourneyEvent(
    event: JourneyEvent,
    meta: IJourneyEventMetaData,
    state: IJourneyState
  ): void {
    console.log("EVENT:", event);
    console.log("META:", meta);
    console.log("STATE:", state);

    switch (event) {
      case "DISPLAY:STEP":
        console.log("DISPLAY STEP:", event, meta);

        // extract only when result page DOM is ready
        if (meta?.step === "result") {

          if (this.selectedDocType === "DRIVING_LICENSE") {
            this.extractDrivingLicenceFromDom();
          }

          this.statusMessage = "Document validated ✔";

          // ⭐ Trigger passive liveness here
          this.startPassiveLiveness();
        }
        break;

      case "JOURNEY:END":
        this.statusMessage = "KYC Complete ✔";
        break;
      
      case "LIVENESS:RESULT":
      case "LIVENESS:COMPLETE":
      case "FACEMATCH:RESULT":   // often used by passive liveness
        console.log("🎉 Passive liveness completed");
        this.statusMessage = "Liveness Complete ✔";
        this.journeyCompleted = true;
        break;
    }
  }

  private startPassiveLiveness() {
    try {
      console.log("➡ Starting passive liveness...");
      
      // ⭐ This works in WebSDK 23
      this.journey.startJourney("liveness");

      this.statusMessage = "Starting Liveness…";
    } catch (err) {
      console.warn("Passive liveness not available", err);
    }
  }



  private domField(name: string): string {
  const el = document.querySelector(
    `.extracted-field[data-field="${name}"] .info-item__value`
  ) as HTMLElement;

  return el?.textContent?.trim() || "";
}


  // -----------------------------------------------------
  // FIELD EXTRACTION FROM DOCUMENT
  // -----------------------------------------------------

private extractDrivingLicenceFromDom(): void {
  const field = (name: string) => {
    const el = document.querySelector(
      `.extracted-field[data-field="${name}"] .info-item__value`
    ) as HTMLElement;
    return el?.textContent?.trim() || "";
  };

  const licenceNumber = field("documentnumber");
  const firstName     = field("firstname");
  const lastName      = field("lastname");
  const addressFull   = field("addressfull");
  const dob           = field("birthdate");
  const issueDate     = field("issuedate");

  this.ngZone.run(() => {
    this.extracted = {
      licenceNumber,
      fullName: `${firstName} ${lastName}`.trim(),
      address: addressFull,
      dob,
      issueDate
    };
  });

  console.log("🔥 FINAL EXTRACTED DL FIELDS:", this.extracted);
}



  private extractDrivingLicence(): void {

    const licenceNumber = this.domField("documentnumber");
    const firstName     = this.domField("firstname");
    const lastName      = this.domField("lastname");
    const addressFull   = this.domField("addressfull");
    const dob           = this.domField("birthdate");
    const issueDate     = this.domField("issuedate");

    this.ngZone.run(() => {
      this.extracted = {
        licenceNumber,
        fullName: `${firstName} ${lastName}`.trim(),
        address: addressFull,
        dob,
        issueDate
      };
    });

    console.log("🔥 Extracted DL Fields:", this.extracted);
  }




  // -----------------------------------------------------
  // START LIVENESS AUTOMATICALLY
  // -----------------------------------------------------
  private startLiveness() {
    try {
      if (this.journey?.startLiveness) {
        this.journey.startLiveness();
        this.statusMessage = "Starting Liveness Check...";
      }
    } catch (e) {
      console.warn("Liveness start failed:", e);
    }
  }

  // -----------------------------------------------------
  // SMARTCAPTURE FEEDBACK OVERLAY (ANGLE/GLARE/BLUR)
  // -----------------------------------------------------
  private handleCameraCondition(evt: any) {
    const mapping: any = {
      capturing: "good",
      alignment: "bad_angle",
      blur: "blur",
      glare: "glare"
    };

    const element = mapping[evt.condition];
    if (!element) return;

    this.showFeedback(element);
  }

  private showFeedback(element: string) {
    const el = document.querySelector(`[data-jcs-element="sc__${element}"]`);
    if (!el) return;
    el.classList.add("active");
    setTimeout(() => el.classList.remove("active"), 1400);
  }
}
