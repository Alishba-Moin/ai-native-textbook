// src/theme/DocItem/Content/index.tsx
import React from 'react';
import DocItemContent from '@theme-original/DocItem/Content';
import type {Props as DocItemContentProps} from '@theme/DocItem/Content';
import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

/**
 * Wrapper for DocItemContent to add custom buttons
 * Docusaurus v3-safe version
 */
export default function DocItemContentWrapper(props: DocItemContentProps): JSX.Element {
  // Safe access to metadata
  const metadata = props?.content?.metadata;
  const chapterId = metadata?.frontMatter?.id;

  return (
    <>
      <DocItemContent {...props} />
      {chapterId && (
        <div className="chapter-buttons flex mt-4">
          <PersonalizeButton chapterId={chapterId} />
          <TranslateButton chapterId={chapterId} />
        </div>
      )}
    </>
  );
}
