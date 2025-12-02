/**
 * GBG IDScan WebSDK Template Overrides – FULL OVERRIDE
 * Includes: SmartCapture + Document Result + Facematch Result + Liveness Result
 * Ensures the SDK NEVER loads its default UI stages.
 */

export const overrideTemplates = {

  // ============================================================
  // SMART CAPTURE (Your custom template – unchanged)
  // ============================================================
  smart_capture: {
    type: "function",
    processor: "mustache",
    provider: () => `

      <div class="sc-wrapper">

        <div class="sc-header">
          <h2 class="section-title">{{PROVIDER_TITLE_SMART_CAPTURE}}</h2>

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

        <!-- CAMERA VIEW -->
        <div class="sc-camera-frame">

          <video 
            data-jcs-element="smart_capture__camera"
            autoplay playsinline
            class="sc-video">
          </video>

          <canvas data-jcs-element="smart_capture__canvas" hidden></canvas>

          <div data-jcs-element="smart_capture__overlay"
              class="sc-frame-overlay">
            <img src="assets/idscan-sdk/images/licence-good.svg"/>
          </div>

        </div>

        <!-- MANUAL MODE -->
        <div class="manual-capture" data-jcs-element="manual__wrapper" hidden>
          <canvas data-jcs-element="manual__canvas" class="manual-canvas"></canvas>
          <div class="manual-buttons">
            <button class="manual-btn manual-retake" data-jcs-element="manual__retake">Retake</button>
            <button class="manual-btn manual-confirm" data-jcs-element="manual__confirm">Use Photo</button>
          </div>
        </div>

        <!-- CONDITIONS -->
        <div class="camera-conditions--container">
          <span data-jcs-element="camera__condition__capturing"
                class="camera-condition camera-condition--capturing">
            {{CAMERA_CONDITION_CAPTURING}}
          </span>

          <span data-jcs-element="camera__condition__alignment"
                class="camera-condition camera-condition--alignment">
            {{CAMERA_CONDITION_ALIGNMENT}}
          </span>

          <span data-jcs-element="camera__condition__blur"
                class="camera-condition camera-condition--blur">
            {{CAMERA_CONDITION_BLUR}}
          </span>

          <span data-jcs-element="camera__condition__glare"
                class="camera-condition camera-condition--glare">
            {{CAMERA_CONDITION_GLARE}}
          </span>

          <span data-jcs-element="camera__condition__low__resolution"
                class="camera-condition camera-condition--low-resolution">
            {{CAMERA_CONDITION_LOW_RESOLUTION}}
          </span>
        </div>

        <button data-jcs-element="smart_capture__start" hidden>Start</button>

        <div class="sc-status">
          <p data-jcs-element="smart_capture__status">...</p>
        </div>

        <div class="sc-feedback-overlay">

          <div class="sc-feedback good" data-jcs-element="sc__good">
            <img src="assets/idscan-sdk/images/licence-good.svg" />
            <p>Perfect!</p>
          </div>

          <div class="sc-feedback bad-angle" data-jcs-element="sc__bad_angle">
            <img src="assets/idscan-sdk/images/licence-bad-angle.svg" />
            <p>Bad angle</p>
          </div>

          <div class="sc-feedback blur" data-jcs-element="sc__blur">
            <img src="assets/idscan-sdk/images/licence-bad-blurred.svg" />
            <p>Blurry</p>
          </div>

          <div class="sc-feedback glare" data-jcs-element="sc__glare">
            <img src="assets/idscan-sdk/images/licence-bad-glare.svg" />
            <p>Glare detected</p>
          </div>

        </div>

      </div>

    `
  },

  // ============================================================
  // RESULT STEP OVERRIDES (ALL FOUR)
  // Ensures NO DEFAULT UI EVER LOADS
  // ============================================================

  document_result_step: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen">
        <h2>Document Scan Complete</h2>

        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__new__journey"
                class="button button--primary">Continue</button>
      </div>
    `
  },

  facematch_result_step: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen">
        <h2>Face Match Completed</h2>

        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__new__journey"
                class="button button--primary">Continue</button>
      </div>
    `
  },

  liveness_result_step: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen">
        <h2>Liveness Completed</h2>

        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__new__journey"
                class="button button--primary">Continue</button>
      </div>
    `
  },

  result_step: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <div class="custom-result-screen">
        <h2>KYC Completed</h2>

        <p>Your verification is complete.</p>

        <div data-jcs-element="results__container"></div>

        <button data-jcs-element="results__new__journey"
                class="button button--primary">
          Restart
        </button>
      </div>
    `
  },

 // FILESYSTEM
  filesystem: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2 class="section-title">{{PROVIDER_TITLE_FILESYSTEM}}</h2>

      <div class="info-container">
        <p class="info-item">
          <span>{{INFO_JOURNEY_STATE}}</span> 
          <span data-jcs-element="info__journey__state">...</span>
        </p>

        <p class="info-item">
          <span>{{INFO_JOURNEY_ACTION}}</span> 
          <span data-jcs-element="info__journey__action">...</span>
        </p>

        <p class="info-item">
          <span>{{INFO_JOURNEY_ACTION_ATTEMPT}}</span> 
          <span data-jcs-element="info__journey__action__attempt">...</span>
        </p>

        <p class="info-item">
          <span>{{INFO_JOURNEY_ID}}</span> 
          <span data-jcs-element="info__journey__id">...</span>
        </p>
      </div>

      <form class="file-input--container">
        <input 
          data-jcs-element="file__input" 
          class="file-input" 
          id="jcs__file__input" 
          type="file" 
        />
      </form>

      <label 
        data-jcs-element="file__drop__box" 
        class="file-input--alternatives" 
        for="jcs__file__input"
      >
        <span class="file-input--click">{{FILESYSTEM_SELECT}}</span>
        <span data-jcs-element="file__drop__label" class="file-input--drag">
          {{FILESYSTEM_DROP_IMAGE}}
        </span>
      </label>
    `
  },

  // VIEW TEMPLATE
  view: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2 class="section-title">{{PROVIDER_TITLE_VIEW}}</h2>

      <div class="info-container">
        <p>
          <span>{{INFO_JOURNEY_STATE}}</span> 
          <span data-jcs-element="info__journey__state">...</span>
        </p>

        <p>
          <span>{{INFO_JOURNEY_ACTION}}</span> 
          <span data-jcs-element="info__journey__action">...</span>
        </p>

        <p>
          <span>{{INFO_JOURNEY_ACTION_ATTEMPT}}</span> 
          <span data-jcs-element="info__journey__action__attempt">...</span>
        </p>
      </div>

      <div class="image-preview--container">
        <img 
          data-jcs-element="view__preview" 
          class="image-preview"
        >
      </div>

      <form class="button-container">
        <input 
          data-jcs-element="view__retry" 
          class="button button--secondary" 
          type="button" 
          value="{{VIEW_RETRY}}" 
        />

        <input 
          data-jcs-element="view__begin__crop" 
          class="button button--secondary" 
          type="button" 
          value="{{VIEW_CROP}}" 
        />

        <input 
          data-jcs-element="view__upload" 
          class="button button--primary" 
          type="button" 
          value="{{VIEW_UPLOAD}}" 
        />
      </form>

      <div data-jcs-element="view__status">
        <p data-jcs-element="view__status__message"></p>
      </div>
    `
  },

  // GATEWAY
  gateway: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2>{{PROVIDER_TITLE_GATEWAY}}</h2>

      <p>{{GATEWAY_CAMERA}}</p>

      <button 
        data-jcs-element="gateway__cancel" 
        class="button button--secondary"
      >
        {{GATEWAY_CANCEL}}
      </button>
    `
  },

  // LIVENESS
  liveness: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2>{{PROVIDER_TITLE_LIVENESS}}</h2>

      <video data-jcs-element="live__camera" autoplay playsinline></video>

      <div class="liveness-action">
        <p data-jcs-element="live__action__message">...</p>
      </div>

      <button 
        data-jcs-element="live__start" 
        class="button button--primary"
      >
        {{LIVENESS_START}}
      </button>

      <div class="liveness-footer">
        <p>{{REQUIRED_ACTION_KEEP_CAPTURING}}</p>
      </div>
    `
  },

  // CAMERA
  camera: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2>{{PROVIDER_TITLE_CAMERA}}</h2>

      <video 
        data-jcs-element="camera__stream" 
        autoplay 
        playsinline
      ></video>

      <div class="camera-status">
        <p>{{CAMERA_LOADING}}</p>
      </div>

      <button 
        data-jcs-element="camera__capture" 
        class="button button--primary"
      >
        {{CAMERA_CAPTURE}}
      </button>
    `
  },

  // CROPPER
  cropper: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2>{{PROVIDER_TITLE_CROPPER}}</h2>

      <canvas data-jcs-element="cropper__canvas"></canvas>

      <button 
        data-jcs-element="cropper__retry" 
        class="button button--secondary"
      >
        {{CROPPER_RETRY}}
      </button>

      <button 
        data-jcs-element="cropper__upload" 
        class="button button--primary"
      >
        {{CROPPER_UPLOAD}}
      </button>
    `
  },

  // JOURNEY SELECT
  journeyselect: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2>{{PROVIDER_TITLE_JOURNEY_SELECT}}</h2>

      <div data-jcs-element="journeyselect__list"></div>

      <button 
        data-jcs-element="journeyselect__continue" 
        class="button button--primary"
      >
        {{JOURNEY_SELECT_CONTINUE}}
      </button>
    `
  },


  // ------------------------------------------------------------
  // SCANNER
  // ------------------------------------------------------------
  scanner: {
    type: "function",
    processor: "mustache",
    provider: () => `
      <h2>{{PROVIDER_TITLE_SCANNER}}</h2>

      <p data-jcs-element="scanner__desc">...</p>

      <button 
        data-jcs-element="scanner__action" 
        class="button button--primary"
      ></button>
    `
  }
};
