// ============================================================================
// PATTERN HEADER COMPONENT
// ============================================================================

interface FeatureBadge {
  label: string;
}

interface PatternHeaderProps {
  category: string;
  categoryColor?: 'orange' | 'emerald' | 'cyan' | 'yellow';
  difficulty?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  features: FeatureBadge[];
}

export function PatternHeader({
  category,
  categoryColor = 'orange',
  difficulty,
  title,
  titleHighlight,
  description,
  features,
}: PatternHeaderProps) {
  const colorClasses = {
    orange: {
      text: 'text-orange-500',
      bg: 'bg-orange-500',
      border: 'border-orange-500',
    },
    emerald: {
      text: 'text-emerald-500',
      bg: 'bg-emerald-500',
      border: 'border-emerald-500',
    },
    cyan: {
      text: 'text-cyan-500',
      bg: 'bg-cyan-500',
      border: 'border-cyan-500',
    },
    yellow: {
      text: 'text-yellow-500',
      bg: 'bg-yellow-500',
      border: 'border-yellow-500',
    },
  };

  const colors = colorClasses[categoryColor];

  return (
    <header className="relative border-b border-orange-500/20 bg-zinc-900/50 backdrop-blur-sm">
      {/* Corner accent - top left */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange-500" />
      {/* Corner accent - bottom right */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange-500" />

      {/* Diagonal stripe decoration */}
      <div className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-l from-orange-500 to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className={`${colors.text} text-xs font-black tracking-[0.3em] uppercase`}>
            {category}
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          {difficulty && (
            <>
              <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
                {difficulty}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          {titleHighlight ? (
            <>
              <span className={colors.text}>{titleHighlight}</span> {title}
            </>
          ) : (
            title
          )}
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          {description}
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded"
            >
              <span className={`w-2 h-2 ${colors.bg} rounded-full animate-pulse`} />
              <span className="text-zinc-300 text-sm font-mono">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
