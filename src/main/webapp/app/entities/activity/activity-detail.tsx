import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IActivityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ActivityDetail extends React.Component<IActivityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { activityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.activity.detail.title">Activity</Translate> [<b>{activityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="testreactApp.activity.title">Title</Translate>
              </span>
            </dt>
            <dd>{activityEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="testreactApp.activity.description">Description</Translate>
              </span>
            </dt>
            <dd>{activityEntity.description}</dd>
            <dt>
              <span id="activityImageUrl">
                <Translate contentKey="testreactApp.activity.activityImageUrl">Activity Image Url</Translate>
              </span>
            </dt>
            <dd>{activityEntity.activityImageUrl}</dd>
            <dt>
              <span id="activityDate">
                <Translate contentKey="testreactApp.activity.activityDate">Activity Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={activityEntity.activityDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.activity.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={activityEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedOn">
                <Translate contentKey="testreactApp.activity.lastModifiedOn">Last Modified On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={activityEntity.lastModifiedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="testreactApp.activity.schedule">Schedule</Translate>
            </dt>
            <dd>{activityEntity.schedule ? activityEntity.schedule.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.activity.activityType">Activity Type</Translate>
            </dt>
            <dd>{activityEntity.activityType ? activityEntity.activityType.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/activity" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/activity/${activityEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ activity }: IRootState) => ({
  activityEntity: activity.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityDetail);
