/**
 * SMART PROCUREMENT SCHEDULING FOR FARMERS
 * SIH 2026 | Problem Statement: SIH26032 | Team: Code Cultivators
 * File: js/data.js - Core Datasets & Defaults
 */

// Government Minimum Support Price (MSP) 2025-2026 Reference Rates (in INR per Quintal)
// 1 Quintal = 100 kg
const MSP_RATES = {
  "Wheat": { ratePerQuintal: 2425, category: "Rabi", unit: "Quintal", stdMoistureMax: 12.0 },
  "Paddy (Common)": { ratePerQuintal: 2300, category: "Kharif", unit: "Quintal", stdMoistureMax: 17.0 },
  "Paddy (Grade A)": { ratePerQuintal: 2320, category: "Kharif", unit: "Quintal", stdMoistureMax: 17.0 },
  "Mustard Seed": { ratePerQuintal: 5650, category: "Rabi", unit: "Quintal", stdMoistureMax: 8.0 },
  "Gram (Chana)": { ratePerQuintal: 5440, category: "Rabi", unit: "Quintal", stdMoistureMax: 10.0 },
  "Maize": { ratePerQuintal: 2090, category: "Kharif", unit: "Quintal", stdMoistureMax: 14.0 },
  "Soybean (Yellow)": { ratePerQuintal: 4892, category: "Kharif", unit: "Quintal", stdMoistureMax: 12.0 },
  "Cotton (Medium Staple)": { ratePerQuintal: 7121, category: "Kharif", unit: "Quintal", stdMoistureMax: 8.5 }
};

// Sample Regional Procurement Centres with Real-time Capacity Metrics
const SAMPLE_CENTRES = [
  {
    id: "CTR-A",
    name: "Kisan Pragati Mandi (Centre A)",
    district: "Bhopal",
    distanceKm: 8,
    approxTravelMinutes: 25,
    registeredFarmers: 42,
    currentQueue: 18,
    processingCapacityPerHour: 12,
    estimatedWaitMinutes: 55,
    status: "Available",
    statusClass: "status-success",
    address: "National Highway 46, Mandi Complex, Bhopal",
    inCharge: "Shri R. K. Verma (Mandi Secretary)",
    phone: "+91 94250 11234",
    weighbridges: 3,
    activeCounters: 4
  },
  {
    id: "CTR-B",
    name: "Gramin Samridhi Hub (Centre B)",
    district: "Sehore",
    distanceKm: 12,
    approxTravelMinutes: 35,
    registeredFarmers: 27,
    currentQueue: 8,
    processingCapacityPerHour: 15,
    estimatedWaitMinutes: 25,
    status: "Low Queue",
    statusClass: "status-info",
    address: "APMC Yard, Sector 4, Sehore By-pass",
    inCharge: "Smt. Sunita Sharma (Chief Inspector)",
    phone: "+91 98261 44521",
    weighbridges: 4,
    activeCounters: 5
  },
  {
    id: "CTR-C",
    name: "Annapurna Grain Terminal (Centre C)",
    district: "Raisen",
    distanceKm: 6,
    approxTravelMinutes: 20,
    registeredFarmers: 61,
    currentQueue: 35,
    processingCapacityPerHour: 10,
    estimatedWaitMinutes: 90,
    status: "High Load",
    statusClass: "status-warning",
    address: "Old Grain Market, Station Road, Raisen",
    inCharge: "Shri Alok Mishra (Superintendent)",
    phone: "+91 97531 88902",
    weighbridges: 2,
    activeCounters: 3
  },
  {
    id: "CTR-D",
    name: "Krishi Vigyan Kendra Depot (Centre D)",
    district: "Vidisha",
    distanceKm: 18,
    approxTravelMinutes: 50,
    registeredFarmers: 19,
    currentQueue: 5,
    processingCapacityPerHour: 8,
    estimatedWaitMinutes: 20,
    status: "Low Queue",
    statusClass: "status-info",
    address: "KVK Research Campus, Vidisha South",
    inCharge: "Dr. P. S. Chauhan (Director)",
    phone: "+91 91110 77412",
    weighbridges: 2,
    activeCounters: 2
  }
];

// Available Time Slots for Scheduling
const DEFAULT_TIME_SLOTS = [
  { id: "slot-1", time: "09:30 AM", capacity: "Available", availableSpots: 6 },
  { id: "slot-2", time: "10:00 AM", capacity: "Fast Track", availableSpots: 8 },
  { id: "slot-3", time: "10:30 AM", capacity: "Filling Fast", availableSpots: 2 },
  { id: "slot-4", time: "11:00 AM", capacity: "Available", availableSpots: 5 },
  { id: "slot-5", time: "11:30 AM", capacity: "Available", availableSpots: 7 },
  { id: "slot-6", time: "12:00 PM", capacity: "Fast Track", availableSpots: 9 },
  { id: "slot-7", time: "12:30 PM", capacity: "Available", availableSpots: 4 },
  { id: "slot-8", time: "01:00 PM", capacity: "Available", availableSpots: 6 }
];

// Default Demo Scenario Preset (Matches SIH 2026 Evaluation Standard)
const DEFAULT_DEMO_STATE = {
  farmer: {
    name: "Ramesh Patel",
    mobile: "9876543210",
    village: "Pipariya",
    district: "Bhopal",
    crop: "Wheat",
    quantity: 100,
    unit: "kg",
    preferredCentreId: "CTR-A",
    travelHours: 5,
    travelMinutes: 0,
    totalTravelMinutes: 300,
    thresholdMinutes: 75
  },
  selectedCentre: SAMPLE_CENTRES[0],
  token: {
    number: "KP-024",
    generatedAt: "2026-09-01T08:30:00",
    slotTime: "10:00 AM",
    expectedArrivalTime: "10:00 AM",
    estimatedProcessingMinutes: 15,
    initialQueuePosition: 6,
    currentQueuePosition: 5
  },
  queue: {
    nowProcessingToken: "KP-018",
    farmersAhead: 5,
    estimatedWaitingMinutes: 42,
    capacityPerHour: 12,
    avgServiceMinutes: 4.5,
    status: "Optimal Flow"
  },
  tracking: {
    currentStepIndex: 3, // 0: Registration, 1: Centre, 2: Token, 3: Travelling, 4: Arrived, 5: Verification, 6: Weighbridge, 7: Procurement, 8: Payment
    steps: [
      { id: "step-1", name: "Farmer Registration", status: "completed", timestamp: "08:15 AM", details: "Farmer profile & 5hr travel time registered." },
      { id: "step-2", name: "Centre Selected", status: "completed", timestamp: "08:22 AM", details: "Centre A (Kisan Pragati Mandi) chosen." },
      { id: "step-3", name: "Token Generated", status: "completed", timestamp: "08:30 AM", details: "Token KP-024 confirmed for 10:00 AM slot." },
      { id: "step-4", name: "Farmer Travelling", status: "active", timestamp: "08:45 AM", details: "En route to procurement centre. Delay tracking active." },
      { id: "step-5", name: "Arrived at Centre", status: "pending", timestamp: "--", details: "Physical gate entry and barcode verification." },
      { id: "step-6", name: "Document & Crop Verification", status: "pending", timestamp: "--", details: "Aadhaar e-KYC and land record validation." },
      { id: "step-7", name: "Weighbridge Measurement", status: "pending", timestamp: "--", details: "Gross weight and tare weight calibrated." },
      { id: "step-8", name: "Quality Grading & Procurement", status: "pending", timestamp: "--", details: "Moisture test, FAQ standard checks, final acceptance." },
      { id: "step-9", name: "DBT Payment Settlement", status: "pending", timestamp: "--", details: "Direct Benefit Transfer to Aadhaar linked bank account." }
    ]
  },
  rescheduling: {
    originalSlot: "10:00 AM",
    expectedTravelMinutes: 300,
    thresholdMinutes: 75,
    simulatedDelayMinutes: 90,
    isThresholdCrossed: true,
    newEta: "11:30 AM",
    newSlot: "12:00 PM",
    reason: "Travel delay exceeded system 25% threshold buffer.",
    lastRescheduledAt: "2026-09-01T09:15:00"
  },
  procurementStatus: {
    crop: "Wheat",
    submittedQuantityKg: 100,
    acceptedQuantityKg: 70,
    rejectedQuantityKg: 30,
    rejectionReason: "Moisture content 14.8% (exceeds 12.0% FAQ limit) and 2.2% foreign matter",
    mspRatePerQuintal: 2425,
    acceptedQuintals: 0.70,
    totalPayableAmount: 1697.50,
    procurementState: "Completed",
    paymentStage: 4, // 1: Not Initiated, 2: Verified, 3: Initiated, 4: Processing, 5: Completed (PAID)
    paymentStatus: "Processing",
    transactionId: "PFMS-DBT-2026-98174209",
    paymentDate: "01 Sep 2026, 11:45 AM",
    bankName: "State Bank of India (A/C ending in 4082)",
    paymentMethod: "Direct Benefit Transfer (DBT) / PFMS Portal"
  },
  notifications: [
    {
      id: "ntf-1",
      title: "Registration Confirmed",
      message: "Farmer Ramesh Patel registered successfully with expected travel time of 5 hrs (Threshold: 75 min).",
      category: "registration",
      time: "08:15 AM",
      read: true
    },
    {
      id: "ntf-2",
      title: "Token & Slot Assigned",
      message: "Token KP-024 confirmed for 10:00 AM at Kisan Pragati Mandi.",
      category: "token",
      time: "08:30 AM",
      read: true
    },
    {
      id: "ntf-3",
      title: "Threshold Crossed & Rescheduled",
      message: "⚠️ Travel delay of 90 min exceeded your 25% threshold (75 min). Your ETA is updated to 11:30 AM. New Slot: 12:00 PM.",
      category: "reschedule",
      time: "09:15 AM",
      read: false
    }
  ]
};
