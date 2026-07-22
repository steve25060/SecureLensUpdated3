export declare const SCANNER_ENGINES: {
    readonly ASSET_DISCOVERY: 'asset_discovery_engine';
    readonly TECH_DETECTION: 'tech_detection_engine';
    readonly SSL_TLS_ANALYSIS: 'ssl_tls_analysis_engine';
    readonly VULNERABILITY_SCAN: 'vulnerability_detection_engine';
    readonly RUNTIME_SECURITY: 'runtime_security_engine';
    readonly API_SECURITY: 'api_security_engine';
    readonly CODE_SECURITY: 'code_security_engine';
    readonly SECRET_DETECTION: 'secret_detection_engine';
    readonly DEPENDENCY_ANALYSIS: 'dependency_analysis_engine';
    readonly INFRASTRUCTURE_SECURITY: 'infrastructure_security_engine';
};
export declare const TOOL_IMPLEMENTATION_MAP: {
    readonly asset_discovery_engine: {
        readonly tools: readonly ['nmap', 'httpx', 'dnsx'];
        readonly displayName: 'Asset Discovery';
        readonly description: 'Discovers external attack surface';
    };
    readonly tech_detection_engine: {
        readonly tools: readonly ['whatweb'];
        readonly displayName: 'Technology Detection';
        readonly description: 'Identifies web technologies and frameworks';
    };
    readonly ssl_tls_analysis_engine: {
        readonly tools: readonly ['testssl.sh'];
        readonly displayName: 'SSL/TLS Analysis';
        readonly description: 'Analyzes SSL/TLS configuration';
    };
    readonly vulnerability_detection_engine: {
        readonly tools: readonly ['nuclei'];
        readonly displayName: 'Vulnerability Scanner';
        readonly description: 'Detects known vulnerabilities and CVEs';
    };
    readonly runtime_security_engine: {
        readonly tools: readonly ['owasp-zap'];
        readonly displayName: 'Runtime Security';
        readonly description: 'Tests runtime security issues';
    };
    readonly api_security_engine: {
        readonly tools: readonly ['owasp-zap'];
        readonly displayName: 'API Security';
        readonly description: 'Analyzes API security';
    };
    readonly code_security_engine: {
        readonly tools: readonly ['semgrep'];
        readonly displayName: 'Code Security';
        readonly description: 'Scans source code for security issues';
    };
    readonly secret_detection_engine: {
        readonly tools: readonly ['gitleaks'];
        readonly displayName: 'Secret Detection';
        readonly description: 'Detects exposed secrets and credentials';
    };
    readonly dependency_analysis_engine: {
        readonly tools: readonly ['trivy'];
        readonly displayName: 'Dependency Analysis';
        readonly description: 'Finds vulnerable dependencies';
    };
    readonly infrastructure_security_engine: {
        readonly tools: readonly ['checkov'];
        readonly displayName: 'Infrastructure Security';
        readonly description: 'Analyzes infrastructure configuration';
    };
};
export declare const ENGINE_CATEGORIES: {
    readonly WEBSITE_ANALYSIS: 'website_analysis';
    readonly CODE_ANALYSIS: 'code_analysis';
    readonly INFRASTRUCTURE: 'infrastructure';
};
export declare const ENGINES_BY_CATEGORY: {
    readonly website_analysis: readonly ["asset_discovery_engine", "tech_detection_engine", "ssl_tls_analysis_engine", "vulnerability_detection_engine", "runtime_security_engine", "api_security_engine"];
    readonly code_analysis: readonly ["code_security_engine", "secret_detection_engine", "dependency_analysis_engine"];
    readonly infrastructure: readonly ["infrastructure_security_engine"];
};
export declare const SEVERITY_LEVELS: {
    readonly CRITICAL: 'critical';
    readonly HIGH: 'high';
    readonly MEDIUM: 'medium';
    readonly LOW: 'low';
    readonly INFO: 'info';
};
export declare const FINDING_CATEGORIES: {
    readonly AUTHENTICATION: 'authentication';
    readonly API_SECURITY: 'api_security';
    readonly HEADERS: 'headers';
    readonly COOKIES: 'cookies';
    readonly SSL_TLS: 'ssl_tls';
    readonly SECRETS: 'secrets';
    readonly DEPENDENCIES: 'dependencies';
    readonly CODE_QUALITY: 'code_quality';
    readonly INFRASTRUCTURE: 'infrastructure';
    readonly CONFIGURATION: 'configuration';
};
export declare const RISK_LEVELS: {
    readonly CRITICAL: 'critical';
    readonly HIGH: 'high';
    readonly MEDIUM: 'medium';
    readonly LOW: 'low';
    readonly INFO: 'info';
};
export declare const SCAN_MODES: {
    readonly WEBSITE: 'website';
    readonly GITHUB: 'github';
    readonly COMBINED: 'combined';
};
export declare const SCAN_STATUS: {
    readonly QUEUED: 'queued';
    readonly RUNNING: 'running';
    readonly PROCESSING: 'processing';
    readonly COMPLETED: 'completed';
    readonly FAILED: 'failed';
    readonly CANCELLED: 'cancelled';
};
declare const _default: {
    SCANNER_ENGINES: {
        readonly ASSET_DISCOVERY: 'asset_discovery_engine';
        readonly TECH_DETECTION: 'tech_detection_engine';
        readonly SSL_TLS_ANALYSIS: 'ssl_tls_analysis_engine';
        readonly VULNERABILITY_SCAN: 'vulnerability_detection_engine';
        readonly RUNTIME_SECURITY: 'runtime_security_engine';
        readonly API_SECURITY: 'api_security_engine';
        readonly CODE_SECURITY: 'code_security_engine';
        readonly SECRET_DETECTION: 'secret_detection_engine';
        readonly DEPENDENCY_ANALYSIS: 'dependency_analysis_engine';
        readonly INFRASTRUCTURE_SECURITY: 'infrastructure_security_engine';
    };
    TOOL_IMPLEMENTATION_MAP: {
        readonly asset_discovery_engine: {
            readonly tools: readonly ['nmap', 'httpx', 'dnsx'];
            readonly displayName: 'Asset Discovery';
            readonly description: 'Discovers external attack surface';
        };
        readonly tech_detection_engine: {
            readonly tools: readonly ['whatweb'];
            readonly displayName: 'Technology Detection';
            readonly description: 'Identifies web technologies and frameworks';
        };
        readonly ssl_tls_analysis_engine: {
            readonly tools: readonly ['testssl.sh'];
            readonly displayName: 'SSL/TLS Analysis';
            readonly description: 'Analyzes SSL/TLS configuration';
        };
        readonly vulnerability_detection_engine: {
            readonly tools: readonly ['nuclei'];
            readonly displayName: 'Vulnerability Scanner';
            readonly description: 'Detects known vulnerabilities and CVEs';
        };
        readonly runtime_security_engine: {
            readonly tools: readonly ['owasp-zap'];
            readonly displayName: 'Runtime Security';
            readonly description: 'Tests runtime security issues';
        };
        readonly api_security_engine: {
            readonly tools: readonly ['owasp-zap'];
            readonly displayName: 'API Security';
            readonly description: 'Analyzes API security';
        };
        readonly code_security_engine: {
            readonly tools: readonly ['semgrep'];
            readonly displayName: 'Code Security';
            readonly description: 'Scans source code for security issues';
        };
        readonly secret_detection_engine: {
            readonly tools: readonly ['gitleaks'];
            readonly displayName: 'Secret Detection';
            readonly description: 'Detects exposed secrets and credentials';
        };
        readonly dependency_analysis_engine: {
            readonly tools: readonly ['trivy'];
            readonly displayName: 'Dependency Analysis';
            readonly description: 'Finds vulnerable dependencies';
        };
        readonly infrastructure_security_engine: {
            readonly tools: readonly ['checkov'];
            readonly displayName: 'Infrastructure Security';
            readonly description: 'Analyzes infrastructure configuration';
        };
    };
    ENGINE_CATEGORIES: {
        readonly WEBSITE_ANALYSIS: 'website_analysis';
        readonly CODE_ANALYSIS: 'code_analysis';
        readonly INFRASTRUCTURE: 'infrastructure';
    };
    ENGINES_BY_CATEGORY: {
        readonly website_analysis: readonly ["asset_discovery_engine", "tech_detection_engine", "ssl_tls_analysis_engine", "vulnerability_detection_engine", "runtime_security_engine", "api_security_engine"];
        readonly code_analysis: readonly ["code_security_engine", "secret_detection_engine", "dependency_analysis_engine"];
        readonly infrastructure: readonly ["infrastructure_security_engine"];
    };
    SEVERITY_LEVELS: {
        readonly CRITICAL: 'critical';
        readonly HIGH: 'high';
        readonly MEDIUM: 'medium';
        readonly LOW: 'low';
        readonly INFO: 'info';
    };
    FINDING_CATEGORIES: {
        readonly AUTHENTICATION: 'authentication';
        readonly API_SECURITY: 'api_security';
        readonly HEADERS: 'headers';
        readonly COOKIES: 'cookies';
        readonly SSL_TLS: 'ssl_tls';
        readonly SECRETS: 'secrets';
        readonly DEPENDENCIES: 'dependencies';
        readonly CODE_QUALITY: 'code_quality';
        readonly INFRASTRUCTURE: 'infrastructure';
        readonly CONFIGURATION: 'configuration';
    };
    RISK_LEVELS: {
        readonly CRITICAL: 'critical';
        readonly HIGH: 'high';
        readonly MEDIUM: 'medium';
        readonly LOW: 'low';
        readonly INFO: 'info';
    };
    SCAN_MODES: {
        readonly WEBSITE: 'website';
        readonly GITHUB: 'github';
        readonly COMBINED: 'combined';
    };
    SCAN_STATUS: {
        readonly QUEUED: 'queued';
        readonly RUNNING: 'running';
        readonly PROCESSING: 'processing';
        readonly COMPLETED: 'completed';
        readonly FAILED: 'failed';
        readonly CANCELLED: 'cancelled';
    };
};
export default _default;
