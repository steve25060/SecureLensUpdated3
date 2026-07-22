/**
 * Unified Findings Schema
 *
 * This defines the standard format for all security findings
 * across all security engines, regardless of their original output format.
 *
 * Every scanner output is parsed into this normalized schema.
 */
export declare enum FindingSeverity {
    CRITICAL = "critical",
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low",
    INFO = "info"
}
export declare enum FindingStatus {
    NEW = "new",
    OPEN = "open",
    ACKNOWLEDGED = "acknowledged",
    RESOLVED = "resolved",
    FALSE_POSITIVE = "false_positive",
    DUPLICATE = "duplicate"
}
export declare enum FindingCategory {
    AUTHENTICATION = "authentication",
    API_SECURITY = "api_security",
    HEADERS = "headers",
    COOKIES = "cookies",
    SSL_TLS = "ssl_tls",
    SECRETS = "secrets",
    DEPENDENCIES = "dependencies",
    CODE_QUALITY = "code_quality",
    INFRASTRUCTURE = "infrastructure",
    CONFIGURATION = "configuration",
    INJECTION = "injection",
    XSS = "xss",
    CSRF = "csrf",
    MISCONFIGURATION = "misconfiguration",
    EXPOSURE = "exposure"
}
/**
 * Core Finding Interface
 */
export interface UnifiedFinding {
    id?: string;
    scanId: string;
    workspaceId: string;
    title: string;
    description: string;
    severity: FindingSeverity;
    status: FindingStatus;
    category: FindingCategory;
    source: string;
    sourceId?: string;
    engine: string;
    targetHost?: string;
    targetUrl?: string;
    targetPath?: string;
    targetPort?: number;
    parameter?: string;
    evidence?: string;
    reproductionSteps?: string[];
    requestExample?: string;
    responseExample?: string;
    remediation?: string;
    remediationEffort?: 'low' | 'medium' | 'high';
    cwe?: string;
    cvss?: number;
    cvssVector?: string;
    cve?: string;
    owasp?: string;
    capec?: string;
    references?: string[];
    tags?: string[];
    affectedComponent?: string;
    affectedVersion?: string;
    aiExplanation?: string;
    aiRemediationSuggestion?: string;
    firstSeen: Date;
    lastSeen: Date;
    resolvedAt?: Date;
    correlatedFindingIds?: string[];
    isDuplicate?: boolean;
    parentFindingId?: string;
    riskScore?: number;
    businessImpact?: string;
    exploitability?: 'low' | 'medium' | 'high' | 'critical';
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
}
/**
 * Result Parser Input Interface
 * This is what scanners return before normalization
 */
export interface RawScannerResult {
    engine: string;
    target: string;
    timestamp: Date;
    findings: any[];
    metadata?: Record<string, any>;
    errors?: string[];
}
/**
 * Parser Interface
 */
export interface IScannerParser {
    parse(rawResult: RawScannerResult): UnifiedFinding[];
    canHandle(engine: string): boolean;
}
/**
 * Finding Batch Interface
 */
export interface FindingBatch {
    scanId: string;
    findings: UnifiedFinding[];
    totalCount: number;
    timestamp: Date;
}
/**
 * Correlation Result
 */
export interface CorrelationResult {
    originalFindings: UnifiedFinding[];
    correlatedFindings: UnifiedFinding[];
    removedDuplicates: string[];
    mergedGroups: Map<string, UnifiedFinding[]>;
}
/**
 * Finding Statistics
 */
export interface FindingStats {
    total: number;
    bySeverity: {
        critical: number;
        high: number;
        medium: number;
        low: number;
        info: number;
    };
    byCategory: Record<FindingCategory, number>;
    byEngine: Record<string, number>;
    resolved: number;
    duplicates: number;
    falsePositives: number;
}
/**
 * Helper function to create a unified finding
 */
export declare function createUnifiedFinding(overrides: Partial<UnifiedFinding>): UnifiedFinding;
/**
 * Helper function to validate a finding
 */
export declare function isValidFinding(finding: any): finding is UnifiedFinding;
declare const _default: {
    FindingSeverity: typeof FindingSeverity;
    FindingStatus: typeof FindingStatus;
    FindingCategory: typeof FindingCategory;
    createUnifiedFinding: typeof createUnifiedFinding;
    isValidFinding: typeof isValidFinding;
};
export default _default;
