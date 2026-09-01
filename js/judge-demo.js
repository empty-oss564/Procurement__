/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/judge-demo.js - 16-Step Guided Demonstration Walkthrough
 */

const JudgeDemoModule = {
  currentStep: 1,
  totalSteps: 16,
  autoPlayInterval: null,

  DEMO_STEPS: [
    {
      step: 1,
      title: "Step 1: Farmer Profile & Harvest Registration",
      desc: "Farmer Ramesh Patel registers with 100 kg of Wheat harvest. The farmer selects his home district (Bhopal) and basic verification details.",
      sectionId: "registration",
      actionDesc: "Navigating to Registration form and pre-filling standard farmer harvest data.",
      highlight: "Enables digital record keeping, eliminates middlemen, and prevents unregistered grain dumping at Mandi yards.",
      execute: () => {
        RegistrationModule.fillDemoPreset();
      }
    },
    {
      step: 2,
      title: "Step 2: Farmer Enters Expected Travel Time (5 Hours)",
      desc: "Crucial Design Principle: The farmer manually enters 5 Hours 00 Minutes based on actual village road conditions, tractor speed, and weather.",
      sectionId: "registration",
      actionDesc: "Setting Expected Travel Time to 5 hours (300 minutes).",
      highlight: "No rigid computer-forced travel estimations. Empowering farmers with their local grassroots ground truth.",
      execute: () => {
        document.getElementById("regTravelHours").value = "5";
        document.getElementById("regTravelMins").value = "0";
        RegistrationModule.updateThresholdPreview();
      }
    },
    {
      step: 3,
      title: "Step 3: System Automatically Calculates 25% Threshold (75 Min)",
      desc: "The system enforces the 25% mathematical buffer rule: 300 minutes × 25% = 75 minutes threshold buffer. The farmer cannot tamper with this rule.",
      sectionId: "registration",
      actionDesc: "Calculating 25% buffer limit = 75 minutes.",
      highlight: "Guarantees a fair grace period for unavoidable traffic or road bottlenecks before penalty or queue forfeiture.",
      execute: () => {
        RegistrationModule.updateThresholdPreview();
      }
    },
    {
      step: 4,
      title: "Step 4: Smart Multi-Centre Recommendation",
      desc: "Evaluating 4 regional APMC Mandis using our composite algorithm combining travel distance, active queue size, and processing capacity.",
      sectionId: "recommendation",
      actionDesc: "Displaying AI recommendation scorecard across all nearby procurement centres.",
      highlight: "Distributes farmer traffic evenly across regional Mandis, preventing massive bottlenecks at single centres.",
      execute: () => {
        RecommendationModule.render();
      }
    },
    {
      step: 5,
      title: "Step 5: Procurement Centre Selection",
      desc: "Farmer selects Centre A: Kisan Pragati Mandi (8 km distance, 18 vehicle queue, 55 min wait).",
      sectionId: "recommendation",
      actionDesc: "Selecting Centre A (Kisan Pragati Mandi).",
      highlight: "Transparent visibility into centre capacity and waiting times before leaving the farm.",
      execute: () => {
        RecommendationModule.selectCentre("CTR-A");
      }
    },
    {
      step: 6,
      title: "Step 6: Digital Token Generation (KP-024)",
      desc: "A unique cryptographically verifiable token KP-024 is issued to farmer Ramesh Patel.",
      sectionId: "scheduling",
      actionDesc: "Generating Token KP-024 and computing arrival timetable.",
      highlight: "Provides a guaranteed slot pass, eliminating chaotic overnight roadside queuing.",
      execute: () => {
        AppState.token.number = "KP-024";
        SchedulingModule.render();
      }
    },
    {
      step: 7,
      title: "Step 7: Time Slot Allocation (10:00 AM)",
      desc: "Farmer chooses the 10:00 AM procurement window. The system locks slot capacity and prepares the Mandi weighbridge roster.",
      sectionId: "scheduling",
      actionDesc: "Locking appointment slot for 10:00 AM.",
      highlight: "Predictable procurement scheduling ensures maximum throughput of 12 farmers/hour.",
      execute: () => {
        SchedulingModule.selectSlot("10:00 AM");
      }
    },
    {
      step: 8,
      title: "Step 8: Real-Time Live Queue Monitoring",
      desc: "Live Queue status shows Now Processing: KP-018 with 5 farmers ahead and an estimated 42 minutes waiting time.",
      sectionId: "queue",
      actionDesc: "Monitoring live gate queue and clearance velocity in real-time.",
      highlight: "Farmers can track queue progression right from their mobile phone while travelling.",
      execute: () => {
        QueueModule.render();
      }
    },
    {
      step: 9,
      title: "Step 9: Travel Delay Simulation (90 Minutes Delay)",
      desc: "Due to highway maintenance, the farmer encounters a 90-minute transit delay while travelling.",
      sectionId: "rescheduling",
      actionDesc: "Simulating actual travel delay of 90 minutes.",
      highlight: "Real-world unpredictable road conditions are tested against the scheduling model.",
      execute: () => {
        ReschedulingModule.setSimulatedDelay(90);
      }
    },
    {
      step: 10,
      title: "Step 10: Dynamic 25% Threshold Comparison Logic",
      desc: "Rule Evaluation: Actual Delay (90 min) > Configured 25% Threshold (75 min). Verdict: THRESHOLD CROSSED by 15 minutes!",
      sectionId: "rescheduling",
      actionDesc: "Evaluating 90 min > 75 min -> Threshold Crossed status triggered.",
      highlight: "Mathematically objective: minor delays (&le;75m) keep their slot; severe delays (>75m) trigger auto-reschedule.",
      execute: () => {
        ReschedulingModule.render();
      }
    },
    {
      step: 11,
      title: "Step 11: Automatic Slot Reassignment (New Slot: 12:00 PM)",
      desc: "The system recalculates the farmer's new ETA to 11:30 AM and automatically allocates the next available slot at 12:00 PM without manual re-registration.",
      sectionId: "rescheduling",
      actionDesc: "Applying auto-rescheduling to 12:00 PM with new ETA of 11:30 AM.",
      highlight: "Zero hassle for the farmer; system preserves their spot in the next available window without pushing them to the end of the day.",
      execute: () => {
        ReschedulingModule.applyDelayScenario();
      }
    },
    {
      step: 12,
      title: "Step 12: Instant Farmer Alert & Notification",
      desc: "An emergency SMS and push notification is dispatched to Ramesh Patel with revised ETA and rescheduled token pass.",
      sectionId: "notifications",
      actionDesc: "Verifying logged rescheduling alert in Notification Center.",
      highlight: "Clear, proactive communication prevents panic and Mandi gate arguments.",
      execute: () => {
        NotificationsModule.render();
      }
    },
    {
      step: 13,
      title: "Step 13: Arrival, Quality Inspection & Procurement Completion",
      desc: "Farmer arrives at Mandi. Quality Assayer grades the grain: 100 kg submitted, 70 kg accepted as Fair Average Quality (FAQ), 30 kg rejected due to 14.8% moisture.",
      sectionId: "tracking",
      actionDesc: "Fast-forwarding milestone tracking to Procurement Completed.",
      highlight: "Rigorous quality transparency with documented reasons for every kilogram rejected.",
      execute: () => {
        TrackingModule.advanceToStep(7, "Quality Grading & Procurement Completed: 70kg Accepted, 30kg Moisture Deduction.");
      }
    },
    {
      step: 14,
      title: "Step 14: Procurement Status & Automated MSP Calculation",
      desc: "Government MSP rate for Wheat (₹2,425/Qtl). Accepted: 70 kg = 0.70 Quintal. Total Payable = 0.70 × ₹2,425 = ₹1,697.50.",
      sectionId: "status",
      actionDesc: "Calculating total payable amount based on accepted quintals and MSP rate.",
      highlight: "Guaranteed MSP transparency: calculations are done automatically with zero manual calculation errors.",
      execute: () => {
        StatusModule.handleQuantityChange();
        StatusModule.render();
      }
    },
    {
      step: 15,
      title: "Step 15: PFMS Direct Benefit Transfer (DBT) Pipeline",
      desc: "The payable amount moves through official Government payment stages: Verified ➔ Payment Initiated ➔ Bank Processing.",
      sectionId: "status",
      actionDesc: "Advancing payment pipeline to stage 4 (Payment Processing).",
      highlight: "End-to-end direct benefit transfer integration eliminates cash leakage and corrupt middlemen.",
      execute: () => {
        StatusModule.setPaymentStage(4);
      }
    },
    {
      step: 16,
      title: "Step 16: Payment Settlement (PAID) & Official Digital e-Receipt",
      desc: "Payment Completed (PAID) via PFMS DBT into farmer's Aadhaar linked bank account. Official digital receipt generated with QR verification!",
      sectionId: "status",
      actionDesc: "Completing payment (PAID) and presenting the Digital Settlement Receipt.",
      highlight: "Complete end-to-end accountability from farm gate to direct bank credit!",
      execute: () => {
        StatusModule.setPaymentStage(5);
        StatusModule.showReceiptModal();
      }
    }
  ],

  /**
   * Initializes the Judge Demo controller
   */
  init() {
    this.bindEvents();
    this.render();
  },

  /**
   * Binds button clicks for demo controls
   */
  bindEvents() {
    const nextBtn = document.getElementById("btnJudgeNext");
    const prevBtn = document.getElementById("btnJudgePrev");
    const restartBtn = document.getElementById("btnJudgeRestart");
    const autoPlayBtn = document.getElementById("btnJudgeAutoPlay");

    if (nextBtn) nextBtn.addEventListener("click", () => this.nextStep());
    if (prevBtn) prevBtn.addEventListener("click", () => this.prevStep());
    if (restartBtn) restartBtn.addEventListener("click", () => this.restartDemo());
    if (autoPlayBtn) autoPlayBtn.addEventListener("click", () => this.toggleAutoPlay());
  },

  /**
   * Moves to next step in demo
   */
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep += 1;
      this.render();
      this.runCurrentStep();
    } else {
      Toast.show("🎉 Guided Judge Demo Completed Successfully!", "success");
      this.stopAutoPlay();
    }
  },

  /**
   * Moves to previous step in demo
   */
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      this.render();
      this.runCurrentStep();
    }
  },

  /**
   * Restarts the judge demo from Step 1
   */
  restartDemo() {
    this.stopAutoPlay();
    this.currentStep = 1;
    this.render();
    this.runCurrentStep();
    Toast.show("Demo restarted from Step 1.", "info");
  },

  /**
   * Executes logic and navigation for the active demo step
   */
  runCurrentStep() {
    const stepData = this.DEMO_STEPS[this.currentStep - 1];
    if (!stepData) return;

    // Navigate to relevant section
    if (stepData.sectionId) {
      App.navigateTo(stepData.sectionId, false); // Don't scroll to top abruptly
    }

    // Execute step logic
    if (typeof stepData.execute === "function") {
      stepData.execute();
    }
  },

  /**
   * Toggles automatic sequential playback for judges
   */
  toggleAutoPlay() {
    const autoPlayBtn = document.getElementById("btnJudgeAutoPlay");
    if (this.autoPlayInterval) {
      this.stopAutoPlay();
      Toast.show("Auto-tour paused.", "info");
    } else {
      this.autoPlayInterval = setInterval(() => {
        if (this.currentStep < this.totalSteps) {
          this.nextStep();
        } else {
          this.stopAutoPlay();
        }
      }, 4500);

      if (autoPlayBtn) {
        autoPlayBtn.innerHTML = "⏸ Pause Auto-Tour";
        autoPlayBtn.classList.add("btn-danger");
      }
      Toast.show("▶ Auto-Tour started (advances every 4.5 seconds)", "success");
    }
  },

  /**
   * Stops auto tour
   */
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    const autoPlayBtn = document.getElementById("btnJudgeAutoPlay");
    if (autoPlayBtn) {
      autoPlayBtn.innerHTML = "⚡ Run Full Auto-Tour";
      autoPlayBtn.classList.remove("btn-danger");
    }
  },

  /**
   * Renders the judge demo status banner and step explanation
   */
  render() {
    const stepData = this.DEMO_STEPS[this.currentStep - 1];
    if (!stepData) return;

    const counterBadge = document.getElementById("judgeStepCounter");
    const progressFill = document.getElementById("judgeProgressFill");
    const titleElem = document.getElementById("judgeStepTitle");
    const descElem = document.getElementById("judgeStepDesc");
    const highlightElem = document.getElementById("judgeStepHighlight");

    if (counterBadge) counterBadge.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
    if (progressFill) {
      const pct = (this.currentStep / this.totalSteps) * 100;
      progressFill.style.width = `${pct}%`;
    }

    if (titleElem) titleElem.textContent = stepData.title;
    if (descElem) descElem.textContent = stepData.desc;
    if (highlightElem) {
      highlightElem.innerHTML = `
        <strong>💡 SIH 2026 Impact / Solution Value:</strong> ${stepData.highlight}
      `;
    }

    const prevBtn = document.getElementById("btnJudgePrev");
    const nextBtn = document.getElementById("btnJudgeNext");

    if (prevBtn) prevBtn.disabled = (this.currentStep === 1);
    if (nextBtn) {
      if (this.currentStep === this.totalSteps) {
        nextBtn.innerHTML = "✓ Demo Completed";
      } else {
        nextBtn.innerHTML = `Next: Step ${this.currentStep + 1} ➔`;
      }
    }
  }
};
