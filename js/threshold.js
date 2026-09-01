/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/threshold.js - Dynamic 25% Threshold & Delay Rule Engine
 */

const ThresholdEngine = {
  // System-wide configured threshold percentage (Fixed: 25%)
  SYSTEM_THRESHOLD_PERCENTAGE: 0.25,

  /**
   * Converts hours and minutes into total minutes
   * @param {number} hours
   * @param {number} minutes
   * @returns {number}
   */
  calculateTotalMinutes(hours, minutes) {
    const h = parseInt(hours, 10) || 0;
    const m = parseInt(minutes, 10) || 0;
    return Math.max(0, (h * 60) + m);
  },

  /**
   * Calculates the 25% threshold buffer in minutes based on total travel time.
   * Rule: Farmer enters expected travel time, system enforces 25% buffer limit.
   * @param {number} totalMinutes
   * @returns {number} rounded to 1 decimal place or integer
   */
  calculateThreshold(totalMinutes) {
    const mins = Number(totalMinutes) || 0;
    const threshold = mins * this.SYSTEM_THRESHOLD_PERCENTAGE;
    // Round to nearest integer or clean half
    return Math.round(threshold * 10) / 10;
  },

  /**
   * Evaluates if a given actual delay breaches the 25% threshold.
   * Rule:
   * IF Actual Delay <= 25% of Expected Travel Time -> Minor Delay (Keep Slot)
   * IF Actual Delay > 25% of Expected Travel Time -> Threshold Crossed (Reschedule)
   * @param {number} actualDelayMinutes
   * @param {number} expectedTravelMinutes
   * @returns {Object} Evaluation report
   */
  evaluateDelay(actualDelayMinutes, expectedTravelMinutes) {
    const delay = Number(actualDelayMinutes) || 0;
    const travelTime = Number(expectedTravelMinutes) || 0;
    const threshold = this.calculateThreshold(travelTime);
    const isCrossed = delay > threshold;
    const difference = Math.abs(delay - threshold);

    return {
      actualDelayMinutes: delay,
      expectedTravelMinutes: travelTime,
      thresholdMinutes: threshold,
      thresholdPercentage: 25,
      isThresholdCrossed: isCrossed,
      statusText: isCrossed ? "THRESHOLD CROSSED" : "MINOR DELAY (WITHIN THRESHOLD)",
      statusClass: isCrossed ? "status-danger" : "status-success",
      badgeClass: isCrossed ? "badge-danger" : "badge-success",
      differenceMinutes: Math.round(difference * 10) / 10,
      actionRequired: isCrossed ? "Dynamic Reschedule to Next Available Slot" : "Maintain Existing Slot (Minor Buffer Absorbed)",
      message: isCrossed
        ? `Actual delay (${delay} min) exceeded the 25% threshold limit (${threshold} min) by ${Math.round(difference * 10) / 10} minutes. Dynamic rescheduling triggered.`
        : `Actual delay (${delay} min) is within acceptable 25% buffer threshold (${threshold} min). Existing appointment slot is preserved.`
    };
  },

  /**
   * Formats minutes into human-readable "X hrs Y mins" or "X mins"
   * @param {number} totalMinutes
   * @returns {string}
   */
  formatDuration(totalMinutes) {
    const mins = Math.round(Number(totalMinutes) || 0);
    if (mins === 0) return "0 mins";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m} mins`;
    if (m === 0) return `${h} hr${h > 1 ? 's' : ''}`;
    return `${h} hr${h > 1 ? 's' : ''} ${m} min${m > 1 ? 's' : ''}`;
  },

  /**
   * Recalculates new ETA time string given base time and delay minutes
   * @param {string} baseTimeStr e.g. "10:00 AM"
   * @param {number} delayMinutes e.g. 90
   * @returns {string} e.g. "11:30 AM"
   */
  computeNewTime(baseTimeStr, delayMinutes) {
    if (!baseTimeStr) return "11:30 AM";
    const parts = baseTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!parts) return baseTimeStr;

    let hours = parseInt(parts[1], 10);
    const minutes = parseInt(parts[2], 10);
    const meridian = parts[3].toUpperCase();

    if (meridian === "PM" && hours < 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    let totalMins = (hours * 60) + minutes + delayMinutes;
    // Normalize in 24 hours
    totalMins = totalMins % (24 * 60);

    let newHours = Math.floor(totalMins / 60);
    const newMinutes = totalMins % 60;
    const newMeridian = newHours >= 12 ? "PM" : "AM";

    if (newHours > 12) newHours -= 12;
    if (newHours === 0) newHours = 12;

    const formattedMins = newMinutes < 10 ? `0${newMinutes}` : newMinutes;
    return `${newHours}:${formattedMins} ${newMeridian}`;
  }
};
