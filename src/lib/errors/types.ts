// src/lib/errors/types.ts
// Error code registry types.

export type Severity = 'CRITICAL' | 'ERROR' | 'WARN' | 'INFO';

export interface ErrorCodeDef {
  severity: Severity;
  message: string;
  retryable: boolean;
  userImpact: 'blocked' | 'degraded' | 'none';
  requiredContext?: string[];
}

export interface ErrorContext {
  [key: string]: string | number | boolean;
}
