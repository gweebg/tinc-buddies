export enum TransactionRisk {
  VERY_LOW = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
}

export enum TransactionRiskPercent {
  VERY_LOW = 0.1,
  LOW = 0.25,
  MEDIUM = 0.5,
  HIGH = 0.75,
  VERY_HIGH = 1,
}

export async function getRiskPercent(risk: TransactionRisk): Promise<number> {
  if (risk === TransactionRisk.VERY_LOW) {
    return TransactionRiskPercent.VERY_LOW;
  }
  if (risk === TransactionRisk.LOW) {
    return TransactionRiskPercent.LOW;
  }
  if (risk === TransactionRisk.MEDIUM) {
    return TransactionRiskPercent.MEDIUM;
  }
  if (risk === TransactionRisk.HIGH) {
    return TransactionRiskPercent.HIGH;
  }
  if (risk === TransactionRisk.VERY_HIGH) {
    return TransactionRiskPercent.VERY_HIGH;
  }
}
