/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/notifications.js - Real-time Notifications & Toast Alert Engine
 */

const NotificationsModule = {
  activeCategory: "all",

  /**
   * Initializes the notification center
   */
  init() {
    this.render();
    this.updateBadge();
  },

  /**
   * Adds a new notification event and displays an instant toast
   * @param {Object} notif { title, message, category, time }
   */
  add(notif) {
    const list = AppState.notifications || [];
    const nowTimeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const newEntry = {
      id: `ntf-${Date.now()}`,
      title: notif.title || "Procurement Alert",
      message: notif.message || "",
      category: notif.category || "general",
      time: notif.time || nowTimeStr,
      read: false
    };

    list.unshift(newEntry);
    AppState.notifications = list.slice(0, 30); // Keep last 30
    AppState.save();

    this.render();
    this.updateBadge();
  },

  /**
   * Updates unread badge counter in the navigation header
   */
  updateBadge() {
    const list = AppState.notifications || [];
    const unreadCount = list.filter(n => !n.read).length;
    const badge = document.getElementById("navNotifCountBadge");

    if (badge) {
      if (unreadCount > 0) {
        badge.style.display = "inline-block";
        badge.textContent = unreadCount;
      } else {
        badge.style.display = "none";
      }
    }
  },

  /**
   * Marks all notifications as read
   */
  markAllAsRead() {
    const list = AppState.notifications || [];
    list.forEach(n => n.read = true);
    AppState.save();
    this.render();
    this.updateBadge();
    Toast.show("All notifications marked as read.", "info");
  },

  /**
   * Clears notification history
   */
  clearAll() {
    AppState.notifications = [];
    AppState.save();
    this.render();
    this.updateBadge();
    Toast.show("Notification history cleared.", "info");
  },

  /**
   * Filters displayed notifications by category
   * @param {string} category
   */
  filterCategory(category) {
    this.activeCategory = category;
    document.querySelectorAll(".notif-filter-btn").forEach((btn) => {
      if (btn.getAttribute("data-cat") === category) {
        btn.classList.add("btn-primary");
        btn.classList.remove("btn-secondary");
      } else {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-secondary");
      }
    });
    this.render();
  },

  /**
   * Renders the notification cards feed into DOM
   */
  render() {
    const container = document.getElementById("notificationsListContainer");
    if (!container) return;

    let list = AppState.notifications || DEFAULT_DEMO_STATE.notifications;
    if (this.activeCategory !== "all") {
      list = list.filter(n => n.category === this.activeCategory);
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔕</div>
          <h4>No notifications found</h4>
          <p style="font-size: 0.85rem;">New alerts will appear here as procurement milestones and queue updates occur.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = "";

    list.forEach((item) => {
      const card = document.createElement("div");
      card.className = `notif-item ${item.read ? "" : "unread"}`;

      let icon = "🔔";
      if (item.category === "registration") icon = "📝";
      if (item.category === "centre") icon = "📍";
      if (item.category === "token") icon = "🎟️";
      if (item.category === "queue") icon = "👥";
      if (item.category === "reschedule" || item.category === "delay") icon = "⚠️";
      if (item.category === "tracking") icon = "🚚";
      if (item.category === "payment") icon = "💳";

      card.innerHTML = `
        <div class="notif-icon-box">${icon}</div>
        <div class="notif-content" style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h5>${item.title}</h5>
            <span class="notif-time">${item.time}</span>
          </div>
          <p>${item.message}</p>
        </div>
      `;

      container.appendChild(card);
    });
  }
};

/**
 * Toast Notification Utility
 */
const Toast = {
  show(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "ℹ️";
    if (type === "success") icon = "✅";
    if (type === "warning") icon = "⚠️";
    if (type === "danger") icon = "❌";

    toast.innerHTML = `
      <span>${icon}</span>
      <div style="flex: 1;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};
