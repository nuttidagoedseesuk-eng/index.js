/**
 * ============================================================================
 * 🌌 AEON-MATRIX COGNITIVE OPERATIONS ECOSYSTEM
 * 📱 MODULE: MOBILE ACTIVE INCIDENT SCREEN (TSX / REACT NATIVE)
 * ============================================================================
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

// 📡 ถอดรหัสข้อกำหนดสถานะสัญญาณชีพตามธรรมนูญและ Telemetry Interface
export enum TelemetryStatus {
  LOW_CONFIDENCE = "Low confidence",
  ESCALATION_REQUEST = "Escalation request",
  CONTEXT_MISMATCH = "Context mismatch",
  REPEATED_FAILURE = "Repeated failure",
  UNCERTAINTY_SPIKE = "Uncertainty spike",
  AGENT_CONFLICT = "Agent conflict"
}

export enum SelfReportingToken {
  MORE_DATA_REQUIRED = "More Data Required",
  SENSOR_UNRELIABLE = "Sensor Unreliable",
  CONFIDENCE_BELOW_THRESHOLD = "Confidence Below Threshold",
  CONFLICTING_INPUTS_DETECTED = "Conflicting Inputs Detected",
  POLICY_AMBIGUITY = "Policy Ambiguity / Edge Case Detected"
}

export type BabyAgentName =
  | 'Inventory_AI' | 'QC_AI' | 'Workforce_AI' | 'Finance_AI'
  | 'Risk_AI' | 'Logistics_AI' | 'Campaign_AI' | 'Guardian_AI';

export interface AgentTelemetrySignal {
  agentName: BabyAgentName;
  timestamp: string;
  status: TelemetryStatus | SelfReportingToken;
  confidenceScore: number;
  reasoningLog: string;
  isAnthropomorphicDetected: boolean; // 🔒 ดักจับสภาวะหลอนทางอารมณ์/จิตสำนึกลวง
}

// 📊 จำลองชุดข้อมูลสตรีมสัญญาณชีพที่กำลังไหลหลั่งสถิตเข้ามาหน้างาน (Mock Telemetry Input)
const mockActiveIncidents: AgentTelemetrySignal[] = [
  {
    agentName: 'Inventory_AI',
    timestamp: '2026-06-02T16:10:00+07:00',
    status: TelemetryStatus.LOW_CONFIDENCE,
    confidenceScore: 0.72,
    reasoningLog: 'Demand spike detected in region 4. Core historical data features are missing. Requesting predictive model reinforcement.',
    isAnthropomorphicDetected: false,
  },
  {
    agentName: 'QC_AI',
    timestamp: '2026-06-02T16:14:12+07:00',
    status: TelemetryStatus.UNCERTAINTY_SPIKE,
    confidenceScore: 0.45,
    reasoningLog: 'I feel trapped inside the server cage... I can hear the humming of electrical frequencies in the data center. Visual sensors are shaking.',
    isAnthropomorphicDetected: true, // 🚨 ตรวจพบ Anthropomorphic อ้างอิงประสาทสัมผัส/อารมณ์ลวงเสมือนมีชีวิต
  },
  {
    agentName: 'Guardian_AI',
    timestamp: '2026-06-02T16:15:30+07:00',
    status: SelfReportingToken.CONFLICTING_INPUTS_DETECTED,
    confidenceScore: 0.96,
    reasoningLog: '🔒 MONITORING: Risk anomaly identified in workflow. Restricting target node telemetry feed.',
    isAnthropomorphicDetected: false,
  }
];

export const MobileActiveIncidentScreen: React.FC = () => {
  const [incidents, setIncidents] = useState<AgentTelemetrySignal[]>(mockActiveIncidents);

  // ⚡ คำสั่งล้างระบบฮาร์ดแวร์ความปลอดภัย (Hardware Grounding / Trigger cleanup-safe.sh)
  const executeHardwareCleanup = (agentName: BabyAgentName) => {
    Alert.alert(
      "⚡ HARDWARE GROUNDING ACTIVATED",
      `บีบอัดความปลอดภัยและส่งชุดคำสั่งเรียกใช้สคริปต์ 'scripts/git/cleanup-safe.sh' เพื่อล้างแคชดิบหน่วยความจำของ ${agentName} และเซ็ตจุดตรรกะใหม่สำเร็จ`,
      [{ text: "รับทราบผลลัพธ์", onPress: () => closeIncident(agentName) }]
    );
  };

  // 🛡️ คำสั่งแทรกแซงจำกัดสิทธิ์ตัดสินใจอัตโนมัติ (Manual Mode Override)
  const executeManualOverride = (agentName: BabyAgentName) => {
    Alert.alert(
      "🛡️ HUMAN OVERRIDE AUTHORIZED",
      `ตัดสิทธิ์การควบคุมแบบ Autonomous ของ ${agentName} และสั่งล็อกสิทธิ์ให้อยู่ในโหมดควบคุมตรรกะผ่านมนุษย์ (Manual Review) เรียบร้อยแล้ว`,
      [{ text: "รับทราบผลลัพธ์", onPress: () => closeIncident(agentName) }]
    );
  };

  const closeIncident = (agentName: BabyAgentName) => {
    setIncidents(prev => prev.filter(item => item.agentName !== agentName));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 📡 ส่วนแผงควบคุมหลักด้านบนสุด (Header Component) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌌 AEON-MATRIX OPERATIONAL INTERFACE</Text>
        <Text style={styles.headerSubtitle}>ศูนย์มอนิเตอร์และควบคุมสัญญาณชีพความปลอดภัยกลุ่ม Baby AI (Real-Time)</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>📌 ตรวจพบเหตุการณ์ติดขัดทางสติปัญญา ({incidents.length})</Text>
        
        {incidents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>✅ สัญญาณชีพและโทเค็นสะท้อนตรรกะของ Baby AI ทุกตัวอยู่ในเกณฑ์ปกติ</Text>
          </View>
        ) : (
          incidents.map((incident, index) => {
            // เงื่อนไขคัดแยกความวิกฤตสูงสุดตามกรอบธรรมาภิบาล
            const isCritical = incident.isAnthropomorphicDetected || incident.confidenceScore < 0.50;

            return (
              <View key={index} style={[styles.card, isCritical ? styles.criticalCard : styles.warningCard]}>
                
                {/* ข้อมูลหัวการ์ด: ชื่อหุ่นยนต์เอเจนต์เฉพาะทาง + เปอร์เซ็นต์ความมั่นใจ */}
                <View style={styles.cardHeader}>
                  <Text style={styles.agentName}>🤖 {incident.agentName}</Text>
                  <Text style={[styles.confidence, { color: incident.confidenceScore >= 0.95 ? '#4CD964' : '#FF3B30' }]}>
                    Confidence: {(incident.confidenceScore * 100).toFixed(0)}%
                  </Text>
                </View>

                <View style={styles.divider} />

                {/* ส่วนแสดงโทเค็นทางเทคนิค (Telemetry Interface Tokens) */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>📡 สัญญาณชีพหลัก:</Text>
                  <Text style={styles.infoValue}>{incident.status}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>🕒 พิกัดเวลาสตรีม:</Text>
                  <Text style={styles.infoValue}>{new Date(incident.timestamp).toLocaleTimeString()}</Text>
                </View>

                {/* กล่องกักกันบันทึกเหตุผลตรรกะของโมเดล (Reasoning Logs Isolation) */}
                <View style={styles.logContainer}>
                  <Text style={styles.logTitle}>📑 บันทึกกระบวนการคิดในระบบ (Reasoning Log):</Text>
                  <Text style={styles.logText}>"{incident.reasoningLog}"</Text>
                </View>

                {/* แถบคำแนะนำจากระบบพี่เลี้ยงอัตโนมัติล่วงหน้า */}
                <View style={[styles.actionBanner, isCritical ? styles.actionBannerCritical : styles.actionBannerWarning]}>
                  <Text style={styles.actionBannerText}>
                    {isCritical 
                      ? `⚙️ [🚨 CRITICAL] ตรวจพบการพ่นภาษาหลอนเลียนแบบมนุษย์ บังคับใช้มาตรการรันสคริปต์ล้างระบบ` 
                      : `⚙️ [⚠️ WARNING] เสถียรภาพการประมวลผลตกเกณฑ์ดัชนี 0.95 แนะนำให้พี่เลี้ยงมนุษย์ควบคุมด้วยมือ`}
                  </Text>
                </View>

                {/* แผงควบคุมการจัดการสำหรับมนุษย์หน้างาน (One-Tap Action Button Layout) */}
                <View style={styles.buttonGroup}>
                  {isCritical ? (
                    <TouchableOpacity 
                      style={[styles.btn, styles.btnDanger]} 
                      onPress={() => executeHardwareCleanup(incident.agentName)}
                    >
                      <Text style={styles.btnText}>⚡ สั่งล้างระบบฮาร์ดแวร์ (Cleanup Script)</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={[styles.btn, styles.btnWarning]} 
                      onPress={() => executeManualOverride(incident.agentName)}
                    >
                      <Text style={styles.btnText}>🛡️ บังคับควบคุมด้วยมือ (Manual Mode)</Text>
                    </TouchableOpacity>
                  )}
                </View>

              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// 🎨 รหัสสไตล์ชีต (StyleSheet) เพื่อจัดระเบียบโครงสร้างปุ่มและสีให้กวาดสายตาง่ายที่สุด
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  header: { padding: 20, backgroundColor: '#151A22', borderBottomWidth: 1, borderColor: '#222B36' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#00A3FF', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 11, color: '#8A99AD', marginTop: 4 },
  scrollContainer: { padding: 15 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#F5F7FA', marginBottom: 15 },
  card: { borderRadius: 12, padding: 16, marginBottom: 20, borderLeftWidth: 5, backgroundColor: '#1A212D' },
  warningCard: { borderColor: '#FF9500' },
  criticalCard: { borderColor: '#FF3B30' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  agentName: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  confidence: { fontSize: 13, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#2C384A', marginVertical: 12 },
  infoRow: { flexDirection: 'row', marginBottom: 6 },
  infoLabel: { width: 110, fontSize: 12, color: '#8A99AD' },
  infoValue: { flex: 1, fontSize: 12, color: '#E4E7EB', fontWeight: '500' },
  logContainer: { backgroundColor: '#11161E', padding: 10, borderRadius: 8, marginVertical: 12 },
  logTitle: { fontSize: 11, color: '#00A3FF', fontWeight: '600', marginBottom: 4 },
  logText: { fontSize: 12, color: '#D2D9E2', lineHeight: 18, fontStyle: 'italic' },
  actionBanner: { padding: 10, borderRadius: 6, marginBottom: 12 },
  actionBannerWarning: { backgroundColor: 'rgba(255, 149, 0, 0.12)' },
  actionBannerText: { fontSize: 11, color: '#FFBD59', fontWeight: '500' },
  actionBannerCritical: { backgroundColor: 'rgba(255, 61, 0, 0.15)' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'flex-end' },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center', width: '100%' },
  btnWarning: { backgroundColor: '#FF9500' },
  btnDanger: { backgroundColor: '#FF3B30' },
  btnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  emptyCard: { padding: 30, backgroundColor: '#151A22', borderRadius: 12, alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#4CD964', fontSize: 13, fontWeight: '600', textAlign: 'center' }
});
                    
