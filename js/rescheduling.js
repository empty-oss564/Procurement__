/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/rescheduling.js - Dynamic Delay Simulator & 25% Threshold Evaluation
 */

const ReschedulingModule = {
  currentSimulatedDelay: 90, // Default SIH demo delay

  /**
   * Initializes rescheduling simulator
   */
  init() {
    this.bindEvents();
    this.render();
  },

  /**
   * Binds custom delay input and buttons
   */
  bindEvents() {
    const customDelayInput = document.getElementById("customDelayInput");
    if (customDelayInput) {
      customDelayInput.addEventListener("input", (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 0) {
          this.setSimulatedDelay(val);
        }
      });
    }
  },

  /**
   * Sets the active simulated delay in minutes and re-evaluates rules
   * @param {number} delayMinutes
   */
  setSimulatedDelay(delayMinutes) {
    this.currentSimulatedDelay = Number(delayMinutes) || 0;
    this.render();
  },

  /**
   * Renders the threshold comparison box, evaluation results, and next slot computation
   */
  render() {
    const r = AppState.rescheduling;
    const f = AppState.farmer;
    const t = AppState.token;

    const travelMinutes = f.totalTravelMinutes || 300;
    const thresholdMinutes = ThresholdEngine.calculateThreshold(travelMinutes);
    const delayMinutes = this.currentSimulatedDelay;

    // Run 25% Threshold Rule Engine
    const evalResult = ThresholdEngine.evaluateDelay(delayMinutes, travelMinutes);

    // Compute dynamic ETA and new Slot
    const originalSlot = r.originalSlot || t.slotTime || "10:00 AM";
    const newEta = ThresholdEngine.computeNewTime(originalSlot, delayMinutes);
    
    // Pick next available slot after new ETA (e.g. 11:30 AM -> 12:00 PM)
    let newSlot = originalSlot;
    if (evalResult.isThresholdCrossed) {
      newSlot = "12:00 PM"; // Optimal slotted capacity
    }

    // Update UI Fields
    const origSlotElem = document.getElementById("reschedOrigSlot");
    const travelTimeElem = document.getElementById("reschedTravelTime");
    const threshElem = document.getElementById("reschedThreshold");
    const actualDelayElem = document.getElementById("reschedActualDelay");
    const decisionCard = document.getElementById("thresholdDecisionCard");

    if (origSlotElem) origSlotElem.textContent = originalSlot;
    if (travelTimeElem) travelTimeElem.textContent = `${ThresholdEngine.formatDuration(travelMinutes)} (${travelMinutes} mins)`;
    if (threshElem) threshElem.textContent = `${thresholdMinutes} mins (Fixed 25%)`;
    if (actualDelayElem) actualDelayElem.textContent = `${delayMinutes} mins`;

    // Highlight active delay preset button
    document.querySelectorAll(".delay-btn").forEach((btn) => {
      const val = parseInt(btn.getAttribute("data-delay"), 10);
      if (val === delayMinutes) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });

    if (decisionCard) {
      if (evalResult.isThresholdCrossed) {
        decisionCard.className = "threshold-decision-box decision-crossed";
        decisionCard.innerHTML = `
          <div class="decision-title">
            <span>⚠️ THRESHOLD CROSSED</span>
            <span class="badge badge-danger">Automatic Rescheduling Active</span>
          </div>
          <div class="comparison-math">
            Actual Delay (${delayMinutes} min) > 25% Buffer (${thresholdMinutes} min)
          </div>
          <p style="font-size: 0.88rem; color: #7f1d1d; margin: 0.5rem 0;">
            ${evalResult.message}
          </p>
          <div style="background: white; border: 1px solid var(--danger-border); border-radius: var(--radius-sm); padding: 0.75rem; margin-top: 0.75rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
            <div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Recalculated Arrival ETA</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--danger);">${newEta}</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Newly Assigned Procurement Slot</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${newSlot}</div>
            </div>
          </div>
        `;
      } else {
        decisionCard.className = "threshold-decision-box decision-minor";
        decisionCard.innerHTML = `
          <div class="decision-title">
            <span>✓ MINOR DELAY (WITHIN 25% BUFFER)</span>
            <span class="badge badge-success">Slot Maintained</span>
          </div>
          <div class="comparison-math">
            Actual Delay (${delayMinutes} min) &le; 25% Buffer (${thresholdMinutes} min)
          </div>
          <p style="font-size: 0.88rem; color: #14532d; margin: 0.5rem 0;">
            ${evalResult.message}
          </p>
          <div style="background: white; border: 1px solid var(--success-border); border-radius: var(--radius-sm); padding: 0.75rem; margin-top: 0.75rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
            <div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Updated Arrival ETA</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${newEta}</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Existing Confirmed Slot</div>
              <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${originalSlot} (Preserved)</div>
            </div>
          </div>
        `;
      }
    }
  },

  /**
   * Applies the current simulated delay scenario to the entire system
   */
  applyDelayScenario() {
    const f = AppState.farmer;
    const travelMinutes = f.totalTravelMinutes || 300;
    const thresholdMinutes = ThresholdEngine.calculateThreshold(travelMinutes);
    const delayMinutes = this.currentSimulatedDelay;
    const evalResult = ThresholdEngine.evaluateDelay(delayMinutes, travelMinutes);

    const originalSlot = AppState.rescheduling.originalSlot || AppState.token.slotTime || "10:00 AM";
    const newEta = ThresholdEngine.computeNewTime(originalSlot, delayMinutes);

    if (evalResult.isThresholdCrossed) {
      const newSlot = "12:00 PM";
      AppState.token.slotTime = newSlot;
      AppState.token.expectedArrivalTime = newEta;
      AppState.rescheduling.simulatedDelayMinutes = delayMinutes;
      AppState.rescheduling.isThresholdCrossed = true;
      AppState.rescheduling.newEta = newEta;
      AppState.rescheduling.newSlot = newSlot;
      AppState.save();

      NotificationsModule.add({
        title: "Dynamic Rescheduling Alert",
        message: `⚠️ Travel delay of ${delayMinutes} min exceeded your 25% threshold (${thresholdMinutes} min). ETA updated to ${newEta}. New Slot: ${newSlot}.`,
        category: "reschedule"
      });

      Toast.show(`⚠️ Threshold Crossed! Rescheduled to ${newSlot}`, "warning");
    } else {
      AppState.token.expectedArrivalTime = newEta;
      AppState.rescheduling.simulatedDelayMinutes = delayMinutes;
      AppState.rescheduling.isThresholdCrossed = false;
      AppState.rescheduling.newEta = newEta;
      AppState.rescheduling.newSlot = originalSlot;
      AppState.save();

      NotificationsModule.add({
        title: "Minor Delay Recorded",
        message: `Traffic delay of ${delayMinutes} min is within your 25% threshold buffer (${thresholdMinutes} min). Original slot ${originalSlot} maintained.`,
        category: "delay"
      });

      Toast.show(`✓ Minor delay: Slot ${originalSlot} maintained`, "success");
    }

    // Refresh affected views
    SchedulingModule.render();
    this.render();
  }
};
