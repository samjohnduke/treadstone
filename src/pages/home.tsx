import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Navbar } from 'src/components/navbar'; 
import { Jumbo } from 'src/design/jumbo';
import { PageSection } from 'src/design/pageSection'; 

export class HomePage extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <PageSection>
        <Navbar />
        <Jumbo>
          <h2>Build, share and experience data in a different way</h2>
        </Jumbo>
      </PageSection>
    )
  }
}