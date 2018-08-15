import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StudentProfile from './student-profile';
import StudentProfileDetail from './student-profile-detail';
import StudentProfileUpdate from './student-profile-update';
import StudentProfileDeleteDialog from './student-profile-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StudentProfileUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StudentProfileUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StudentProfileDetail} />
      <ErrorBoundaryRoute path={match.url} component={StudentProfile} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StudentProfileDeleteDialog} />
  </>
);

export default Routes;
