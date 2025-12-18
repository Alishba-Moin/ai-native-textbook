import React from 'react';
import { useDoc } from '@docusaurus/theme-common/internal';
import MDXContent from '@theme/MDXContent';

interface ChapterMetadata {
  id: string;
  title: string;
  week_number: number;
  module_id: string;
  original_language: string;
  slug: string;
  [key: string]: any; // Allow other custom fields
}

interface ChapterLayoutProps {
  children: React.ReactNode;
}

function ChapterLayout({ children }: ChapterLayoutProps): JSX.Element {
  const { metadata } = useDoc();
  const { frontMatter } = metadata;

  const chapterMetadata: ChapterMetadata = frontMatter as ChapterMetadata;

  return (
    <div className="chapter-layout">
      <h1>{chapterMetadata.title}</h1>
      {chapterMetadata.week_number && (
        <p>Week: {chapterMetadata.week_number}</p>
      )}
      {chapterMetadata.module_id && (
        <p>Module ID: {chapterMetadata.module_id}</p>
      )}
      {chapterMetadata.original_language && (
        <p>Language: {chapterMetadata.original_language}</p>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}

export default ChapterLayout;
