import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Event extends React.Component<IEventProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { eventList, match } = this.props;
    return (
      <div>
        <h2 id="event-heading">
          <Translate contentKey="testreactApp.event.home.title">Events</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.event.home.createLabel">Create new Event</Translate>
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
                  <Translate contentKey="testreactApp.event.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.event.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.event.eventImageURL">Event Image URL</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.event.eventDate">Event Date</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.event.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.event.lastModifiedOn">Last Modified On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.event.schedule">Schedule</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eventList.map((event, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${event.id}`} color="link" size="sm">
                      {event.id}
                    </Button>
                  </td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.eventImageURL}</td>
                  <td>
                    <TextFormat type="date" value={event.eventDate} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={event.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={event.lastModifiedOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{event.schedule ? <Link to={`schedule/${event.schedule.id}`}>{event.schedule.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${event.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${event.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${event.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ event }: IRootState) => ({
  eventList: event.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
