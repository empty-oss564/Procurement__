/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/queue.js - Live Queue Monitoring & Advance Simulator
 */

const QueueModule = {
  /**
   * Initializes the live queue dashboard
   */
  init() {
    this.render();
  },

  /**
   * Renders the queue counters, visual queue line, and health indicators
   */
  render() {
    const q = AppState.queue || DEFAULT_DEMO_STATE.queue;
    const t = AppState.token || DEFAULT_DEMO_STATE.token;
    const c = AppState.selectedCentre || SAMPLE_CENTRES[0];

    // Text metrics
    const nowProcElem = document.getElementById("queueNowProcessing");
    const yourTokenElem = document.getElementById("queueYourToken");
    const aheadElem = document.getElementById("queueFarmersAhead");
    const waitElem = document.getElementById("queueEstimatedWait");
    const capacityElem = document.getElementById("queueCapacityText");
    const speedElem = document.getElementById("queueSpeedText");
    const statusBadge = document.getElementById("queueStatusBadge");

    if (nowProcElem) nowProcElem.textContent = q.nowProcessingToken || "KP-018";
    if (yourTokenElem) yourTokenElem.textContent = t.number || "KP-024";
    if (aheadElem) aheadElem.textContent = q.farmersAhead;
    if (waitElem) waitElem.textContent = `${q.estimatedWaitingMinutes} mins`;
    if (capacityElem) capacityElem.textContent = `${c.processingCapacityPerHour || 12} farmers / hr`;
    if (speedElem) speedElem.textContent = `${q.avgServiceMinutes || 4.5} mins / vehicle`;
    
    if (statusBadge) {
      if (q.farmersAhead === 0) {
        statusBadge.className = "badge status-completed";
        statusBadge.textContent = "🟢 YOUR TURN AT COUNTER";
      } else if (q.farmersAhead <= 2) {
        statusBadge.className = "badge status-warning";
        statusBadge.textContent = "⚡ GET READY AT WEIGHBRIDGE";
      } else {
        statusBadge.className = "badge status-success";
        statusBadge.textContent = "✓ OPTIMAL CLEARANCE SPEED";
      }
    }

    // Update Progress Bar
    const progressFill = document.getElementById("queueProgressBarFill");
    const progressText = document.getElementById("queueProgressPercentText");
    const totalInitialAhead = t.initialQueuePosition || 6;
    const completedAhead = Math.max(0, totalInitialAhead - q.farmersAhead);
    const percent = Math.min(100, Math.round((completedAhead / totalInitialAhead) * 100));

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${percent}% queue cleared`;

    // Render Visual Queue Tokens Strip
    this.renderVisualLine();
  },

  /**
   * Generates horizontal visual tokens strip
   */
  renderVisualLine() {
    const container = document.getElementById("visualQueueLineContainer");
    if (!container) return;

    container.innerHTML = "";
    const q = AppState.queue;
    const t = AppState.token;

    // Parse numeric part of tokens
    const currentNumMatch = (q.nowProcessingToken || "KP-018").match(/\d+/);
    const currentNum = currentNumMatch ? parseInt(currentNumMatch[0], 10) : 18;
    const yourNumMatch = (t.number || "KP-024").match(/\d+/);
    const yourNum = yourNumMatch ? parseInt(yourNumMatch[0], 10) : 24;
    const prefix = (t.number || "KP-024").split("-")[0] || "KP";

    for (let i = currentNum; i <= Math.max(yourNum + 2, currentNum + 5); i++) {
      const tokenStr = `${prefix}-0${i < 10 ? '0' + i : i}`;
      const chip = document.createElement("div");
      
      const isProcessing = (i === currentNum);
      const isYourToken = (i === yourNum);

      chip.className = `queue-chip ${isProcessing ? "active-chip" : ""} ${isYourToken ? "my-chip" : ""}`;
      
      if (isProcessing) {
        chip.innerHTML = `<span>⚙️ ${tokenStr}</span> <span style="font-size:0.65rem; background:rgba(255,255,255,0.3); padding:1px 4px; border-radius:3px;">ACTIVE</span>`;
      } else if (isYourToken) {
        chip.innerHTML = `<span>⭐ ${tokenStr}</span> <span style="font-size:0.65rem; background:#ffeb3b; color:#000; padding:1px 4px; border-radius:3px; font-weight:bold;">YOU</span>`;
      } else {
        chip.innerHTML = `<span>#${tokenStr}</span>`;
      }

      container.appendChild(chip);
    }
  },

  /**
   * Advances the queue simulation by one step
   */
  advanceQueue() {
    const q = AppState.queue;
    const t = AppState.token;

    if (q.farmersAhead > 0) {
      q.farmersAhead -= 1;
      
      // Advance the processing token number
      const numMatch = q.nowProcessingToken.match(/\d+/);
      if (numMatch) {
        const nextNum = parseInt(numMatch[0], 10) + 1;
        const prefix = q.nowProcessingToken.split("-")[0] || "KP";
        q.nowProcessingToken = `${prefix}-0${nextNum < 10 ? '0' + nextNum : nextNum}`;
      }

      // Recalculate waiting time
      q.estimatedWaitingMinutes = Math.max(0, Math.round(q.farmersAhead * (q.avgServiceMinutes || 4.5) * 1.5));
      AppState.save();

      if (q.farmersAhead === 0) {
        NotificationsModule.add({
          title: "Your Turn at Gate / Weighbridge!",
          message: `Token ${t.number} is now called for physical verification and weighbridge logging!`,
          category: "queue"
        });
        Toast.show(`🔔 TOKEN ${t.number}: PLEASE PROCEED TO COUNTER 1!`, "warning");
      } else if (q.farmersAhead === 1) {
        NotificationsModule.add({
          title: "Queue Alert: Next in Line",
          message: `Only 1 farmer ahead before Token ${t.number}. Please approach the entry barrier.`,
          category: "queue"
        });
        Toast.show(`Queue moved! 1 farmer ahead (${q.estimatedWaitingMinutes} mins left)`, "info");
      } else {
        Toast.show(`Queue advanced! ${q.farmersAhead} farmers ahead (~${q.estimatedWaitingMinutes} mins)`, "info");
      }
    } else {
      Toast.show("You are already at the front of the queue!", "success");
    }

    this.render();
  },

  /**
   * Resets queue to initial demo position
   */
  resetQueue() {
    AppState.queue = { ...DEFAULT_DEMO_STATE.queue };
    AppState.save();
    Toast.show("Queue reset to initial demo parameters.", "info");
    this.render();
  }
};
