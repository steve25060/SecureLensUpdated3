"use strict";
/**
 * Unified Findings Schema
 *
 * This defines the standard format for all security findings
 * across all security engines, regardless of their original output format.
 *
 * Every scanner output is parsed into this normalized schema.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindingCategory = exports.FindingStatus = exports.FindingSeverity = void 0;
exports.createUnifiedFinding = createUnifiedFinding;
exports.isValidFinding = isValidFinding;
var FindingSeverity;
(function (FindingSeverity) {
    FindingSeverity["CRITICAL"] = "critical";
    FindingSeverity["HIGH"] = "high";
    FindingSeverity["MEDIUM"] = "medium";
    FindingSeverity["LOW"] = "low";
    FindingSeverity["INFO"] = "info";
})(FindingSeverity || (exports.FindingSeverity = FindingSeverity = {}));
var FindingStatus;
(function (FindingStatus) {
    FindingStatus["NEW"] = "new";
    FindingStatus["OPEN"] = "open";
    FindingStatus["ACKNOWLEDGED"] = "acknowledged";
    FindingStatus["RESOLVED"] = "resolved";
    FindingStatus["FALSE_POSITIVE"] = "false_positive";
    FindingStatus["DUPLICATE"] = "duplicate";
})(FindingStatus || (exports.FindingStatus = FindingStatus = {}));
var FindingCategory;
(function (FindingCategory) {
    FindingCategory["AUTHENTICATION"] = "authentication";
    FindingCategory["API_SECURITY"] = "api_security";
    FindingCategory["HEADERS"] = "headers";
    FindingCategory["COOKIES"] = "cookies";
    FindingCategory["SSL_TLS"] = "ssl_tls";
    FindingCategory["SECRETS"] = "secrets";
    FindingCategory["DEPENDENCIES"] = "dependencies";
    FindingCategory["CODE_QUALITY"] = "code_quality";
    FindingCategory["INFRASTRUCTURE"] = "infrastructure";
    FindingCategory["CONFIGURATION"] = "configuration";
    FindingCategory["INJECTION"] = "injection";
    FindingCategory["XSS"] = "xss";
    FindingCategory["CSRF"] = "csrf";
    FindingCategory["MISCONFIGURATION"] = "misconfiguration";
    FindingCategory["EXPOSURE"] = "exposure";
})(FindingCategory || (exports.FindingCategory = FindingCategory = {}));
/**
 * Helper function to create a unified finding
 */
function createUnifiedFinding(overrides) {
    const now = new Date();
    return {
        title: '',
        description: '',
        severity: FindingSeverity.MEDIUM,
        status: FindingStatus.NEW,
        category: FindingCategory.MISCONFIGURATION,
        source: '',
        engine: '',
        scanId: '',
        workspaceId: '',
        firstSeen: now,
        lastSeen: now,
        createdAt: now,
        updatedAt: now,
        ...overrides,
    };
}
/**
 * Helper function to validate a finding
 */
function isValidFinding(finding) {
    return (finding.title &&
        finding.description &&
        finding.severity &&
        finding.status &&
        finding.category &&
        finding.source &&
        finding.engine &&
        finding.scanId &&
        finding.workspaceId &&
        finding.firstSeen &&
        finding.lastSeen &&
        finding.createdAt &&
        finding.updatedAt);
}
exports.default = {
    FindingSeverity,
    FindingStatus,
    FindingCategory,
    createUnifiedFinding,
    isValidFinding,
};
//# sourceMappingURL=index.js.map