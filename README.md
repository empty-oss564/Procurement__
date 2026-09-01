# Smart Procurement Scheduling for Farmers

**Smart India Hackathon 2026** | **Problem Statement ID: SIH26032**  
**Team Name:** Code Cultivators  
**Team ID:** CC-SIH2026-8842  
**Live Prototype Status:** 100% Client-Side Interactive Web Prototype (GitHub Pages Compatible)

---

## 📌 Executive Summary

During peak harvesting seasons (Rabi & Kharif), millions of Indian farmers transport their produce to regional Agricultural Produce Market Committee (APMC) Mandis and Government Procurement Centres. Due to an absence of real-time queue visibility and inflexible scheduling systems, farmers routinely endure **12 to 36 hours of waiting in tractor queues**, resulting in severe yard congestion, grain spillage, transit distress, and post-harvest spoilage.

**Smart Procurement Scheduling for Farmers** solves this systemic issue by introducing a **farmer-driven travel time model**, an intelligent **25% threshold delay engine**, **multi-centre load balancing**, **live gate queue tracking**, and **end-to-end Direct Benefit Transfer (DBT) settlement transparency**.

---

## 🚀 Key Features

### 1. Farmer-Specified Expected Travel Time
- Rather than forcing arbitrary or inaccurate computer-estimated travel times, the system allows the farmer to manually specify their expected travel time in **Hours and Minutes** based on local knowledge of rural terrain, tractor speed, road repairs, and weather conditions.

### 2. Dynamic 25% Threshold Rule Engine
- **Fixed System Rule:** The platform automatically calculates a **25% grace buffer** based on the farmer's expected travel time ($Threshold = \text{Travel Time} \times 0.25$).
- **Minor Delay Rule ($\text{Actual Delay} \le 25\%$):** If road delay is within the 25% buffer, the farmer's confirmed slot is strictly preserved without penalty.
- **Threshold Crossed Rule ($\text{Actual Delay} > 25\%$):** If actual transit delay breaches the 25% threshold, the system dynamically recalculates arrival ETA, automatically reallocates the next available optimal procurement slot, and dispatches instant alerts.

### 3. Smart Multi-Centre Recommendation Algorithm
- Computes an AI recommendation score across regional procurement centres by evaluating:
  $$\text{Score} = (\text{Distance (km)} \times 2.0) + (\text{Active Queue} \times 1.8) + (\text{Wait Time (min)} \times 0.8)$$
- Directs traffic away from overcrowded Mandis toward nearby underutilized centres, preventing yard gridlock.

### 4. Digital Token & Time Slot Allocation
- Issues cryptographically unique passes (e.g. `KP-024`) linked with calibrated weighbridge throughput (e.g. 12 farmers/hour).
- Generates printable/scannable digital passes with gate barcode verification.

### 5. Live Queue Monitoring & Advance Simulation
- Real-time telemetry displaying:
  - Token currently at weighbridge counter
  - User's allocated token
  - Number of vehicles ahead
  - Estimated waiting time in minutes
  - Visual queue sequence and clearance velocity.

### 6. 9-Stage Milestone Journey Tracking
- Tracks procurement from farm departure through physical verification, gross weighbridge measurement, quality assaying, and final payment settlement.

### 7. Transparent Crop Grading & MSP Payable Calculations
- Transparent post-procurement breakdown:
  - **Submitted Quantity** (e.g. $100\text{ kg} = 1.00\text{ Quintal}$)
  - **Accepted Quantity (FAQ Grade)** (e.g. $70\text{ kg} = 0.70\text{ Quintal}$)
  - **Deducted / Rejected Quantity** (e.g. $30\text{ kg}$)
  - **Documented Reason for Deduction** (e.g. Moisture content exceeding 12.0% FAQ limit).
- Automated MSP calculation:
  $$\text{Total Payable} = \text{Accepted Quintals} \times \text{Official MSP Rate}$$
  $$\text{Example: } 0.70\text{ Qtl} \times ₹2,425.00/\text{Qtl} = ₹1,697.50$$

### 8. Multi-Stage PFMS Direct Benefit Transfer (DBT) Pipeline
- 5-stage payment settlement lifecycle:
  1. *Payment Not Initiated*
  2. *Procurement Verified*
  3. *Payment Initiated*
  4. *Payment Processing*
  5. *Payment Completed (PAID)*
- Generates an official Government of India / Mandi Board Digital e-Receipt with transaction ID, Aadhaar-seeded bank details, and digital seal.

### 9. 16-Step Guided Judge Demonstration Tour
- Dedicated presentation mode with step-by-step contextual commentary, automatic screen transitions, and auto-play tour for hackathon evaluations.

---

## 🛠️ Technology Stack

- **Frontend:** Semantic HTML5, Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Print Stylesheets)
- **Scripting & Logic:** Modular Vanilla JavaScript (ES6+)
- **Architecture:** Zero-dependency static architecture (100% GitHub Pages compatible, no npm or build step required)
- **Persistence:** Browser `localStorage` state management with full reset capability

---

## 📂 Project Structure

```
Smart-Procurement-Website/
│
├── index.html                  # Single-Page Application master container
├── README.md                   # Project documentation, architecture & guide
│
├── css/
│   └── styles.css              # Indian Agri-Tech design system & responsive layout
│
└── js/
    ├── data.js                 # MSP tables, regional centres, default state
    ├── threshold.js            # 25% threshold calculation & delay evaluation engine
    ├── registration.js         # Farmer form handling, validation & threshold preview
    ├── recommendation.js       # Multi-centre scoring algorithm & recommendation cards
    ├── scheduling.js           # Token generation, slot selector & digital pass modal
    ├── queue.js                # Live queue tracker & interactive progress simulator
    ├── tracking.js             # 9-stage procurement milestone timeline
    ├── rescheduling.js         # Delay simulation & 25% threshold comparison engine
    ├── status.js               # Procurement outcome, MSP calculation & DBT payments
    ├── notifications.js        # Real-time alert stream & toast popups
    ├── judge-demo.js           # 16-step guided judge tour with auto-play
    └── app.js                  # Master application orchestrator & router
```

---

## 🖥️ How to Run Locally

### Method 1: Direct Browser Launch (Simplest)
1. Navigate to the project folder.
2. Double-click on `index.html` (or right-click $\rightarrow$ Open with Chrome / Edge / Firefox).
3. The entire application runs immediately with zero installation.

### Method 2: Local Web Server
You can also run through any local static HTTP server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

**Using Node / npx:**
```bash
npx serve .
```

**Using VS Code Live Server:**
- Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 How to Deploy to GitHub Pages

1. Initialize git and push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Smart Procurement Scheduling Prototype for SIH 2026"
   git branch -M main
   git remote add origin https://github.com/<your-username>/smart-procurement-system.git
   git push -u origin main
   ```
2. On GitHub, navigate to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Branch**, select `main` and `/ (root)`.
4. Click **Save**.
5. Your live prototype will be accessible at: `https://<your-username>.github.io/smart-procurement-system/`

---

## 🎯 16-Step Guided Judge Demonstration Flow

1. **Step 1:** Farmer Registration (Ramesh Patel, 100 kg Wheat).
2. **Step 2:** Farmer Enters Expected Travel Time (5 Hours).
3. **Step 3:** System Calculates 25% Threshold ($300\text{ min} \times 0.25 = 75\text{ minutes}$).
4. **Step 4:** Multi-Centre AI Recommendation & Load Balancing.
5. **Step 5:** Centre Selection (Kisan Pragati Mandi).
6. **Step 6:** Digital Token Issuance (`KP-024`).
7. **Step 7:** Appointment Time Slot Allocation (10:00 AM).
8. **Step 8:** Live Queue Monitoring (5 vehicles ahead, 42 min wait).
9. **Step 9:** Travel Delay Simulation (90-minute transit delay).
10. **Step 10:** 25% Threshold Comparison ($90\text{ min} > 75\text{ min} \rightarrow \text{Threshold Crossed!}$).
11. **Step 11:** Automatic Slot Reassignment (New ETA: 11:30 AM, New Slot: 12:00 PM).
12. **Step 12:** Real-Time Farmer Alert & Notification Dispatch.
13. **Step 13:** Arrival & Quality Grading (70 kg Accepted, 30 kg Moisture Deduction).
14. **Step 14:** Automated MSP Calculation ($0.70\text{ Qtl} \times ₹2,425 = ₹1,697.50$).
15. **Step 15:** Multi-Stage PFMS Direct Benefit Transfer (DBT) Pipeline.
16. **Step 16:** Payment Settlement (PAID) & Official Digital e-Receipt.

---

## 🔮 Future Scope & Production Roadmap

- **IoT Weighbridge & Moisture Sensors:** Direct integration with digital weighbridges and grain moisture analyzers for automated metric ingestion.
- **IVR / Voice Calling / WhatsApp Bot:** Accessibility interface in regional Indian languages (Hindi, Marathi, Punjabi, Telugu, Tamil, Bengali) for non-smartphone users.
- **e-NAM Integration:** Real-time synchronization with National Agriculture Market (e-NAM) and state APMC portals.
- **GPS & FastTag Telemetry:** Automated vehicle delay estimation using highway toll and GPS tracking.

---

## ⚖️ Prototype Notes

This application is a **complete, standalone frontend prototype** with comprehensive client-side business logic, live mathematical calculations, real-time threshold rule validation, and interactive simulations. In production, this client seamlessly binds to REST/GraphQL APIs backed by state procurement databases, PFMS payment gateways, and Mandi Board servers.

---

**Developed with ❤️ for Indian Farmers by Team Code Cultivators**  
*Smart India Hackathon 2026 | Problem Statement ID: SIH26032*
