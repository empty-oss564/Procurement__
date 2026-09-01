/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/recommendation.js - Multi-Centre Recommendation Engine
 */

const RecommendationModule = {
  /**
   * Initializes the centre recommendation module
   */
  init() {
    this.render();
  },

  /**
   * Calculates recommendation score for a centre
   * Lower composite score = More optimal centre
   * @param {Object} centre
   * @returns {number}
   */
  calculateScore(centre) {
    // Weighted scoring: Distance (30%) + Queue Load (40%) + Wait Time (30%)
    const distanceScore = centre.distanceKm * 2;
    const queueScore = centre.currentQueue * 1.8;
    const waitScore = centre.estimatedWaitMinutes * 0.8;
    return Math.round((distanceScore + queueScore + waitScore) * 10) / 10;
  },

  /**
   * Identifies the optimal recommended centre
   * @returns {Object}
   */
  getBestCentre() {
    let bestCentre = SAMPLE_CENTRES[0];
    let lowestScore = Infinity;

    SAMPLE_CENTRES.forEach((centre) => {
      const score = this.calculateScore(centre);
      centre.computedScore = score;
      if (score < lowestScore) {
        lowestScore = score;
        bestCentre = centre;
      }
    });

    return bestCentre;
  },

  /**
   * Renders the centre cards and comparison matrix into the DOM
   */
  render() {
    const container = document.getElementById("centreCardsContainer");
    const summaryBox = document.getElementById("recommendationSummaryBox");
    if (!container) return;

    const bestCentre = this.getBestCentre();
    const currentSelectedId = AppState.selectedCentre?.id || bestCentre.id;

    container.innerHTML = "";

    SAMPLE_CENTRES.forEach((centre) => {
      const isBest = centre.id === bestCentre.id;
      const isSelected = centre.id === currentSelectedId;

      const card = document.createElement("div");
      card.className = `centre-card ${isBest ? "recommended-centre" : ""} ${isSelected ? "selected-centre" : ""}`;

      card.innerHTML = `
        ${isBest ? `<div class="recommended-ribbon">⭐ OPTIMAL CHOICE</div>` : ""}
        <div class="centre-title-area">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h3>${centre.name}</h3>
            <span class="badge ${centre.statusClass}">${centre.status}</span>
          </div>
          <div class="centre-meta-line">
            <span>📍 ${centre.district}</span>
            <span>🛣️ <strong>${centre.distanceKm} km</strong> away</span>
            <span>⏱️ ~${centre.approxTravelMinutes} min drive</span>
          </div>
        </div>

        <div class="centre-metrics-grid">
          <div class="centre-metric-item">
            <div class="m-label">Current Queue</div>
            <div class="m-val">${centre.currentQueue} farmers</div>
          </div>
          <div class="centre-metric-item">
            <div class="m-label">Est. Waiting Time</div>
            <div class="m-val" style="color: ${centre.estimatedWaitMinutes > 60 ? 'var(--danger)' : 'var(--primary)'}">
              ${centre.estimatedWaitMinutes} mins
            </div>
          </div>
          <div class="centre-metric-item">
            <div class="m-label">Processing Capacity</div>
            <div class="m-val">${centre.processingCapacityPerHour} farmers/hr</div>
          </div>
          <div class="centre-metric-item">
            <div class="m-label">Registered Today</div>
            <div class="m-val">${centre.registeredFarmers} farmers</div>
          </div>
        </div>

        <div style="margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 0.78rem; color: var(--text-muted);">
            Active Gates: <strong>${centre.weighbridges} Weighbridges</strong>
          </div>
          <button class="btn ${isSelected ? 'btn-primary' : 'btn-outline-primary'} btn-sm" onclick="RecommendationModule.selectCentre('${centre.id}')">
            ${isSelected ? "✓ Currently Selected" : "Select This Centre"}
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    if (summaryBox) {
      summaryBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="font-size: 1.8rem;">🎯</div>
          <div>
            <h4 style="color: var(--primary-dark); margin-bottom: 0.2rem;">
              Smart AI Recommendation Engine: <strong>${bestCentre.name}</strong>
            </h4>
            <p style="font-size: 0.84rem; color: var(--text-main); margin: 0;">
              Recommended based on optimal balance between travel distance (${bestCentre.distanceKm} km), active queue (${bestCentre.currentQueue} vehicles), and shortest processing backlog (${bestCentre.estimatedWaitMinutes} min wait).
            </p>
          </div>
        </div>
      `;
    }
  },

  /**
   * Handles user selection of a procurement centre
   * @param {string} centreId
   */
  selectCentre(centreId) {
    const centre = SAMPLE_CENTRES.find(c => c.id === centreId);
    if (!centre) return;

    AppState.selectedCentre = centre;
    AppState.token.number = `${centre.id.replace('CTR-', '')}-${Math.floor(100 + Math.random() * 900)}`;
    AppState.save();

    NotificationsModule.add({
      title: "Procurement Centre Selected",
      message: `You selected ${centre.name} (${centre.district}). Current wait time is ${centre.estimatedWaitMinutes} mins.`,
      category: "centre"
    });

    Toast.show(`Selected: ${centre.name}`, "success");
    this.render();
    SchedulingModule.render();

    // Transition to Scheduling / Token module
    App.navigateTo("scheduling");
  }
};
