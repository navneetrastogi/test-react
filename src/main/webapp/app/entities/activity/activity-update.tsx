import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISchedule } from 'app/shared/model/schedule.model';
import { getEntities as getSchedules } from 'app/entities/schedule/schedule.reducer';
import { IActivityType } from 'app/shared/model/activity-type.model';
import { getEntities as getActivityTypes } from 'app/entities/activity-type/activity-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './activity.reducer';
import { IActivity } from 'app/shared/model/activity.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IActivityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IActivityUpdateState {
  isNew: boolean;
  scheduleId: number;
  activityTypeId: number;
}

export class ActivityUpdate extends React.Component<IActivityUpdateProps, IActivityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      scheduleId: 0,
      activityTypeId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getSchedules();
    this.props.getActivityTypes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { activityEntity } = this.props;
      const entity = {
        ...activityEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/activity');
  };

  render() {
    const { activityEntity, schedules, activityTypes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testreactApp.activity.home.createOrEditLabel">
              <Translate contentKey="testreactApp.activity.home.createOrEditLabel">Create or edit a Activity</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : activityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="activity-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="testreactApp.activity.title">Title</Translate>
                  </Label>
                  <AvField id="activity-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="testreactApp.activity.description">Description</Translate>
                  </Label>
                  <AvField id="activity-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="activityImageUrlLabel" for="activityImageUrl">
                    <Translate contentKey="testreactApp.activity.activityImageUrl">Activity Image Url</Translate>
                  </Label>
                  <AvField id="activity-activityImageUrl" type="text" name="activityImageUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="activityDateLabel" for="activityDate">
                    <Translate contentKey="testreactApp.activity.activityDate">Activity Date</Translate>
                  </Label>
                  <AvField id="activity-activityDate" type="date" className="form-control" name="activityDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    <Translate contentKey="testreactApp.activity.createdOn">Created On</Translate>
                  </Label>
                  <AvField id="activity-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModifiedOnLabel" for="lastModifiedOn">
                    <Translate contentKey="testreactApp.activity.lastModifiedOn">Last Modified On</Translate>
                  </Label>
                  <AvField id="activity-lastModifiedOn" type="date" className="form-control" name="lastModifiedOn" />
                </AvGroup>
                <AvGroup>
                  <Label for="schedule.id">
                    <Translate contentKey="testreactApp.activity.schedule">Schedule</Translate>
                  </Label>
                  <AvInput id="activity-schedule" type="select" className="form-control" name="schedule.id">
                    <option value="" key="0" />
                    {schedules
                      ? schedules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="activityType.id">
                    <Translate contentKey="testreactApp.activity.activityType">Activity Type</Translate>
                  </Label>
                  <AvInput id="activity-activityType" type="select" className="form-control" name="activityType.id">
                    <option value="" key="0" />
                    {activityTypes
                      ? activityTypes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/activity" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  schedules: storeState.schedule.entities,
  activityTypes: storeState.activityType.entities,
  activityEntity: storeState.activity.entity,
  loading: storeState.activity.loading,
  updating: storeState.activity.updating
});

const mapDispatchToProps = {
  getSchedules,
  getActivityTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityUpdate);
