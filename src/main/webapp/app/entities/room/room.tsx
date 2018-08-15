import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './room.reducer';
import { IRoom } from 'app/shared/model/room.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoomProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Room extends React.Component<IRoomProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { roomList, match } = this.props;
    return (
      <div>
        <h2 id="room-heading">
          <Translate contentKey="testreactApp.room.home.title">Rooms</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.room.home.createLabel">Create new Room</Translate>
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
                  <Translate contentKey="testreactApp.room.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.room.capacity">Capacity</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.room.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.room.lastModifiedOn">Last Modified On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.room.center">Center</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.room.schedule">Schedule</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {roomList.map((room, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${room.id}`} color="link" size="sm">
                      {room.id}
                    </Button>
                  </td>
                  <td>{room.name}</td>
                  <td>{room.capacity}</td>
                  <td>
                    <TextFormat type="date" value={room.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={room.lastModifiedOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{room.center ? <Link to={`center/${room.center.id}`}>{room.center.id}</Link> : ''}</td>
                  <td>{room.schedule ? <Link to={`schedule/${room.schedule.id}`}>{room.schedule.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${room.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${room.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${room.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ room }: IRootState) => ({
  roomList: room.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);
