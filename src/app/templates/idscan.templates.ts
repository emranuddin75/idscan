/**
 * FULL TEMPLATE OVERRIDE for GBG IDScan WebSDK v23.1.0
 * Replaces ALL built-in UI screens (document, facematch, liveness, results)
 * Works with templateMapping in Angular KYC Component
 */

export const overrideTemplates = {

  // ===========================================================
  // SMART CAPTURE TEMPLATE (AUTO + MANUAL)
  // ===========================================================
  smart_capture: {
    type: "function",
    processor: "mustache",
    provider: () => `

      <div class="sc-wrapper">

        <div class="sc-header">
          <h2>{{PROVIDER_TITLE_SMART_CAPTURE}}</h2>

          <button 
            data-jcs-element="smart_capture__toggle_mode"
            class="sc-toggle-btn">
            Switch Mode
          </button>
        </div>

        <div class="sc-instructions">
          <p>{{SMART_CAPTURE_INITIALIZING}}</p>
          <p class="sc-subtext">{{SMART_CAPTURE_HINT_ALIGN}}</p>
        </div>

        <!-- AUTO SMART CAPTURE -->
        <div class="sc-camera-frame" data-jcs-element="smart_capture__auto_wrapper">

          <video 
            data-jcs-element="smart_capture__camera"
            autoplay playsinline
            class="sc-video">
          </video>

          <canvas 
            data-jcs-element="smart_capture__canvas"
            hidden>
          </canvas>

          <div 
            data-jcs-element="smart_capture__overlay"
            class="sc-frame-overlay">
            <img src="/assets/idscan-sdk/images/licence-good.svg"/>
          </div>
        </div>

        <!-- MANUAL CAPTURE -->
        <div 
          class="manual-capture" 
          data-jcs-element="manual_capture__container"
          hidden>

          <canvas data-jcs-element="manual__canvas" class="manual-canvas"></canvas>

          <div class="manual-buttons">
            <button class="manual-btn manual-retake" 
                    data-jcs-element="manual__retake">Retake</button>

            <button class="manual-btn manual-confirm"
                    data-jcs-element="manual__confirm">Use Photo</button>
          </div>
        </div>

        <!-- visual feedback -->
        <div class="sc-feedback-overlay">

          <div class="sc-feedback good" data-jcs-element="sc__good">
            <img src="/assets/idscan-sdk/images/licence-good.svg" />
            <p>Perfect!</p>
          </div>

          <div class="sc-feedback bad-angle" data-jcs-element="sc__bad_angle">
            <img src="/assets/idscan-sdk/images/licence-bad-angle.svg" />
            <p>Bad angle</p>
          </div>

          <div class="sc-feedback blur" data-jcs-element="sc__blur">
            <img src="/assets/idscan-sdk/images/licence-bad-blurred.svg" />
            <p>Blurry</p>
          </div>

          <div class="sc-feedback glare" data-jcs-element="sc__glare">
            <img src="/assets/idscan-sdk/images/licence-bad-covered.svg" />
            <p>Glare detected</p>
          </div>

        </div>

        <button data-jcs-element="smart_capture__start" hidden>Start</button>

        <div class="sc-status">
          <p data-jcs-element="smart_capture__status">...</p>
        </div>

      </div>

    `
  },



  // ===========================================================
  // LIVENESS TEMPLATE
  // ===========================================================
  liveness: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="live-wrapper">

        <h2>{{PROVIDER_TITLE_LIVENESS}}</h2>

        <video 
          data-jcs-element="live__camera"
          autoplay playsinline
          class="live-video">
        </video>

        <p class="live-action" data-jcs-element="live__action__message">...</p>

        <button 
          data-jcs-element="live__start"
          class="live-btn">
          {{LIVENESS_START}}
        </button>

        <p class="live-footer">
          {{REQUIRED_ACTION_KEEP_CAPTURING}}
        </p>

      </div>
    `
  },



  // ===========================================================
  // DOCUMENT RESULT (OVERRIDDEN)
  // ===========================================================
  document_result_step: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen">
        <h2>Document Processed</h2>

        <p>Your document has been successfully captured.</p>

        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__continue" class="next-btn">
          Continue
        </button>
      </div>
    `
  },



  // ===========================================================
  // FACEMATCH RESULT (OVERRIDDEN)
  // ===========================================================
  facematch_result_step: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen">
        <h2>Face Match Completed</h2>

        <p>Your face was matched against your ID.</p>

        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__continue" class="next-btn">
          Continue
        </button>
      </div>
    `
  },



  // ===========================================================
  // LIVENESS RESULT (OVERRIDDEN)
  // ===========================================================
  liveness_result_step: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen">
        <h2>Liveness Completed</h2>

        <p>Your liveness verification is complete.</p>

        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__continue" class="next-btn">
          Continue
        </button>
      </div>
    `
  },



  // ===========================================================
  // FINAL RESULT STEP (OVERRIDDEN & NO REDIRECT)
  // ===========================================================
  result_step: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen final">

        <h2>KYC Completed</h2>

        <p>All verifications completed successfully.</p>

        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__new__journey" class="next-btn">
          Start New Verification
        </button>
      </div>
    `
  },


  
  // ===========================================================
  // CAMERA (fallback provider)
  // ===========================================================
  camera: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2>{{PROVIDER_TITLE_CAMERA}}</h2>

      <video data-jcs-element="camera__stream" autoplay playsinline></video>

      <button data-jcs-element="camera__capture" class="button button--primary">
        {{CAMERA_CAPTURE}}
      </button>
    `
  },



  // ===========================================================
  // CROPPER (fallback)
  // ===========================================================
  cropper: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2>{{PROVIDER_TITLE_CROPPER}}</h2>

      <canvas data-jcs-element="cropper__canvas"></canvas>

      <button 
        data-jcs-element="cropper__retry"
        class="button button--secondary">
        {{CROPPER_RETRY}}
      </button>

      <button 
        data-jcs-element="cropper__upload"
        class="button button--primary">
        {{CROPPER_UPLOAD}}
      </button>
    `
  },

  results: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen">

        <h2>KYC Completed ✔</h2>

        <!-- Injects actual results from SDK -->
        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__new__journey"
                class="button button--primary">
          Start New Journey
        </button>
      </div>
    `
  }


};
