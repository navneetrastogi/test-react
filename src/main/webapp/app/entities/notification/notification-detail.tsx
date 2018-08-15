import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class NotificationDetail extends React.Component<INotificationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.notification.detail.title">Notification</Translate> [<b>{notificationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">
                <Translate contentKey="testreactApp.notification.type">Type</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.type}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="testreactApp.notification.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={notificationEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.notification.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={notificationEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="message">
                <Translate contentKey="testreactApp.notification.message">Message</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.message}</dd>
            <dt>
              <span id="icon">
                <Translate contentKey="testreactApp.notification.icon">Icon</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.icon}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="testreactApp.notification.status">Status</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.status}</dd>
            <dt>
              <Translate contentKey="testreactApp.notification.parent">Parent</Translate>
            </dt>
            <dd>{notificationEntity.parent ? notificationEntity.parent.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/notification" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/notification/${notificationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ notification }: IRootState) => ({
  notificationEntity: notification.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDetail);
