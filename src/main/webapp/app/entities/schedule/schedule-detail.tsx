import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './schedule.reducer';
import { ISchedule } from 'app/shared/model/schedule.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IScheduleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ScheduleDetail extends React.Component<IScheduleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { scheduleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.schedule.detail.title">Schedule</Translate> [<b>{scheduleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="events">
                <Translate contentKey="testreactApp.schedule.events">Events</Translate>
              </span>
            </dt>
            <dd>{scheduleEntity.events}</dd>
            <dt>
              <span id="activities">
                <Translate contentKey="testreactApp.schedule.activities">Activities</Translate>
              </span>
            </dt>
            <dd>{scheduleEntity.activities}</dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.schedule.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={scheduleEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedOn">
                <Translate contentKey="testreactApp.schedule.lastModifiedOn">Last Modified On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={scheduleEntity.lastModifiedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/schedule" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/schedule/${scheduleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ schedule }: IRootState) => ({
  scheduleEntity: schedule.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail);
