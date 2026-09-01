/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/tracking.js - Multi-Stage Procurement Milestone Tracking
 */

const TrackingModule = {
  /**
   * Initializes tracking timeline
   */
  init() {
    this.render();
  },

  /**
   * Renders the 9-stage procurement milestone timeline and action controls
   */
  render() {
    const tracking = AppState.tracking || DEFAULT_DEMO_STATE.tracking;
    const container = document.getElementById("timelineStepsContainer");
    const actionBtnArea = document.getElementById("trackingActionButtons");
    const currentStatusBadge = document.getElementById("trackingCurrentStatusBadge");

    if (!container) return;

    container.innerHTML = "";

    tracking.steps.forEach((step, idx) => {
      const isCompleted = idx < tracking.currentStepIndex;
      const isActive = idx === tracking.currentStepIndex;
      const isPending = idx > tracking.currentStepIndex;

      const stepEl = document.createElement("div");
      stepEl.className = `timeline-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""} ${isPending ? "pending" : ""}`;

      let markerIcon = isCompleted ? "✓" : isActive ? "⚙️" : (idx + 1);

      stepEl.innerHTML = `
        <div class="timeline-marker">${markerIcon}</div>
        <div class="timeline-content">
          <div class="timeline-header">
            <div class="timeline-title">${step.name}</div>
            <div class="timeline-time">${step.timestamp || '--'}</div>
          </div>
          <p style="font-size: 0.84rem; margin: 0.25rem 0; color: var(--text-main);">${step.details}</p>
          <div style="margin-top: 0.4rem;">
            ${isCompleted ? `<span class="badge status-completed">✓ Completed</span>` : 
              isActive ? `<span class="badge status-processing"><span class="pulse-dot"></span> IN PROGRESS</span>` : 
              `<span class="badge status-pending">Pending</span>`}
          </div>
        </div>
      `;

      container.appendChild(stepEl);
    });

    // Update Overall Status Badge
    if (currentStatusBadge) {
      const activeStep = tracking.steps[tracking.currentStepIndex] || tracking.steps[tracking.steps.length - 1];
      if (tracking.currentStepIndex >= tracking.steps.length - 1) {
        currentStatusBadge.className = "badge status-completed";
        currentStatusBadge.textContent = "✓ ALL STAGES COMPLETED";
      } else {
        currentStatusBadge.className = "badge status-processing";
        currentStatusBadge.innerHTML = `<span class="pulse-dot"></span> Current Stage: ${activeStep.name}`;
      }
    }

    // Render Contextual Action Buttons
    if (actionBtnArea) {
      actionBtnArea.innerHTML = "";
      const currIdx = tracking.currentStepIndex;

      if (currIdx === 3) {
        actionBtnArea.innerHTML = `
          <button class="btn btn-primary" onclick="TrackingModule.advanceToStep(4, 'Arrived at Mandi Gate')">
            📍 Mark Farmer Arrived at Centre
          </button>
        `;
      } else if (currIdx === 4) {
        actionBtnArea.innerHTML = `
          <button class="btn btn-primary" onclick="TrackingModule.advanceToStep(5, 'Document & Crop Verification Completed')">
            📑 Start & Complete Verification
          </button>
        `;
      } else if (currIdx === 5) {
        actionBtnArea.innerHTML = `
          <button class="btn btn-primary" onclick="TrackingModule.advanceToStep(6, 'Weighbridge Gross & Tare Completed')">
            ⚖️ Complete Weighbridge Measurement
          </button>
        `;
      } else if (currIdx === 6) {
        actionBtnArea.innerHTML = `
          <button class="btn btn-accent" onclick="TrackingModule.advanceToStep(7, 'Quality Grading & Final Acceptance')">
            🌾 Complete Quality Grading & Procurement
          </button>
        `;
      } else if (currIdx === 7) {
        actionBtnArea.innerHTML = `
          <button class="btn btn-primary" onclick="TrackingModule.advanceToStep(8, 'DBT Payment Disbursed')">
            💳 Proceed to Payment Settlement
          </button>
        `;
      } else if (currIdx >= 8) {
        actionBtnArea.innerHTML = `
          <button class="btn btn-outline-primary btn-sm" onclick="TrackingModule.resetTracking()">
            🔄 Reset Tracking Timeline
          </button>
          <button class="btn btn-accent btn-sm" onclick="App.navigateTo('status')">
            📄 View Official Procurement Status & Receipt
          </button>
        `;
      }
    }
  },

  /**
   * Advances tracking state to a specific step index
   * @param {number} nextIndex
   * @param {string} customMsg
   */
  advanceToStep(nextIndex, customMsg) {
    const tracking = AppState.tracking;
    const nowTimeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    if (nextIndex < tracking.steps.length) {
      tracking.currentStepIndex = nextIndex;
      tracking.steps[nextIndex].timestamp = nowTimeStr;
      AppState.save();

      const stepName = tracking.steps[nextIndex].name;
      NotificationsModule.add({
        title: `Procurement Milestone: ${stepName}`,
        message: customMsg || `Stage updated to ${stepName} at ${nowTimeStr}.`,
        category: "tracking"
      });

      Toast.show(`Milestone Reached: ${stepName}`, "success");
      this.render();

      // If completed procurement, update status module
      if (nextIndex === 7 || nextIndex === 8) {
        StatusModule.render();
      }
    }
  },

  /**
   * Resets tracking to Travelling state
   */
  resetTracking() {
    AppState.tracking = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.tracking));
    AppState.save();
    Toast.show("Tracking reset to departure milestone.", "info");
    this.render();
  }
};
