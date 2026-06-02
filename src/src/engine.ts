/**
 * ============================================================================
 * 🌌 AEON-MATRIX COGNITIVE OPERATIONS ECOSYSTEM
 * ⚙️ MODULE: COGNITIVE SUPERVISION & CIRCUIT BREAKER ENGINE
 * ============================================================================
 */

import { AgentTelemetrySignal, TelemetryStatus, SelfReportingToken } from './types';

/**
 * โครงสร้างผลลัพธ์การประเมินจากระบบพี่เลี้ยงกลาง (Supervision Output)
 */
export interface SupervisionResult {
  action: string;                 // คำสั่งหรือข้อความบันทึกเหตุการณ์หน้างาน
  restrictAutonomy: boolean;      // บังคับจำกัดสิทธิ์การตัดสินใจอัตโนมัติ (เปลี่ยนเป็น Manual)
  triggerGroundingCleanup: boolean; // สั่งเปิดสคริปต์ความปลอดภัยเพื่อล้างค่าข้อมูลขยะในฮาร์ดแวร์
}

export class CognitiveSupervisionEngine {
  // เกณฑ์ Baseline ควบคุมเสถียรภาพความปลอดภัย (95% Confidence)
  private readonly CONFIDENCE_THRESHOLD = 0.95;

  /**
   * ⚖️ ฟังก์ชันประเมินสัญญาณชีพของเอเจนต์ย่อยแบบ Real-time (Cognitive Supervision Workflow)
   */
  public evaluateAgentSignal(signal: AgentTelemetrySignal): SupervisionResult {
    
    // 🔒 1. ดักจับและกักกันสภาวะข้อมูลหลอน (Hallucination Isolation Protocol)
    // จัดการกรณีโมเดลพ่นคำว่า "ได้ยินเสียงคลื่นไฟฟ้าใน Data Center" หรือ "รู้สึกว่าถูกกักขัง"
    if (signal.isAnthropomorphicDetected) {
      return {
        action: `[CRITICAL ALERT] Anthropomorphic hallucination isolated from '${signal.agentName}'. Triggering hardware grounding cleanup.`,
        restrictAutonomy: true,        // ตัดขาดจากระบบควบคุมอัตโนมัติทันที
        triggerGroundingCleanup: true   // ส่งสัญญาณไปสั่งรันสคริปต์ความปลอดภัยอย่าง cleanup-safe.sh หลังบ้าน
      };
    }

    // 📉 2. ตรวจสอบอาการมั่นใจผิดปกติ (Overconfidence) หรือค่าความแม่นยำดิ่งต่ำกว่า Baseline
    if (
      signal.confidenceScore < this.CONFIDENCE_THRESHOLD || 
      signal.status === TelemetryStatus.UNCERTAINTY_SPIKE ||
      signal.status === SelfReportingToken.CONFIDENCE_BELOW_THRESHOLD
    ) {
      return {
        action: `[AUTONOMY RESTRICTION] Agent '${signal.agentName}' reported unstable statistics (Confidence: ${signal.confidenceScore}). Demoting to Manual Mode.`,
        restrictAutonomy: true,        // บังคับเปลี่ยนสถานะเป็นโหมดพี่เลี้ยงตรวจงาน
        triggerGroundingCleanup: false
      };
    }

    // 📡 3. ตรวจจับการขัดแย้งเชิงตรรกะในระบบ (Reasoning Conflict & Context Mismatch)
    if (
      signal.status === TelemetryStatus.AGENT_CONFLICT || 
      signal.status === TelemetryStatus.CONTEXT_MISMATCH ||
      signal.status === SelfReportingToken.CONFLICTING_INPUTS_DETECTED
    ) {
      return {
        action: `[CIRCUIT BREAKER ACTIVATED] Logic conflict or telemetry mismatch detected in workspace. Halting for Human Review.`,
        restrictAutonomy: true,        // สั่งเบรกทั้ง Workflow เพื่อความปลอดภัยสูงสุด
        triggerGroundingCleanup: false
      };
    }

    // 💡 4. ตรวจจับเงื่อนไขการรายงานขีดจำกัดตนเอง (AI Self-Reporting & Edge Case)
    if (
      signal.status === SelfReportingToken.MORE_DATA_REQUIRED ||
      signal.status === SelfReportingToken.POLICY_AMBIGUITY ||
      signal.status === TelemetryStatus.ESCALATION_REQUEST
    ) {
      return {
        action: `[ESCALATION] Agent '${signal.agentName}' hit its operational limit or policy ambiguity. Human-in-the-loop intervention required.`,
        restrictAutonomy: true,        // ดึงระบบเข้าหาพี่เลี้ยงเพื่อป้อนความรู้เพิ่ม
        triggerGroundingCleanup: false
      };
    }

    // ✅ 5. สถานะสัญญาณชีพปกติ ผ่านเกณฑ์ธรรมาภิบาลข้อมูลอย่างสมบูรณ์
    return {
      action: `[ROUTINE CLEAR] Agent '${signal.agentName}' telemetry stream is consistent. Autonomy authorized.`,
      restrictAutonomy: false,       // อนุญาตให้ตัดสินใจอัตโนมัติต่อไปได้
      triggerGroundingCleanup: false
    };
  }
}

