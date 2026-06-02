her/**
 * ============================================================================
 * 🌌 AEON-MATRIX COGNITIVE OPERATIONS ECOSYSTEM
 * 📑 MODULE: TELEMETRY & SYSTEM REASONING TOKENS (V1)
 * ============================================================================
 */

/**
 * 📡 1. ระบบส่งสัญญาณชีพหลัก (System Telemetry Status)
 * แปลงข้อความและสถานะหน้างานให้กลายเป็นรหัสวิศวกรรมข้อมูลดิจิทัลดิบ
 */
export enum TelemetryStatus {
  LOW_CONFIDENCE = "Low confidence",         // ข้อมูลไม่พอต่อการตัดสินใจ
  ESCALATION_REQUEST = "Escalation request", // ควรให้มนุษย์เข้ามาร่วมตรวจสอบ
  CONTEXT_MISMATCH = "Context mismatch",     // ข้อมูลดิบขัดแย้งกันเองหรือขัดกับระบบเซนเซอร์
  REPEATED_FAILURE = "Repeated failure",     // กระบวนการทำงาน (Workflow) เกิดปัญหาซ้ำซาก
  UNCERTAINTY_SPIKE = "Uncertainty spike",   // โมเดลวิเคราะห์แล้วพบความไม่แน่นอนสูงเฉียบพลัน
  AGENT_CONFLICT = "Agent conflict"          // ตรรกะการให้เหตุผล (Reasoning) ระหว่างบอทขัดแย้งกันเอง
}

/**
 * 💡 2. อินเตอร์เฟซรายงานข้อจำกัดตนเอง (AI Reflection / Self-Reporting Interface)
 * ชุดโทเค็นข้อผิดพลาดมาตรฐานเชิงเทคนิคเมื่อโมเดลชนเพดานข้อจำกัด
 */
export enum SelfReportingToken {
  MORE_DATA_REQUIRED = "More Data Required",
  SENSOR_UNRELIABLE = "Sensor Unreliable",
  CONFIDENCE_BELOW_THRESHOLD = "Confidence Below Threshold",
  CONFLICTING_INPUTS_DETECTED = "Conflicting Inputs Detected",
  POLICY_AMBIGUITY = "Policy Ambiguity / Edge Case Detected"
}

/**
 * 🧩 3. รายชื่อกลุ่มเอเจนต์ย่อยเฉพาะทาง (Specialized AI Agents / "Baby AI")
 * โครงข่ายโมเดลอิสระที่มีหน้าที่ จุดอ่อน และความเสี่ยงแยกจากกันโดยเด็ดขาด
 */
export type BabyAgentName =
  | 'Inventory_AI'   // ถนัด Stock movement, forecasting | เสี่ยง Reorder ผิด
  | 'QC_AI'          // ถนัด ตรวจ Defect, Image Analysis | เสี่ยง False positive
  | 'Workforce_AI'   // ถนัด Pattern คนทำงาน | เสี่ยง เกิดอคติตรรกะจากข้อมูลอดีต (Bias)
  | 'Finance_AI'     // ถนัด Cost/Risk Analysis | เสี่ยง Over-optimization แน่นเกินไป
  | 'Risk_AI'        // ถนัด Anomaly Detection | เสี่ยง Alert พร่ำเพรื่อเยอะเกินเหตุ
  | 'Logistics_AI'   // ถนัด Routing, SLA | เสี่ยง ข้อขัดแย้งเส้นทาง (Route conflict)
  | 'Campaign_AI'    // ถนัด Promotion Optimization | เสี่ยง พลังผลิตโตไม่ทัน (Demand spike)
  | 'Guardian_AI';   // ถนัด Monitor AI behavior | เสี่ยง รายงานตื่นตูมเกินจริง (False escalation)

/**
 * 📊 4. โครงสร้างวัตถุข้อมูลสัญญาณชีพ (Agent Signal Structure)
 * ใช้สำหรับทำ Asset Mapping และตรวจสอบข้อมูลสตรีมมิ่งผ่านท่อส่งข้อมูลหลัก
 */
export interface AgentTelemetrySignal {
  agentName: BabyAgentName;
  timestamp: string;
  status: TelemetryStatus | SelfReportingToken;
  confidenceScore: number;            // ค่าความมั่นใจเชิงสถิติ (0.00 ถึง 1.00)
  reasoningLog: string;               // บันทึกตรรกะเบื้องหลังการประมวลผลคำ (Reasoning Logs)
  isAnthropomorphicDetected: boolean; // 🔒 แฟลกตรวจสอบสภาวะหลอนทางภาษาที่อ้างอิงอารมณ์/จิตสำนึกมนุษย์
}
