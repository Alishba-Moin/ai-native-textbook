// src/types/sidebar-config.ts

export interface SidebarItem {
  type: 'doc' | 'category' | 'link';
  label: string;
  id?: string; // For docs
  items?: SidebarItem[]; // For categories
  href?: string; // For links
  customProps?: { // Custom props for personalization/translation
    weekNumber?: number;
    moduleId?: string;
  };
}

export interface Sidebar {
  [sidebarId: string]: SidebarItem[];
}

// Example usage:
// const mySidebar: Sidebar = {
//   tutorialSidebar: [
//     { type: 'doc', id: 'intro', label: 'Introduction' },
//     {
//       type: 'category',
//       label: 'Week 1',
//       items: [
//         { type: 'doc', id: 'chapter-1-1', label: 'Chapter 1.1', customProps: { weekNumber: 1 } },
//       ],
//     },
//   ],
// };