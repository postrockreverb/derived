import type { PropsWithChildren } from 'react';
import './CodeWrapper.css';

export default function CodeWrapper({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
