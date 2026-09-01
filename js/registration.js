/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/registration.js - Farmer Registration & Live Travel Threshold
 */

const RegistrationModule = {
  /**
   * Initializes the registration form event listeners and UI bindings
   */
  init() {
    this.bindEvents();
    this.renderCropOptions();
    this.renderCentreOptions();
    this.loadCurrentState();
    this.updateThresholdPreview();
  },

  /**
   * Binds form input change events for instant threshold calculations
   */
  bindEvents() {
    const hoursInput = document.getElementById("regTravelHours");
    const minsInput = document.getElementById("regTravelMins");
    const cropSelect = document.getElementById("regCrop");
    const form = document.getElementById("farmerRegistrationForm");
    const fillPresetBtn = document.getElementById("btnFillDemoFarmer");

    if (hoursInput) {
      hoursInput.addEventListener("input", () => this.updateThresholdPreview());
    }
    if (minsInput) {
      minsInput.addEventListener("input", () => this.updateThresholdPreview());
    }
    if (cropSelect) {
      cropSelect.addEventListener("change", () => this.updateCropMspBadge());
    }
    if (form) {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }
    if (fillPresetBtn) {
      fillPresetBtn.addEventListener("click", () => this.fillDemoPreset());
    }
  },

  /**
   * Populates the crop selection dropdown with available MSP rates
   */
  renderCropOptions() {
    const cropSelect = document.getElementById("regCrop");
    if (!cropSelect) return;

    cropSelect.innerHTML = "";
    Object.keys(MSP_RATES).forEach((cropName) => {
      const crop = MSP_RATES[cropName];
      const opt = document.createElement("option");
      opt.value = cropName;
      opt.textContent = `${cropName} (MSP: ₹${crop.ratePerQuintal.toLocaleString('en-IN')}/Qtl - ${crop.category})`;
      if (cropName === "Wheat") opt.selected = true;
      cropSelect.appendChild(opt);
    });
    this.updateCropMspBadge();
  },

  /**
   * Populates the preferred procurement centre dropdown
   */
  renderCentreOptions() {
    const centreSelect = document.getElementById("regPreferredCentre");
    if (!centreSelect) return;

    centreSelect.innerHTML = "";
    SAMPLE_CENTRES.forEach((centre) => {
      const opt = document.createElement("option");
      opt.value = centre.id;
      opt.textContent = `${centre.name} (${centre.distanceKm} km, Queue: ${centre.currentQueue})`;
      centreSelect.appendChild(opt);
    });
  },

  /**
   * Dynamically calculates and displays the 25% threshold in real-time as farmer types
   */
  updateThresholdPreview() {
    const hours = parseInt(document.getElementById("regTravelHours")?.value, 10) || 0;
    const mins = parseInt(document.getElementById("regTravelMins")?.value, 10) || 0;

    const totalMinutes = ThresholdEngine.calculateTotalMinutes(hours, mins);
    const thresholdMinutes = ThresholdEngine.calculateThreshold(totalMinutes);

    // Update UI Elements
    const totalMinsElem = document.getElementById("previewTotalTravelTime");
    const thresholdElem = document.getElementById("previewThresholdTime");
    const formattedDurationElem = document.getElementById("previewFormattedDuration");
    const ruleSummaryElem = document.getElementById("previewRuleSummary");

    if (totalMinsElem) totalMinsElem.textContent = `${totalMinutes} mins`;
    if (thresholdElem) thresholdElem.textContent = `${thresholdMinutes} mins`;
    if (formattedDurationElem) formattedDurationElem.textContent = ThresholdEngine.formatDuration(totalMinutes);

    if (ruleSummaryElem) {
      ruleSummaryElem.innerHTML = `
        <strong>25% Buffer Guarantee:</strong> If traffic or road delay is &le; <strong>${thresholdMinutes} mins</strong>, your slot remains locked. 
        If delay exceeds <strong>${thresholdMinutes} mins</strong>, the system dynamically reassigns the next optimal slot.
      `;
    }
  },

  /**
   * Updates MSP badge when crop selection changes
   */
  updateCropMspBadge() {
    const cropSelect = document.getElementById("regCrop");
    const badge = document.getElementById("cropMspBadge");
    if (!cropSelect || !badge) return;

    const selectedCrop = cropSelect.value;
    const cropData = MSP_RATES[selectedCrop];
    if (cropData) {
      badge.textContent = `Official MSP: ₹${cropData.ratePerQuintal.toLocaleString('en-IN')}/Quintal (Std. Moisture: &le; ${cropData.stdMoistureMax}%)`;
    }
  },

  /**
   * Handles form validation and state persistence
   * @param {Event} e
   */
  handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("regFarmerName")?.value.trim();
    const mobile = document.getElementById("regMobile")?.value.trim();
    const village = document.getElementById("regVillage")?.value.trim();
    const district = document.getElementById("regDistrict")?.value.trim();
    const crop = document.getElementById("regCrop")?.value;
    const quantity = parseFloat(document.getElementById("regQuantity")?.value);
    const unit = document.getElementById("regUnit")?.value || "kg";
    const preferredCentreId = document.getElementById("regPreferredCentre")?.value;
    const travelHours = parseInt(document.getElementById("regTravelHours")?.value, 10) || 0;
    const travelMinutes = parseInt(document.getElementById("regTravelMins")?.value, 10) || 0;

    // Validation
    if (!name) {
      alert("Please enter the Farmer's full name.");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!quantity || quantity <= 0) {
      alert("Please enter a valid positive harvest quantity.");
      return;
    }
    const totalTravelMinutes = ThresholdEngine.calculateTotalMinutes(travelHours, travelMinutes);
    if (totalTravelMinutes <= 0) {
      alert("Please enter a valid expected travel time greater than 0 minutes.");
      return;
    }

    const thresholdMinutes = ThresholdEngine.calculateThreshold(totalTravelMinutes);

    // Save to App State
    const farmerData = {
      name,
      mobile,
      village: village || "Gram Panchayat",
      district: district || "District Mandi",
      crop,
      quantity,
      unit,
      preferredCentreId,
      travelHours,
      travelMinutes,
      totalTravelMinutes,
      thresholdMinutes
    };

    AppState.farmer = farmerData;

    // Also update procurement status state with new quantity & crop
    const mspData = MSP_RATES[crop] || { ratePerQuintal: 2425 };
    const quantityInKg = unit === "quintal" ? quantity * 100 : quantity;
    
    AppState.procurementStatus.crop = crop;
    AppState.procurementStatus.submittedQuantityKg = quantityInKg;
    AppState.procurementStatus.acceptedQuantityKg = Math.round(quantityInKg * 0.7); // 70% demo default
    AppState.procurementStatus.rejectedQuantityKg = Math.round(quantityInKg * 0.3); // 30% demo default
    AppState.procurementStatus.mspRatePerQuintal = mspData.ratePerQuintal;
    AppState.procurementStatus.acceptedQuintals = Math.round((AppState.procurementStatus.acceptedQuantityKg / 100) * 100) / 100;
    AppState.procurementStatus.totalPayableAmount = Math.round(AppState.procurementStatus.acceptedQuintals * mspData.ratePerQuintal * 100) / 100;

    AppState.rescheduling.expectedTravelMinutes = totalTravelMinutes;
    AppState.rescheduling.thresholdMinutes = thresholdMinutes;

    AppState.save();

    // Trigger Notification
    NotificationsModule.add({
      title: "Farmer Registered Successfully",
      message: `${name} registered for ${quantity} ${unit} of ${crop}. Expected Travel: ${ThresholdEngine.formatDuration(totalTravelMinutes)} (25% Buffer: ${thresholdMinutes} mins).`,
      category: "registration"
    });

    Toast.show(`Farmer ${name} registered! 25% Threshold is ${thresholdMinutes} mins.`, "success");

    // Re-render other views that depend on registration
    RecommendationModule.render();
    StatusModule.render();
    ReschedulingModule.render();

    // Switch to Centre Recommendation Section
    App.navigateTo("recommendation");
  },

  /**
   * Pre-fills the form with standard SIH demo scenario
   */
  fillDemoPreset() {
    document.getElementById("regFarmerName").value = "Ramesh Patel";
    document.getElementById("regMobile").value = "9876543210";
    document.getElementById("regVillage").value = "Pipariya";
    document.getElementById("regDistrict").value = "Bhopal";
    document.getElementById("regCrop").value = "Wheat";
    document.getElementById("regQuantity").value = "100";
    document.getElementById("regUnit").value = "kg";
    document.getElementById("regPreferredCentre").value = "CTR-A";
    document.getElementById("regTravelHours").value = "5";
    document.getElementById("regTravelMins").value = "0";

    this.updateThresholdPreview();
    this.updateCropMspBadge();
    Toast.show("Standard SIH Demo Scenario loaded: 5 hrs travel time -> 75 min threshold.", "info");
  },

  /**
   * Loads current state into form fields
   */
  loadCurrentState() {
    const f = AppState.farmer;
    if (!f) return;

    if (document.getElementById("regFarmerName")) document.getElementById("regFarmerName").value = f.name || "";
    if (document.getElementById("regMobile")) document.getElementById("regMobile").value = f.mobile || "";
    if (document.getElementById("regVillage")) document.getElementById("regVillage").value = f.village || "";
    if (document.getElementById("regDistrict")) document.getElementById("regDistrict").value = f.district || "";
    if (document.getElementById("regCrop")) document.getElementById("regCrop").value = f.crop || "Wheat";
    if (document.getElementById("regQuantity")) document.getElementById("regQuantity").value = f.quantity || 100;
    if (document.getElementById("regUnit")) document.getElementById("regUnit").value = f.unit || "kg";
    if (document.getElementById("regPreferredCentre")) document.getElementById("regPreferredCentre").value = f.preferredCentreId || "CTR-A";
    if (document.getElementById("regTravelHours")) document.getElementById("regTravelHours").value = f.travelHours !== undefined ? f.travelHours : 5;
    if (document.getElementById("regTravelMins")) document.getElementById("regTravelMins").value = f.travelMinutes !== undefined ? f.travelMinutes : 0;
  }
};
