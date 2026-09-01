/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/app.js - Master Orchestrator, State Persistence & Navigation
 */

// Global State Container with LocalStorage Integration
const AppState = {
  STORAGE_KEY: "SIH26032_SMART_PROCUREMENT_STATE_V1",

  farmer: null,
  selectedCentre: null,
  token: null,
  queue: null,
  tracking: null,
  rescheduling: null,
  procurementStatus: null,
  notifications: null,

  /**
   * Loads persisted state or defaults to SIH standard scenario
   */
  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.farmer = parsed.farmer || { ...DEFAULT_DEMO_STATE.farmer };
        this.selectedCentre = parsed.selectedCentre || { ...DEFAULT_DEMO_STATE.selectedCentre };
        this.token = parsed.token || { ...DEFAULT_DEMO_STATE.token };
        this.queue = parsed.queue || { ...DEFAULT_DEMO_STATE.queue };
        this.tracking = parsed.tracking || JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.tracking));
        this.rescheduling = parsed.rescheduling || { ...DEFAULT_DEMO_STATE.rescheduling };
        this.procurementStatus = parsed.procurementStatus || { ...DEFAULT_DEMO_STATE.procurementStatus };
        this.notifications = parsed.notifications || [...DEFAULT_DEMO_STATE.notifications];
        return;
      }
    } catch (e) {
      console.warn("Could not load from localStorage, initializing standard defaults:", e);
    }
    this.resetToDefaults();
  },

  /**
   * Saves current state to localStorage
   */
  save() {
    try {
      const payload = {
        farmer: this.farmer,
        selectedCentre: this.selectedCentre,
        token: this.token,
        queue: this.queue,
        tracking: this.tracking,
        rescheduling: this.rescheduling,
        procurementStatus: this.procurementStatus,
        notifications: this.notifications
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  },

  /**
   * Resets the entire app state to default demo scenario
   */
  resetToDefaults() {
    this.farmer = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.farmer));
    this.selectedCentre = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.selectedCentre));
    this.token = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.token));
    this.queue = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.queue));
    this.tracking = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.tracking));
    this.rescheduling = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.rescheduling));
    this.procurementStatus = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.procurementStatus));
    this.notifications = JSON.parse(JSON.stringify(DEFAULT_DEMO_STATE.notifications));
    this.save();
  }
};

// Main Application Controller
const App = {
  currentSection: "home",

  /**
   * Bootstraps the application on DOM ready
   */
  init() {
    console.log("Initializing Smart Procurement Scheduling for Farmers (SIH26032)...");
    AppState.load();

    this.bindNavigation();
    this.bindGlobalActions();

    // Initialize individual modules
    RegistrationModule.init();
    RecommendationModule.init();
    SchedulingModule.init();
    QueueModule.init();
    TrackingModule.init();
    ReschedulingModule.init();
    StatusModule.init();
    NotificationsModule.init();
    JudgeDemoModule.init();
    LanguageModule.init();

    // Set initial active section
    this.navigateTo("home");
  },

  /**
   * Binds navigation links and routing
   */
  bindNavigation() {
    // Nav links
    document.querySelectorAll("[data-nav-target]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-nav-target");
        this.navigateTo(target);

        // Close mobile menu if open
        const nav = document.getElementById("mainNav");
        if (nav) nav.classList.remove("mobile-open");
      });
    });

    // Mobile menu toggle button
    const menuBtn = document.getElementById("mobileMenuBtn");
    if (menuBtn) {
      menuBtn.addEventListener("click", () => {
        const nav = document.getElementById("mainNav");
        if (nav) nav.classList.toggle("mobile-open");
      });
    }
  },

  /**
   * Binds global actions like Reset Demo
   */
  bindGlobalActions() {
    const resetBtn = document.getElementById("btnResetDemo");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset the prototype to the initial SIH 2026 demo scenario?")) {
          AppState.resetToDefaults();
          RegistrationModule.init();
          RecommendationModule.render();
          SchedulingModule.render();
          QueueModule.render();
          TrackingModule.render();
          ReschedulingModule.render();
          StatusModule.render();
          NotificationsModule.init();
          JudgeDemoModule.restartDemo();
          Toast.show("Prototype reset to initial demo state.", "info");
          this.navigateTo("home");
        }
      });
    }
  },

  /**
   * Switches the active UI section without page reload
   * @param {string} sectionId
   * @param {boolean} scroll
   */
  navigateTo(sectionId, scroll = true) {
    this.currentSection = sectionId;

    // Toggle section visibility
    document.querySelectorAll(".app-section").forEach((sec) => {
      if (sec.id === `sec-${sectionId}`) {
        sec.classList.add("active-section");
      } else {
        sec.classList.remove("active-section");
      }
    });

    // Update active nav link classes
    document.querySelectorAll("[data-nav-target]").forEach((link) => {
      if (link.getAttribute("data-nav-target") === sectionId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (scroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};

// Start application when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
