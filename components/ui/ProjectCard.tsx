'use client';

import { ExternalLink, Github, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/types/database';
import { cn } from '@/lib/utils/cn';

const categoryStyle: Record<string, string> = {
  blockchain: 'border-accent-green/50 text-accent-green',
  defi: 'border-accent-green/50 text-accent-green',
  'smart-contract': 'border-accent-green/50 text-accent-green',
  web3: 'border-accent-cyan/50 text-accent-cyan',
  cybersecurity: 'border-accent-red/50 text-accent-red',
  audit: 'border-accent-red/50 text-accent-red',
  other: 'border-text-muted text-text-muted',
};

export function ProjectCard({ project, onClick }: { project: Project; onClick?: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-border-neon bg-bg-card transition-all hover:border-accent-green/50 hover:shadow-glow-green"
    >
      {project.featured && (
        <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded border border-accent-green bg-bg-primary/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-green backdrop-blur">
          <Star className="h-3 w-3 fill-current" /> Featured
        </span>
      )}

      <div className="relative h-44 overflow-hidden border-b border-border-neon bg-gradient-to-br from-bg-secondary via-bg-card to-bg-primary">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,255,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.06) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-5xl font-extrabold text-accent-green/20 transition-all group-hover:text-accent-green/40">
          {project.title.split(' ').map((w) => w[0]).slice(0, 3).join('')}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className={cn('rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider', categoryStyle[project.category])}>
            {project.category}
          </span>
          {project.status === 'in-progress' && (
            <span className="font-mono text-[10px] uppercase text-yellow-400">In Progress</span>
          )}
        </div>

        <h3 className="font-display text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="line-clamp-2 text-sm text-text-muted">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 4).map((t) => (
            <span key={t} className="rounded border border-border-neon bg-bg-secondary/60 px-2 py-0.5 font-mono text-[10px] text-text-primary">
              {t}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="font-mono text-[10px] text-text-muted">+{project.tech_stack.length - 4}</span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-3">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-xs text-accent-cyan hover:text-accent-green">
              <ExternalLink className="h-3.5 w-3.5" /> Live
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-xs text-text-primary hover:text-accent-green">
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
          {onClick && (
            <button onClick={onClick} className="ml-auto font-mono text-xs text-accent-green hover:underline">
              View details →
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}