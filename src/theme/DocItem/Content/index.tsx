// // // src/theme/DocItem/Content/index.tsx
// // import React from 'react';
// // import DocItemContent from '@theme-original/DocItem/Content';
// // import type {Props as DocItemContentProps} from '@theme/DocItem/Content';
// // import PersonalizeButton from '@site/src/components/PersonalizeButton';
// // import TranslateButton from '@site/src/components/TranslateButton';

// // /**
// //  * Wrapper for DocItemContent to add custom buttons
// //  * Docusaurus v3-safe version
// //  */
// // export default function DocItemContentWrapper(props: DocItemContentProps): JSX.Element {
// //   // Safe access to metadata
// //   const metadata = props?.content?.metadata;
// //   const chapterId = metadata?.frontMatter?.id;

// //   return (
// //     <>
// //       <DocItemContent {...props} />
// //       {chapterId && (
// //         <div className="chapter-buttons flex mt-4">
// //           <PersonalizeButton chapterId={chapterId} />
// //           <TranslateButton chapterId={chapterId} />
// //         </div>
// //       )}
// //       {chapterId && <Chatbot chapterId={chapterId} />}
// //     </>
// //   );
// // }

// import React from 'react';
// import DocItemContent from '@theme-original/DocItem/Content';
// import type {Props as DocItemContentProps} from '@theme/DocItem/Content';
// import PersonalizeButton from '@site/src/components/PersonalizeButton';
// import TranslateButton from '@site/src/components/TranslateButton';
// import Chatbot from '@site/src/components/Chatbot';
// import SubagentButtons from '@site/src/components/SubagentButtons';

// /**
//  * Wrapper for DocItemContent to add custom buttons and chatbot
//  * Docusaurus v3-safe version
//  */
// export default function DocItemContentWrapper(props: DocItemContentProps): JSX.Element {
//   // Safe access to metadata
//   const { metadata, content } = useDoc();
//   const chapterId = metadata?.frontMatter?.id;
//   const chapterContent = content?.content || '';

//   return (
//     <>
//       <DocItemContent {...props} />
//       {chapterId && (
//         <div className="chapter-actions-container flex flex-col mt-4 gap-4">
//           <div className="chapter-buttons flex gap-4">
//             <PersonalizeButton chapterId={chapterId} />
//             <TranslateButton chapterId={chapterId} />
//           </div>
//           <SubagentButtons chapterId={chapterId} chapterContent={chapterContent} />
//         </div>
//       )}
//       {chapterId && <Chatbot chapterId={chapterId} />}
//     </>
//   );
// }

import React from 'react';
import DocItemContent from '@theme-original/DocItem/Content';
import type {Props as DocItemContentProps} from '@theme/DocItem/Content';
import Chatbot from '@site/src/components/Chatbot';
import PersonalizeButton from '@site/src/components/PersonalizeButton';
import TranslateButton from '@site/src/components/TranslateButton';

export default function DocItemContentWrapper(props: DocItemContentProps): JSX.Element {
  const metadata = props?.content?.metadata;
  const chapterId = metadata?.frontMatter?.id || '';

  return (
    <>
      <DocItemContent {...props} />
      <div className="chapter-tools my-8 flex gap-4 flex-wrap">
        <PersonalizeButton chapterId={chapterId} />
        <TranslateButton chapterId={chapterId} />
      </div>
      <Chatbot chapterId={chapterId} />
    </>
  );
}