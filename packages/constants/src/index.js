"use strict";
// Tool abstraction layer - Internal names for security engines
// Actual tool names are hidden from frontend
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCAN_STATUS = exports.SCAN_MODES = exports.RISK_LEVELS = exports.FINDING_CATEGORIES = exports.SEVERITY_LEVELS = exports.ENGINES_BY_CATEGORY = exports.ENGINE_CATEGORIES = exports.TOOL_IMPLEMENTATION_MAP = exports.SCANNER_ENGINES = void 0;
exports.SCANNER_ENGINES = {
    // Asset Discovery
    ASSET_DISCOVERY: 'asset_discovery_engine',
    // Technology Detection
    TECH_DETECTION: 'tech_detection_engine',
    // SSL/TLS Analysis
    SSL_TLS_ANALYSIS: 'ssl_tls_analysis_engine',
    // Vulnerability Detection
    VULNERABILITY_SCAN: 'vulnerability_detection_engine',
    // Runtime Security
    RUNTIME_SECURITY: 'runtime_security_engine',
    // API Security
    API_SECURITY: 'api_security_engine',
    // Code Security
    CODE_SECURITY: 'code_security_engine',
    // Secret Detection
    SECRET_DETECTION: 'secret_detection_engine',
    // Dependency Analysis
    DEPENDENCY_ANALYSIS: 'dependency_analysis_engine',
    // Infrastructure Security
    INFRASTRUCTURE_SECURITY: 'infrastructure_security_engine',
};
// Mapping of internal names to actual tools (backend only, never exposed to frontend)
exports.TOOL_IMPLEMENTATION_MAP = {
    [exports.SCANNER_ENGINES.ASSET_DISCOVERY]: {
        tools: ['nmap', 'httpx', 'dnsx'],
        displayName: 'Asset Discovery',
        description: 'Discovers external attack surface',
    },
    [exports.SCANNER_ENGINES.TECH_DETECTION]: {
        tools: ['whatweb'],
        displayName: 'Technology Detection',
        description: 'Identifies web technologies and frameworks',
    },
    [exports.SCANNER_ENGINES.SSL_TLS_ANALYSIS]: {
        tools: ['testssl.sh'],
        displayName: 'SSL/TLS Analysis',
        description: 'Analyzes SSL/TLS configuration',
    },
    [exports.SCANNER_ENGINES.VULNERABILITY_SCAN]: {
        tools: ['nuclei'],
        displayName: 'Vulnerability Scanner',
        description: 'Detects known vulnerabilities and CVEs',
    },
    [exports.SCANNER_ENGINES.RUNTIME_SECURITY]: {
        tools: ['owasp-zap'],
        displayName: 'Runtime Security',
        description: 'Tests runtime security issues',
    },
    [exports.SCANNER_ENGINES.API_SECURITY]: {
        tools: ['owasp-zap'],
        displayName: 'API Security',
        description: 'Analyzes API security',
    },
    [exports.SCANNER_ENGINES.CODE_SECURITY]: {
        tools: ['semgrep'],
        displayName: 'Code Security',
        description: 'Scans source code for security issues',
    },
    [exports.SCANNER_ENGINES.SECRET_DETECTION]: {
        tools: ['gitleaks'],
        displayName: 'Secret Detection',
        description: 'Detects exposed secrets and credentials',
    },
    [exports.SCANNER_ENGINES.DEPENDENCY_ANALYSIS]: {
        tools: ['trivy'],
        displayName: 'Dependency Analysis',
        description: 'Finds vulnerable dependencies',
    },
    [exports.SCANNER_ENGINES.INFRASTRUCTURE_SECURITY]: {
        tools: ['checkov'],
        displayName: 'Infrastructure Security',
        description: 'Analyzes infrastructure configuration',
    },
};
// Engine Categories for UI
exports.ENGINE_CATEGORIES = {
    WEBSITE_ANALYSIS: 'website_analysis',
    CODE_ANALYSIS: 'code_analysis',
    INFRASTRUCTURE: 'infrastructure',
};
// Categorized engines
exports.ENGINES_BY_CATEGORY = {
    [exports.ENGINE_CATEGORIES.WEBSITE_ANALYSIS]: [
        exports.SCANNER_ENGINES.ASSET_DISCOVERY,
        exports.SCANNER_ENGINES.TECH_DETECTION,
        exports.SCANNER_ENGINES.SSL_TLS_ANALYSIS,
        exports.SCANNER_ENGINES.VULNERABILITY_SCAN,
        exports.SCANNER_ENGINES.RUNTIME_SECURITY,
        exports.SCANNER_ENGINES.API_SECURITY,
    ],
    [exports.ENGINE_CATEGORIES.CODE_ANALYSIS]: [
        exports.SCANNER_ENGINES.CODE_SECURITY,
        exports.SCANNER_ENGINES.SECRET_DETECTION,
        exports.SCANNER_ENGINES.DEPENDENCY_ANALYSIS,
    ],
    [exports.ENGINE_CATEGORIES.INFRASTRUCTURE]: [
        exports.SCANNER_ENGINES.INFRASTRUCTURE_SECURITY,
    ],
};
// Severity Levels
exports.SEVERITY_LEVELS = {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info',
};
// Finding Categories
exports.FINDING_CATEGORIES = {
    AUTHENTICATION: 'authentication',
    API_SECURITY: 'api_security',
    HEADERS: 'headers',
    COOKIES: 'cookies',
    SSL_TLS: 'ssl_tls',
    SECRETS: 'secrets',
    DEPENDENCIES: 'dependencies',
    CODE_QUALITY: 'code_quality',
    INFRASTRUCTURE: 'infrastructure',
    CONFIGURATION: 'configuration',
};
// Risk Levels
exports.RISK_LEVELS = {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info',
};
// Scan Modes
exports.SCAN_MODES = {
    WEBSITE: 'website',
    GITHUB: 'github',
    COMBINED: 'combined',
};
// Scan Status
exports.SCAN_STATUS = {
    QUEUED: 'queued',
    RUNNING: 'running',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
};
exports.default = {
    SCANNER_ENGINES: exports.SCANNER_ENGINES,
    TOOL_IMPLEMENTATION_MAP: exports.TOOL_IMPLEMENTATION_MAP,
    ENGINE_CATEGORIES: exports.ENGINE_CATEGORIES,
    ENGINES_BY_CATEGORY: exports.ENGINES_BY_CATEGORY,
    SEVERITY_LEVELS: exports.SEVERITY_LEVELS,
    FINDING_CATEGORIES: exports.FINDING_CATEGORIES,
    RISK_LEVELS: exports.RISK_LEVELS,
    SCAN_MODES: exports.SCAN_MODES,
    SCAN_STATUS: exports.SCAN_STATUS,
};
//# sourceMappingURL=index.js.map