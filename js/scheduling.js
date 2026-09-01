/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/scheduling.js - Token Generation & Slot Allocation
 */

const SchedulingModule = {
  selectedSlot: "10:00 AM",

  /**
   * Initializes the scheduling module
   */
  init() {
    this.render();
  },

  /**
   * Renders the token pass, slot selector grid, and summary
   */
  render() {
    const centre = AppState.selectedCentre || SAMPLE_CENTRES[0];
    const token = AppState.token || DEFAULT_DEMO_STATE.token;
    const farmer = AppState.farmer || DEFAULT_DEMO_STATE.farmer;

    // Update Token Display Card
    const tokenBadge = document.getElementById("tokenBadgeDisplay");
    const centreNameElem = document.getElementById("tokenCentreName");
    const dateElem = document.getElementById("tokenDateDisplay");
    const arrivalTimeElem = document.getElementById("tokenArrivalTime");
    const procTimeElem = document.getElementById("tokenProcTime");
    const queuePosElem = document.getElementById("tokenQueuePos");
    const completionElem = document.getElementById("tokenCompletionTime");

    if (tokenBadge) tokenBadge.textContent = token.number || "KP-024";
    if (centreNameElem) centreNameElem.textContent = centre.name;
    if (dateElem) dateElem.textContent = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    if (arrivalTimeElem) arrivalTimeElem.textContent = token.slotTime || this.selectedSlot;
    if (procTimeElem) procTimeElem.textContent = `~${token.estimatedProcessingMinutes || 15} minutes`;
    if (queuePosElem) queuePosElem.textContent = `#${token.currentQueuePosition || 5} in slot queue`;
    
    // Calculate expected completion time
    if (completionElem) {
      const completionTime = ThresholdEngine.computeNewTime(token.slotTime || this.selectedSlot, 20);
      completionElem.textContent = completionTime;
    }

    // Render Slots Grid
    this.renderSlots();
  },

  /**
   * Renders time slot buttons with availability status
   */
  renderSlots() {
    const container = document.getElementById("slotsGridContainer");
    if (!container) return;

    container.innerHTML = "";
    const activeSlot = AppState.token?.slotTime || this.selectedSlot;

    DEFAULT_TIME_SLOTS.forEach((slot) => {
      const isSelected = slot.time === activeSlot;
      const btn = document.createElement("div");
      btn.className = `slot-btn ${isSelected ? "selected" : ""}`;
      btn.onclick = () => this.selectSlot(slot.time);

      btn.innerHTML = `
        <div class="slot-time">${slot.time}</div>
        <div class="slot-status">${slot.capacity} (${slot.availableSpots} left)</div>
      `;

      container.appendChild(btn);
    });
  },

  /**
   * Selects a time slot and updates token schedule
   * @param {string} slotTime
   */
  selectSlot(slotTime) {
    this.selectedSlot = slotTime;
    AppState.token.slotTime = slotTime;
    AppState.token.expectedArrivalTime = slotTime;
    AppState.rescheduling.originalSlot = slotTime;
    AppState.save();

    NotificationsModule.add({
      title: "Procurement Slot Confirmed",
      message: `Slot confirmed for ${slotTime} at ${AppState.selectedCentre?.name || 'Mandi'}. Token: ${AppState.token.number}.`,
      category: "token"
    });

    Toast.show(`Slot confirmed for ${slotTime}!`, "success");
    this.render();
  },

  /**
   * Generates a new random token number
   */
  generateNewToken() {
    const prefix = AppState.selectedCentre?.id.replace("CTR-", "") || "KP";
    const randomNum = Math.floor(10 + Math.random() * 90);
    const newTokenStr = `${prefix}-0${randomNum}`;

    AppState.token.number = newTokenStr;
    AppState.token.slotTime = this.selectedSlot;
    AppState.token.currentQueuePosition = Math.floor(3 + Math.random() * 6);
    AppState.save();

    Toast.show(`New Token Generated: ${newTokenStr}`, "info");
    this.render();
  },

  /**
   * Displays the Digital Token Pass Modal
   */
  showTokenPassModal() {
    const modal = document.getElementById("tokenPassModal");
    if (!modal) return;

    const modalToken = document.getElementById("modalTokenNumber");
    const modalFarmer = document.getElementById("modalFarmerName");
    const modalMobile = document.getElementById("modalFarmerMobile");
    const modalCrop = document.getElementById("modalCropDetails");
    const modalCentre = document.getElementById("modalCentreName");
    const modalSlot = document.getElementById("modalSlotTime");
    const modalThreshold = document.getElementById("modalThresholdInfo");

    const f = AppState.farmer;
    const t = AppState.token;
    const c = AppState.selectedCentre;

    if (modalToken) modalToken.textContent = t.number;
    if (modalFarmer) modalFarmer.textContent = f.name;
    if (modalMobile) modalMobile.textContent = f.mobile;
    if (modalCrop) modalCrop.textContent = `${f.quantity} ${f.unit} of ${f.crop}`;
    if (modalCentre) modalCentre.textContent = c.name;
    if (modalSlot) modalSlot.textContent = t.slotTime;
    if (modalThreshold) modalThreshold.textContent = `${f.totalTravelMinutes} mins expected travel (25% Buffer: ${f.thresholdMinutes} mins)`;

    modal.classList.add("active");
  },

  /**
   * Closes the Digital Token Pass Modal
   */
  closeTokenPassModal() {
    const modal = document.getElementById("tokenPassModal");
    if (modal) modal.classList.remove("active");
  }
};
