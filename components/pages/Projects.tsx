import React from 'react';
import { Card } from '@/components/common/Card';
import { MotionCard } from '@/components/common/MotionCard';
import { Tag } from '@/components/common/Tag';
import { defaultProjects } from '@/config/site';
import type { Project } from '@/types';

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects = defaultProjects }: ProjectsProps) {
  return (
    <section className="pt-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Projects</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const content = project.url ? (
            <MotionCard key={project.title} className="h-full">
              <div className="font-semibold">{project.title}</div>
              <div className="text-sm opacity-80 mt-2">{project.summary}</div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </MotionCard>
          ) : (
            <Card key={project.title} className="h-full">
              <div className="font-semibold">{project.title}</div>
              <div className="text-sm opacity-80 mt-2">{project.summary}</div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </Card>
          );

          return project.url ? (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              {content}
            </a>
          ) : content;
        })}
      </div>
    </section>
  );
}
