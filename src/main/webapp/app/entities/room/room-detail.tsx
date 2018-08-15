import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './room.reducer';
import { IRoom } from 'app/shared/model/room.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRoomDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class RoomDetail extends React.Component<IRoomDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { roomEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.room.detail.title">Room</Translate> [<b>{roomEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="testreactApp.room.name">Name</Translate>
              </span>
            </dt>
            <dd>{roomEntity.name}</dd>
            <dt>
              <span id="capacity">
                <Translate contentKey="testreactApp.room.capacity">Capacity</Translate>
              </span>
            </dt>
            <dd>{roomEntity.capacity}</dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.room.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={roomEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedOn">
                <Translate contentKey="testreactApp.room.lastModifiedOn">Last Modified On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={roomEntity.lastModifiedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="testreactApp.room.center">Center</Translate>
            </dt>
            <dd>{roomEntity.center ? roomEntity.center.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.room.schedule">Schedule</Translate>
            </dt>
            <dd>{roomEntity.schedule ? roomEntity.schedule.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/room" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/room/${roomEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ room }: IRootState) => ({
  roomEntity: room.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomDetail);
