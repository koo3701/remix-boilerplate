import type React from 'react';

export type MessageType = {
  children: React.ReactNode;
};

export default function Message({ children }: MessageType) {
  return <span className="font-bold italic">{children}</span>;
}
