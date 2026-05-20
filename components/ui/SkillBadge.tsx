import type { Skill } from '@/lib/types/database';
import { cn } from '@/lib/utils/cn';

const categoryColor: Record<string, string> = {
  blockchain: 'border-accent-green/40 text-accent-green',
  cybersecurity: 'border-accent-red/40 text-accent-red',
  languages: 'border-accent-cyan/40 text-accent-cyan',
  fullstack: 'border-purple-400/40 text-purple-400',
  marketing: 'border-pink-400/40 text-pink-400',
  tools: 'border-yellow-400/40 text-yellow-400',
  frameworks: 'border-purple-400/40 text-purple-400',
  platforms: 'border-pink-400/40 text-pink-400',
};

const categoryBar: Record<string, string> = {
  blockchain: 'bg-accent-green',
  cybersecurity: 'bg-accent-red',
  languages: 'bg-accent-cyan',
  fullstack: 'bg-purple-400',
  marketing: 'bg-pink-400',
  tools: 'bg-yellow-400',
  frameworks: 'bg-purple-400',
  platforms: 'bg-pink-400',
};

export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div
      className={cn(
        'group rounded-lg border bg-bg-card/60 p-4 backdrop-blur transition-all hover:bg-bg-card',
        categoryColor[skill.category],
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-sm font-semibold">{skill.name}</span>
        <span className="font-mono text-xs text-text-muted">{skill.proficiency}%</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-bg-secondary">
        <div
          className={cn('h-full transition-all duration-700 ease-out group-hover:shadow-glow-green', categoryBar[skill.category])}
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
      {skill.years_experience && (
        <div className="mt-2 font-mono text-[10px] text-text-muted">
          {skill.years_experience}y experience
        </div>
      )}
    </div>
  );
}