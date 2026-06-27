export interface CommentItem {
  id: string;
  name: string;
  avatar: string;
  message: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  url: string;
  description: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  iconName: 'instagram' | 'youtube' | 'facebook' | 'tiktok' | 'message-circle';
  handle: string;
  color: string;
}

export interface BiodataDetail {
  label: string;
  value: string;
}
