'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, Video, Scissors, Mic, FileText, X } from 'lucide-react';

const items = [
    { href: '/submit-article', icon: FileText,   label: 'Submit Article', angleDeg: 90  },
    { href: '/submit-video',   icon: Video,      label: 'Submit Video',   angleDeg: 60  },
    { href: '/submit-short',   icon: Scissors,   label: 'Submit Short',   angleDeg: 30  },
    { href: '/submit-podcast', icon: Mic,         label: 'Submit Podcast', angleDeg: 0   },
];

const RADIUS = 115; // px — distance from center of main button

function getArcPosition(angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
        x: Math.cos(rad) * RADIUS,   // positive → right
        y: -Math.sin(rad) * RADIUS,  // negative → up (CSS y-axis is inverted)
    };
}

export default function UploadFAB() {
    const [open, setOpen] = useState(false);

    return (
        // Fixed anchor: bottom-left. The inner box is the size of the main button
        // and acts as the origin for all absolute-positioned sub-buttons.
        <div className="fixed bottom-6 left-6 z-50">
            <div className="relative w-14 h-14">

                {/* ── Sub-action buttons (radial arc) ── */}
                {items.map((item, i) => {
                    const Icon = item.icon;
                    const pos = getArcPosition(item.angleDeg);

                    return (
                        <div
                            key={item.href}
                            className="absolute top-1/2 left-1/2 group"
                            style={{
                                transform: open
                                    ? `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`
                                    : 'translate(-50%, -50%)',
                                opacity: open ? 1 : 0,
                                pointerEvents: open ? 'auto' : 'none',
                                transition: `transform 350ms cubic-bezier(0.34,1.56,0.64,1) ${i * 50}ms, opacity 250ms ease ${i * 50}ms`,
                            }}
                        >
                            <Link href={item.href} onClick={() => setOpen(false)} prefetch={false}>
                                <button
                                    aria-label={item.label}
                                    className="w-13 h-13 rounded-full bg-red hover:bg-[#a00827] text-white flex items-center justify-center shadow-xl border border-white/20 transition-transform duration-200 hover:scale-110 cursor-pointer"
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            </Link>

                            {/* Tooltip */}
                            <span className="
                                absolute left-1/2 -translate-x-1/2 -top-9
                                bg-background/95 backdrop-blur-sm border border-foreground/10
                                text-foreground text-[10px] font-oswald uppercase tracking-widest
                                px-2 py-1 whitespace-nowrap shadow-lg
                                opacity-0 group-hover:opacity-100
                                translate-y-1 group-hover:translate-y-0
                                transition-all duration-200 pointer-events-none
                            ">
                                {item.label}
                            </span>
                        </div>
                    );
                })}

                {/* ── Main FAB ── */}
                <div className="group relative">
                    <button
                        onClick={() => setOpen(prev => !prev)}
                        aria-label="Upload shortcuts"
                        className={`
                            w-14 h-14 rounded-full flex items-center justify-center
                            shadow-xl cursor-pointer border border-white/20
                            transition-all duration-300
                            ${open
                                ? 'bg-red scale-105 shadow-[0_0_20px_rgba(191,10,48,0.5)]'
                                : 'bg-red hover:scale-110 hover:shadow-[0_0_16px_rgba(191,10,48,0.4)]'
                            }
                        `}
                    >
                        <div
                            style={{
                                transition: 'transform 300ms ease',
                                transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                            }}
                        >
                            {open
                                ? <X className="w-6 h-6 text-white" />
                                : <Upload className="w-6 h-6 text-white" />
                            }
                        </div>
                    </button>

                    {/* Tooltip on main FAB — only when closed */}
                    {!open && (
                        <span className="
                            absolute left-full ml-3 top-1/2 -translate-y-1/2
                            bg-background/95 backdrop-blur-sm border border-foreground/10
                            text-foreground text-[10px] font-oswald uppercase tracking-widest
                            px-3 py-1.5 whitespace-nowrap shadow-lg
                            opacity-0 group-hover:opacity-100
                            -translate-x-1 group-hover:translate-x-0
                            transition-all duration-200 pointer-events-none
                        ">
                            Get Involved
                        </span>
                    )}
                </div>

            </div>
        </div>
    );
}
