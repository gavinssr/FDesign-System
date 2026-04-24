import React from 'react';

import '../../../packages/tokens/src/web-vars.css';
import './app.css';
import './shell/styles/layout.module.css';
import { Layout } from './shell/Layout';

export default function App(props: React.PropsWithChildren) {
  return <Layout>{props.children}</Layout>;
}
