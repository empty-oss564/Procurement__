/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/status.js - Farmer Procurement Status, MSP Payable & DBT Payment Pipeline
 */

const StatusModule = {
  PAYMENT_STAGES: [
    { stage: 1, name: "Payment Not Initiated", statusClass: "badge-pending", desc: "Awaiting final weighbridge and quality grading closure." },
    { stage: 2, name: "Procurement Verified", statusClass: "badge-info", desc: "Quality certificates approved by Mandi Assayer." },
    { stage: 3, name: "Payment Initiated", statusClass: "badge-processing", desc: "Payable order generated on PFMS / Agri-DBT Portal." },
    { stage: 4, name: "Payment Processing", statusClass: "badge-warning", desc: "Bank clearinghouse batch processing Aadhaar transfer." },
    { stage: 5, name: "Payment Completed (PAID)", statusClass: "badge-completed", desc: "Funds credited directly to farmer's Aadhaar linked bank account." }
  ],

  /**
   * Initializes status module
   */
  init() {
    this.bindEvents();
    this.render();
  },

  /**
   * Binds interactive quality adjustment inputs
   */
  bindEvents() {
    const subInput = document.getElementById("statusSubmittedQty");
    const accInput = document.getElementById("statusAcceptedQty");
    const rejReasonInput = document.getElementById("statusRejectionReason");

    if (subInput) {
      subInput.addEventListener("input", () => this.handleQuantityChange());
    }
    if (accInput) {
      accInput.addEventListener("input", () => this.handleQuantityChange());
    }
    if (rejReasonInput) {
      rejReasonInput.addEventListener("input", (e) => {
        AppState.procurementStatus.rejectionReason = e.target.value;
        AppState.save();
      });
    }
  },

  /**
   * Handles dynamic live calculation when demo quantities change
   */
  handleQuantityChange() {
    const subVal = parseFloat(document.getElementById("statusSubmittedQty")?.value) || 0;
    let accVal = parseFloat(document.getElementById("statusAcceptedQty")?.value) || 0;

    // Safety bounds
    if (accVal > subVal) accVal = subVal;
    const rejVal = Math.max(0, subVal - accVal);

    const rejElem = document.getElementById("statusRejectedQtyDisplay");
    if (rejElem) rejElem.textContent = `${rejVal} kg`;

    const crop = AppState.procurementStatus.crop || "Wheat";
    const mspData = MSP_RATES[crop] || { ratePerQuintal: 2425 };
    const acceptedQuintals = Math.round((accVal / 100) * 100) / 100;
    const totalPayable = Math.round(acceptedQuintals * mspData.ratePerQuintal * 100) / 100;

    AppState.procurementStatus.submittedQuantityKg = subVal;
    AppState.procurementStatus.acceptedQuantityKg = accVal;
    AppState.procurementStatus.rejectedQuantityKg = rejVal;
    AppState.procurementStatus.acceptedQuintals = acceptedQuintals;
    AppState.procurementStatus.totalPayableAmount = totalPayable;
    AppState.save();

    this.render();
  },

  /**
   * Renders the procurement status cards, calculations, payment pipeline, and receipt
   */
  render() {
    const ps = AppState.procurementStatus || DEFAULT_DEMO_STATE.procurementStatus;
    const f = AppState.farmer || DEFAULT_DEMO_STATE.farmer;
    const c = AppState.selectedCentre || SAMPLE_CENTRES[0];
    const cropName = ps.crop || f.crop || "Wheat";
    const mspData = MSP_RATES[cropName] || { ratePerQuintal: 2425 };

    // Metric elements
    const cropElem = document.getElementById("procCropName");
    const subElem = document.getElementById("procSubmittedDisplay");
    const accElem = document.getElementById("procAcceptedDisplay");
    const rejElem = document.getElementById("procRejectedDisplay");
    const reasonBox = document.getElementById("procRejectionReasonBox");
    const reasonText = document.getElementById("procRejectionReasonText");

    const mspRateElem = document.getElementById("procMspRate");
    const acceptedQtlElem = document.getElementById("procAcceptedQuintals");
    const totalPayableElem = document.getElementById("procTotalPayable");

    const procStateBadge = document.getElementById("procStateBadge");
    const payStateBadge = document.getElementById("procPaymentStateBadge");

    if (cropElem) cropElem.textContent = cropName;
    if (subElem) subElem.textContent = `${ps.submittedQuantityKg} kg (${(ps.submittedQuantityKg / 100).toFixed(2)} Qtl)`;
    if (accElem) accElem.textContent = `${ps.acceptedQuantityKg} kg`;
    if (rejElem) rejElem.textContent = `${ps.rejectedQuantityKg} kg`;

    if (reasonBox && reasonText) {
      if (ps.rejectedQuantityKg > 0) {
        reasonBox.style.display = "block";
        reasonText.textContent = ps.rejectionReason || "Quality parameters / moisture beyond acceptable limit";
      } else {
        reasonBox.style.display = "none";
      }
    }

    if (mspRateElem) mspRateElem.textContent = `₹${mspData.ratePerQuintal.toLocaleString('en-IN')}`;
    if (acceptedQtlElem) acceptedQtlElem.textContent = `${ps.acceptedQuintals} Qtl (${ps.acceptedQuantityKg} kg)`;
    if (totalPayableElem) totalPayableElem.textContent = `₹${ps.totalPayableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    if (procStateBadge) {
      procStateBadge.className = "badge status-completed";
      procStateBadge.textContent = "✓ PROCUREMENT COMPLETED";
    }

    // Render Payment Stages Pipeline
    this.renderPaymentPipeline();

    // Render Inputs in Edit Box
    const subInput = document.getElementById("statusSubmittedQty");
    const accInput = document.getElementById("statusAcceptedQty");
    const rejReasonInput = document.getElementById("statusRejectionReason");

    if (subInput && document.activeElement !== subInput) subInput.value = ps.submittedQuantityKg;
    if (accInput && document.activeElement !== accInput) accInput.value = ps.acceptedQuantityKg;
    if (rejReasonInput && document.activeElement !== rejReasonInput) rejReasonInput.value = ps.rejectionReason || "";
  },

  /**
   * Renders the 5-step interactive DBT payment pipeline
   */
  renderPaymentPipeline() {
    const container = document.getElementById("paymentPipelineContainer");
    const stageDescElem = document.getElementById("paymentCurrentStageDesc");
    const payActionBtnArea = document.getElementById("paymentActionButtons");
    if (!container) return;

    container.innerHTML = "";
    const currentStage = AppState.procurementStatus.paymentStage || 4;

    this.PAYMENT_STAGES.forEach((item) => {
      const isCompleted = item.stage < currentStage;
      const isActive = item.stage === currentStage;
      const isPending = item.stage > currentStage;

      const stepEl = document.createElement("div");
      stepEl.className = `pay-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""} ${isPending ? "pending" : ""}`;

      let icon = isCompleted ? "✓" : item.stage;

      stepEl.innerHTML = `
        <div class="pay-circle">${icon}</div>
        <div class="pay-step-name">${item.name}</div>
      `;

      container.appendChild(stepEl);
    });

    const activeStageInfo = this.PAYMENT_STAGES.find(s => s.stage === currentStage) || this.PAYMENT_STAGES[0];
    if (stageDescElem) {
      stageDescElem.innerHTML = `
        <strong>Current Stage: ${activeStageInfo.name}</strong> &mdash; ${activeStageInfo.desc}
      `;
    }

    // Payment Action Button
    if (payActionBtnArea) {
      payActionBtnArea.innerHTML = "";
      if (currentStage < 5) {
        payActionBtnArea.innerHTML = `
          <button class="btn btn-primary" onclick="StatusModule.advancePaymentStage()">
            ⚡ Advance to Next Stage (${currentStage + 1}/5)
          </button>
          <button class="btn btn-accent" onclick="StatusModule.setPaymentStage(5)">
            ✓ Fast Track Direct Benefit Transfer (PAID)
          </button>
        `;
      } else {
        payActionBtnArea.innerHTML = `
          <button class="btn btn-accent btn-lg" onclick="StatusModule.showReceiptModal()">
            📄 View Official Digital e-Receipt & DBT Tax Invoice
          </button>
          <button class="btn btn-outline-primary btn-sm" onclick="StatusModule.setPaymentStage(1)">
            🔄 Reset Payment Flow
          </button>
        `;
      }
    }
  },

  /**
   * Advances payment to the next stage in pipeline
   */
  advancePaymentStage() {
    const ps = AppState.procurementStatus;
    if (ps.paymentStage < 5) {
      ps.paymentStage += 1;
      const stageInfo = this.PAYMENT_STAGES.find(s => s.stage === ps.paymentStage);
      ps.paymentStatus = (ps.paymentStage === 5) ? "PAID" : "Processing";
      AppState.save();

      NotificationsModule.add({
        title: `Payment Update: ${stageInfo.name}`,
        message: stageInfo.desc + ` Amount: ₹${ps.totalPayableAmount.toLocaleString('en-IN')}`,
        category: "payment"
      });

      Toast.show(`Payment Stage: ${stageInfo.name}`, ps.paymentStage === 5 ? "success" : "info");
      this.render();
    }
  },

  /**
   * Directly sets payment stage
   * @param {number} stageNum
   */
  setPaymentStage(stageNum) {
    const ps = AppState.procurementStatus;
    ps.paymentStage = stageNum;
    ps.paymentStatus = (stageNum === 5) ? "PAID" : "Processing";
    AppState.save();

    if (stageNum === 5) {
      NotificationsModule.add({
        title: "DBT Payment Completed Successfully",
        message: `₹${ps.totalPayableAmount.toLocaleString('en-IN')} credited to bank account (Txn: ${ps.transactionId}).`,
        category: "payment"
      });
      Toast.show("✓ DBT Payment Successfully Completed!", "success");
    }

    this.render();
  },

  /**
   * Populates and opens the official digital receipt modal
   */
  showReceiptModal() {
    const modal = document.getElementById("receiptModal");
    if (!modal) return;

    const f = AppState.farmer;
    const ps = AppState.procurementStatus;
    const c = AppState.selectedCentre;
    const t = AppState.token;
    const mspData = MSP_RATES[ps.crop] || { ratePerQuintal: 2425 };

    // Fill Receipt Fields
    document.getElementById("recTxnId").textContent = ps.transactionId;
    document.getElementById("recDate").textContent = ps.paymentDate || new Date().toLocaleString('en-IN');
    document.getElementById("recFarmerName").textContent = f.name;
    document.getElementById("recFarmerMobile").textContent = `+91 ${f.mobile}`;
    document.getElementById("recFarmerLocation").textContent = `${f.village}, ${f.district}`;
    document.getElementById("recCentreName").textContent = c.name;
    document.getElementById("recCentreIncharge").textContent = c.inCharge;
    document.getElementById("recToken").textContent = t.number;
    document.getElementById("recCrop").textContent = `${ps.crop} (FAQ Quality)`;

    document.getElementById("recSubmittedQty").textContent = `${ps.submittedQuantityKg} kg (${(ps.submittedQuantityKg / 100).toFixed(2)} Qtl)`;
    document.getElementById("recAcceptedQty").textContent = `${ps.acceptedQuantityKg} kg (${ps.acceptedQuintals} Qtl)`;
    document.getElementById("recRejectedQty").textContent = `${ps.rejectedQuantityKg} kg`;
    document.getElementById("recRejectionReason").textContent = ps.rejectedQuantityKg > 0 ? ps.rejectionReason : "None (100% Quality Pass)";

    document.getElementById("recMspRate").textContent = `₹${mspData.ratePerQuintal.toLocaleString('en-IN')} / Quintal`;
    document.getElementById("recCalculationFormula").textContent = `${ps.acceptedQuintals} Qtl × ₹${mspData.ratePerQuintal}`;
    document.getElementById("recTotalAmount").textContent = `₹${ps.totalPayableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    document.getElementById("recBankInfo").textContent = `${ps.bankName} (Aadhaar Seeded)`;
    document.getElementById("recPaymentMethod").textContent = ps.paymentMethod;

    modal.classList.add("active");
  },

  /**
   * Closes the receipt modal
   */
  closeReceiptModal() {
    const modal = document.getElementById("receiptModal");
    if (modal) modal.classList.remove("active");
  },

  /**
   * Prints the official receipt
   */
  printReceipt() {
    window.print();
  }
};
