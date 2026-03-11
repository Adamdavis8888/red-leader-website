import Link from 'next/link'
import type { Metadata } from 'next'
import { services } from '@/app/data/services'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Services - Red Leader',
  description: 'Emergency infrastructure rescue, cloud migration, AI security, LLM infrastructure, DevOps, and high-availability solutions. 24/7 expert support for enterprise systems.',
}

// Service icons by slug
const serviceIcons: Record<string, React.ReactNode> = {
  'emergency-recovery': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  'cloud-migration': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  'infrastructure-modernization': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  'high-availability': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'cicd-devops': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  'networking': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  'disaster-prevention': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  'ai-security': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  'ai-infrastructure': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  'prompting-parties': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
}

// Unique SVG illustrations for each service
const serviceIllustrations: Record<string, React.ReactNode> = {
  'emergency-recovery': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* Server rack */}
      <rect x="70" y="30" width="100" height="120" rx="6" stroke="#dc2626" strokeWidth="2" fill="#fef2f2"/>
      <rect x="82" y="45" width="76" height="14" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <rect x="82" y="67" width="76" height="14" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <rect x="82" y="89" width="76" height="14" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      {/* Status lights */}
      <circle cx="92" cy="52" r="3" fill="#dc2626"><animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/></circle>
      <circle cx="92" cy="74" r="3" fill="#f59e0b"/>
      <circle cx="92" cy="96" r="3" fill="#22c55e"/>
      {/* Lightning bolt - emergency */}
      <path d="M120 10l-15 30h12l-8 25 20-30h-14l10-25z" fill="#dc2626" opacity="0.8"/>
      {/* Wrench */}
      <path d="M175 60l-15 15m0 0l-5-5m5 5l5-5" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="178" cy="57" r="8" stroke="#dc2626" strokeWidth="2" fill="none"/>
    </svg>
  ),
  'cloud-migration': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* On-prem server */}
      <rect x="20" y="80" width="50" height="70" rx="4" stroke="#6b7280" strokeWidth="2" fill="#f3f4f6"/>
      <rect x="28" y="90" width="34" height="8" rx="1" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1"/>
      <rect x="28" y="104" width="34" height="8" rx="1" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1"/>
      <rect x="28" y="118" width="34" height="8" rx="1" fill="#e5e7eb" stroke="#6b7280" strokeWidth="1"/>
      {/* Arrow */}
      <path d="M80 110h50" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 4"/>
      <path d="M125 105l10 5-10 5" fill="#dc2626"/>
      {/* Cloud */}
      <path d="M160 75c0-11 9-20 20-20 8.5 0 15.8 5.3 18.7 12.8C201 65.4 205 63 210 63c8.3 0 15 6.7 15 15 0 .5 0 1-.1 1.5 4.5 2.3 7.6 7 7.6 12.5 0 7.7-6.3 14-14 14h-46c-7.2 0-13-5.8-13-13 0-5.5 3.5-10.2 8.4-12 .1-.2.1-4 0-6z" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      {/* Check in cloud */}
      <path d="M185 82l6 6 12-12" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'infrastructure-modernization': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* Old system */}
      <rect x="20" y="50" width="70" height="90" rx="4" stroke="#9ca3af" strokeWidth="2" fill="#f9fafb" strokeDasharray="4 2"/>
      <text x="55" y="80" textAnchor="middle" fontSize="10" fill="#9ca3af" fontFamily="monospace">Legacy</text>
      <rect x="30" y="90" width="50" height="6" rx="1" fill="#e5e7eb"/>
      <rect x="30" y="102" width="50" height="6" rx="1" fill="#e5e7eb"/>
      <rect x="30" y="114" width="50" height="6" rx="1" fill="#e5e7eb"/>
      {/* Transform arrow */}
      <path d="M100 95h30" stroke="#dc2626" strokeWidth="2"/>
      <path d="M125 90l10 5-10 5" fill="#dc2626"/>
      {/* Modern microservices */}
      <rect x="145" y="40" width="35" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <rect x="190" y="40" width="35" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <rect x="145" y="80" width="35" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <rect x="190" y="80" width="35" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <rect x="168" y="120" width="35" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      {/* Connections */}
      <line x1="180" y1="55" x2="190" y2="55" stroke="#dc2626" strokeWidth="1" opacity="0.5"/>
      <line x1="162" y1="70" x2="162" y2="80" stroke="#dc2626" strokeWidth="1" opacity="0.5"/>
      <line x1="207" y1="70" x2="207" y2="80" stroke="#dc2626" strokeWidth="1" opacity="0.5"/>
      <line x1="180" y1="95" x2="190" y2="95" stroke="#dc2626" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  'high-availability': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* Shield */}
      <path d="M120 20l50 20v50c0 30-20 55-50 70-30-15-50-40-50-70V40l50-20z" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      {/* Uptime arrow */}
      <path d="M120 60v40" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
      <path d="M108 72l12-16 12 16" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      {/* 99.99% text */}
      <text x="120" y="120" textAnchor="middle" fontSize="14" fill="#dc2626" fontWeight="bold" fontFamily="system-ui">99.99%</text>
      <text x="120" y="135" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="system-ui">uptime</text>
      {/* Redundancy nodes */}
      <circle cx="40" cy="90" r="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <circle cx="200" cy="90" r="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <path d="M52 90h18" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 2"/>
      <path d="M188 90h-18" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 2"/>
    </svg>
  ),
  'cicd-devops': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* Infinity/pipeline loop */}
      <path d="M70 90c0-22 18-40 40-40s40 18 40 40-18 40-40 40" stroke="#dc2626" strokeWidth="2.5" fill="none"/>
      <path d="M170 90c0 22-18 40-40 40s-40-18-40-40 18-40 40-40" stroke="#dc2626" strokeWidth="2.5" fill="none" strokeDasharray="6 4"/>
      {/* Pipeline stages */}
      <circle cx="70" cy="90" r="14" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="70" y="94" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">Code</text>
      <circle cx="120" cy="50" r="14" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="120" y="54" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">Build</text>
      <circle cx="170" cy="90" r="14" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="170" y="94" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">Test</text>
      <circle cx="120" cy="130" r="14" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="120" y="134" textAnchor="middle" fontSize="7" fill="#dc2626" fontWeight="bold">Deploy</text>
      {/* Rocket */}
      <path d="M205 30l-5 15h10l-5-15z" fill="#dc2626"/>
      <path d="M200 45l5 8 5-8" fill="#f59e0b"/>
    </svg>
  ),
  'networking': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* Central hub */}
      <circle cx="120" cy="90" r="20" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <circle cx="120" cy="90" r="8" fill="#dc2626"/>
      {/* Nodes */}
      <circle cx="50" cy="40" r="14" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5"/>
      <circle cx="190" cy="40" r="14" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5"/>
      <circle cx="50" cy="140" r="14" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5"/>
      <circle cx="190" cy="140" r="14" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5"/>
      <circle cx="30" cy="90" r="14" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5"/>
      <circle cx="210" cy="90" r="14" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5"/>
      {/* Connections */}
      <line x1="64" y1="48" x2="102" y2="78" stroke="#dc2626" strokeWidth="1.5" opacity="0.6"/>
      <line x1="176" y1="48" x2="138" y2="78" stroke="#dc2626" strokeWidth="1.5" opacity="0.6"/>
      <line x1="64" y1="132" x2="102" y2="102" stroke="#dc2626" strokeWidth="1.5" opacity="0.6"/>
      <line x1="176" y1="132" x2="138" y2="102" stroke="#dc2626" strokeWidth="1.5" opacity="0.6"/>
      <line x1="44" y1="90" x2="100" y2="90" stroke="#dc2626" strokeWidth="1.5" opacity="0.6"/>
      <line x1="196" y1="90" x2="140" y2="90" stroke="#dc2626" strokeWidth="1.5" opacity="0.6"/>
      {/* Data packets */}
      <circle cx="83" cy="64" r="3" fill="#dc2626"><animate attributeName="cx" values="64;102" dur="2s" repeatCount="indefinite"/><animate attributeName="cy" values="48;78" dur="2s" repeatCount="indefinite"/></circle>
    </svg>
  ),
  'disaster-prevention': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* Shield with checkmark */}
      <path d="M120 15l60 25v55c0 35-25 65-60 80-35-15-60-45-60-80V40l60-25z" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      <path d="M95 85l15 15 35-35" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Monitoring lines */}
      <path d="M20 150h30l5-10 8 20 6-15 8 10 5-5h30" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <path d="M130 150h20l5-8 6 16 5-12 7 8 4-4h25" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      {/* Warning indicators prevented */}
      <circle cx="35" cy="35" r="10" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
      <line x1="28" y1="28" x2="42" y2="42" stroke="#9ca3af" strokeWidth="1.5"/>
      <circle cx="205" cy="35" r="10" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
      <line x1="198" y1="28" x2="212" y2="42" stroke="#9ca3af" strokeWidth="1.5"/>
    </svg>
  ),
  'ai-security': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* Shield */}
      <path d="M120 20l55 22v48c0 32-22 58-55 72-33-14-55-40-55-72V42l55-22z" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      {/* AI brain icon inside shield */}
      <circle cx="120" cy="75" r="22" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <path d="M108 75c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="#dc2626" strokeWidth="2" fill="none"/>
      <circle cx="112" cy="72" r="2.5" fill="#dc2626"/>
      <circle cx="128" cy="72" r="2.5" fill="#dc2626"/>
      <circle cx="120" cy="82" r="2.5" fill="#dc2626"/>
      <line x1="112" y1="72" x2="120" y2="82" stroke="#dc2626" strokeWidth="1.5"/>
      <line x1="128" y1="72" x2="120" y2="82" stroke="#dc2626" strokeWidth="1.5"/>
      <line x1="112" y1="72" x2="128" y2="72" stroke="#dc2626" strokeWidth="1.5"/>
      {/* Lock */}
      <rect x="111" y="100" width="18" height="14" rx="2" fill="#dc2626" opacity="0.8"/>
      <path d="M115 100v-4a5 5 0 0110 0v4" stroke="#dc2626" strokeWidth="2" fill="none"/>
      <circle cx="120" cy="108" r="2" fill="white"/>
      {/* Prompt injection blocks */}
      <rect x="25" y="50" width="40" height="12" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" opacity="0.6"/>
      <line x1="25" y1="50" x2="65" y2="62" stroke="#dc2626" strokeWidth="1.5" opacity="0.5"/>
      <rect x="175" y="50" width="40" height="12" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" opacity="0.6"/>
      <line x1="175" y1="50" x2="215" y2="62" stroke="#dc2626" strokeWidth="1.5" opacity="0.5"/>
      {/* Data flow lines */}
      <path d="M30 140h180" stroke="#dc2626" strokeWidth="1" opacity="0.3" strokeDasharray="4 3"/>
      <path d="M30 150h180" stroke="#dc2626" strokeWidth="1" opacity="0.3" strokeDasharray="4 3"/>
    </svg>
  ),
  'prompting-parties': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* People around a table */}
      <rect x="60" y="90" width="120" height="8" rx="4" fill="#dc2626" opacity="0.2"/>
      {/* Laptop screens on table */}
      <rect x="75" y="70" width="30" height="22" rx="2" fill="#1f2937" stroke="#374151" strokeWidth="1.5"/>
      <rect x="78" y="73" width="24" height="14" rx="1" fill="#111827"/>
      <rect x="81" y="76" width="18" height="2" rx="1" fill="#dc2626" opacity="0.7"/>
      <rect x="81" y="80" width="14" height="2" rx="1" fill="#4ade80" opacity="0.6"/>
      <rect x="135" y="70" width="30" height="22" rx="2" fill="#1f2937" stroke="#374151" strokeWidth="1.5"/>
      <rect x="138" y="73" width="24" height="14" rx="1" fill="#111827"/>
      <rect x="141" y="76" width="18" height="2" rx="1" fill="#dc2626" opacity="0.7"/>
      <rect x="141" y="80" width="14" height="2" rx="1" fill="#4ade80" opacity="0.6"/>
      {/* Person 1 - instructor (Red-Leader) */}
      <circle cx="120" cy="45" r="14" fill="#dc2626"/>
      <circle cx="120" cy="41" r="9" fill="#fecaca"/>
      <rect x="108" y="55" width="24" height="25" rx="6" fill="#dc2626"/>
      {/* Person 2 - learner left */}
      <circle cx="75" cy="50" r="12" fill="#6b7280"/>
      <circle cx="75" cy="47" r="8" fill="#e5e7eb"/>
      <rect x="65" y="58" width="20" height="22" rx="5" fill="#6b7280"/>
      {/* Person 3 - learner right */}
      <circle cx="165" cy="50" r="12" fill="#6b7280"/>
      <circle cx="165" cy="47" r="8" fill="#e5e7eb"/>
      <rect x="155" y="58" width="20" height="22" rx="5" fill="#6b7280"/>
      {/* AI sparkle above instructor */}
      <path d="M120 20l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" fill="#dc2626" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
      </path>
      {/* 10x badge */}
      <rect x="170" y="25" width="40" height="20" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5"/>
      <text x="190" y="39" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="bold">10x</text>
      {/* Chat bubbles representing prompts */}
      <rect x="30" y="110" width="50" height="16" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="55" y="121" textAnchor="middle" fontSize="7" fill="#dc2626">prompt &gt;</text>
      <rect x="160" y="110" width="50" height="16" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <text x="185" y="121" textAnchor="middle" fontSize="7" fill="#dc2626">prompt &gt;</text>
      {/* Arrow showing knowledge transfer */}
      <path d="M120 140v15" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3"/>
      <text x="120" y="168" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">Your Team, Leveled Up</text>
    </svg>
  ),
  'ai-infrastructure': (
    <svg viewBox="0 0 240 180" className="w-full max-w-xs" fill="none">
      {/* GPU cluster - 3 cards */}
      <rect x="30" y="30" width="50" height="70" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      <rect x="38" y="40" width="34" height="20" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <rect x="38" y="66" width="34" height="6" rx="1" fill="#dc2626" opacity="0.3"/>
      <rect x="38" y="76" width="34" height="6" rx="1" fill="#dc2626" opacity="0.3"/>
      <text x="55" y="54" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">GPU</text>
      <rect x="95" y="30" width="50" height="70" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      <rect x="103" y="40" width="34" height="20" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <rect x="103" y="66" width="34" height="6" rx="1" fill="#dc2626" opacity="0.3"/>
      <rect x="103" y="76" width="34" height="6" rx="1" fill="#dc2626" opacity="0.3"/>
      <text x="120" y="54" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">GPU</text>
      <rect x="160" y="30" width="50" height="70" rx="4" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
      <rect x="168" y="40" width="34" height="20" rx="2" fill="#fee2e2" stroke="#dc2626" strokeWidth="1"/>
      <rect x="168" y="66" width="34" height="6" rx="1" fill="#dc2626" opacity="0.3"/>
      <rect x="168" y="76" width="34" height="6" rx="1" fill="#dc2626" opacity="0.3"/>
      <text x="185" y="54" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">GPU</text>
      {/* Connection bus */}
      <line x1="55" y1="100" x2="55" y2="120" stroke="#dc2626" strokeWidth="2"/>
      <line x1="120" y1="100" x2="120" y2="120" stroke="#dc2626" strokeWidth="2"/>
      <line x1="185" y1="100" x2="185" y2="120" stroke="#dc2626" strokeWidth="2"/>
      <line x1="40" y1="120" x2="200" y2="120" stroke="#dc2626" strokeWidth="2.5"/>
      {/* Model serving */}
      <rect x="75" y="130" width="90" height="30" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
      <text x="120" y="149" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">LLM Inference</text>
      {/* Throughput indicator */}
      <path d="M30 155l-8 8m0-8l8 8" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M210 145l8-8m-8 0l0 0" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <circle cx="215" cy="150" r="3" fill="#22c55e"><animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></circle>
    </svg>
  ),
}

export default function ServicesPage() {
  const emergencyPhone = process.env.NEXT_PUBLIC_EMERGENCY_PHONE || '408-841-3982'

  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            From emergency rescue to AI infrastructure and LLM security.
            We handle the infrastructure so you can focus on your business.
          </p>
        </div>
      </section>

      {/* Emergency CTA Banner */}
      <section className="bg-brand-red text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <span className="font-semibold">Having an emergency right now?</span>
          <a
            href={`tel:${emergencyPhone.replace(/[^+\d]/g, '')}`}
            className="inline-flex items-center px-6 py-2 bg-white text-brand-red font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Call {emergencyPhone}
          </a>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-brand-red">
                      {serviceIcons[service.slug]}
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
                        {service.title}
                      </h2>
                      <p className="text-brand-red font-medium">{service.tagline}</p>
                    </div>
                  </div>

                  {/* Metrics Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.metrics.slice(0, 2).map((metric) => (
                      <span
                        key={metric.label}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-brand-dark text-sm font-medium rounded-full"
                      >
                        <span className="text-brand-red font-bold mr-1">{metric.value}</span>
                        {metric.label}
                      </span>
                    ))}
                  </div>

                  <p className="text-brand-gray text-lg mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-brand-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-brand-red font-semibold hover:text-brand-red-dark transition-colors group"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Service illustration */}
                <div className="flex-1 bg-gray-100 rounded-lg min-h-[200px] lg:min-h-0 flex items-center justify-center p-8">
                  {serviceIllustrations[service.slug]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-brand-gray">
            Whether you're facing an emergency or planning for the future,
            we're here to help. Let's talk about your infrastructure needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red-dark transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/#book"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-brand-dark text-brand-dark font-semibold rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
