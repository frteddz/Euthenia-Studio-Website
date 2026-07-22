import type { LucideIcon } from 'lucide-react';
import {
  Image,
  FileText,
  ClipboardList,
  FilePenLine,
  ImageDown,
  FolderTree,
  Pipette,
  QrCode,
  BookOpen,
  HardDrive,
} from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  url: string;
}

export const projects: Project[] = [
  {
    id: 'pngforge',
    name: 'PngForge',
    description: 'PNG, JPG, WebP and AVIF converter.',
    icon: Image,
    url: 'https://frteddz.github.io/PngForge-web/',
  },
  {
    id: 'pdfmerge',
    name: 'PDFMerge',
    description: 'Merge, split and organize PDF files.',
    icon: FileText,
    url: 'https://frteddz.github.io/PDFMerge-web/',
  },
  {
    id: 'clipvault',
    name: 'ClipVault',
    description: 'Clipboard history manager.',
    icon: ClipboardList,
    url: 'https://frteddz.github.io/ClipVault-web/',
  },
  {
    id: 'quickrename',
    name: 'QuickRename',
    description: 'Bulk file renaming utility.',
    icon: FilePenLine,
    url: 'https://frteddz.github.io/QuickRename-web/',
  },
  {
    id: 'pixelshrink',
    name: 'PixelShrink',
    description: 'Batch image compression tool.',
    icon: ImageDown,
    url: 'https://frteddz.github.io/PixelShrink-web/',
  },
  {
    id: 'folderscope',
    name: 'FolderScope',
    description: 'Disk usage visualizer.',
    icon: FolderTree,
    url: 'https://frteddz.github.io/FolderScope-web/',
  },
  {
    id: 'colorsnap',
    name: 'ColorSnap',
    description: 'Professional color picker.',
    icon: Pipette,
    url: 'https://frteddz.github.io/ColorSnap-web/',
  },
  {
    id: 'qrflow',
    name: 'QRFlow',
    description: 'QR code generator and scanner.',
    icon: QrCode,
    url: 'https://frteddz.github.io/QRFlow-web/',
  },
  {
    id: 'studyflow',
    name: 'StudyFlow',
    description: 'Modern study planner.',
    icon: BookOpen,
    url: 'https://frteddz.github.io/StudyFlow-web/',
  },
  {
    id: 'backupbuddy',
    name: 'BackupBuddy',
    description: 'Backup utility.',
    icon: HardDrive,
    url: 'https://frteddz.github.io/BackupBuddy-web/',
  },
];
