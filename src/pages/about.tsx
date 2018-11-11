import { RouteComponentProps } from '@reach/router';
import * as React from 'react';

import { Navbar } from 'src/components/navbar';
import { PageSection } from 'src/design/pageSection';

export class AboutPage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <PageSection>
        <Navbar />
      </PageSection>
    )
  }
}