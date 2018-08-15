import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './timeline.reducer';
import { ITimeline } from 'app/shared/model/timeline.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITimelineProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Timeline extends React.Component<ITimelineProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { timelineList, match } = this.props;
    return (
      <div>
        <h2 id="timeline-heading">
          <Translate contentKey="testreactApp.timeline.home.title">Timelines</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.timeline.home.createLabel">Create new Timeline</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.timeline.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.timeline.isVisible">Is Visible</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.timeline.schedule">Schedule</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.timeline.studentProfile">Student Profile</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {timelineList.map((timeline, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${timeline.id}`} color="link" size="sm">
                      {timeline.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={timeline.date} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={timeline.isVisible} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{timeline.schedule ? <Link to={`schedule/${timeline.schedule.id}`}>{timeline.schedule.id}</Link> : ''}</td>
                  <td>
                    {timeline.studentProfile ? (
                      <Link to={`student-profile/${timeline.studentProfile.id}`}>{timeline.studentProfile.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${timeline.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${timeline.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${timeline.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ timeline }: IRootState) => ({
  timelineList: timeline.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
