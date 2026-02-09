interface HeaderProps {
  title: string;
  subtitle: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ title, subtitle, align = 'center' }: HeaderProps) {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
        {title.split(' ').map((word, i) => (
          <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" : ""}>
            {word}{' '}
          </span>
        ))}
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
        {subtitle}
      </p>
      {align === 'center' && (
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mt-6 rounded-full" />
      )}
    </div>
  );
}
