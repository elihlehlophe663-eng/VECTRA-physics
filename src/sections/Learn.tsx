import { BookOpen, FunctionSquare, Lightbulb } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { LessonCard } from '@/components/LessonCard';
import { lessonModules } from '@/data/lessons';
import { useReveal } from '@/hooks/useReveal';

const features = [
  {
    icon: FunctionSquare,
    title: 'Equations explained',
    description: 'Every formula is broken down — what it means, where it comes from, and when to use it.',
  },
  {
    icon: Lightbulb,
    title: 'Visual demonstrations',
    description: 'Diagrams and animations that make abstract concepts concrete and memorable.',
  },
  {
    icon: BookOpen,
    title: 'Guided lessons',
    description: 'Structured learning paths that build understanding step by step, at your own pace.',
  },
];

export function Learn() {
  const { ref, isVisible } = useReveal();

  return (
    <section id="learn" className="relative py-20 sm:py-28 lg:py-32">
      <div className="container-vectra">
        <div
          ref={ref}
          className={`section-fade ${isVisible ? 'is-visible' : ''}`}
        >
          <SectionHeading
            eyebrow="Learn"
            title="Understand the why, not just the what"
            description="Guided lessons combine clear explanations, mathematical foundations, and visual demonstrations to build genuine intuition."
          />
        </div>

        {/* Feature highlights */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="glass-panel flex items-start gap-4 p-5"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-surface-border bg-space-700/40 text-accent-cyan">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-sm font-medium text-star-white">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-star-white/45">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lesson modules */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {lessonModules.map((lesson, index) => (
            <LessonCard key={lesson.id} lesson={lesson} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
