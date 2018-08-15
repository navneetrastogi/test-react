import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICenter } from 'app/shared/model/center.model';
import { getEntities as getCenters } from 'app/entities/center/center.reducer';
import { getEntity, updateEntity, createEntity, reset } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITeacherUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITeacherUpdateState {
  isNew: boolean;
  centerId: number;
}

export class TeacherUpdate extends React.Component<ITeacherUpdateProps, ITeacherUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      centerId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCenters();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { teacherEntity } = this.props;
      const entity = {
        ...teacherEntity,
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
    this.props.history.push('/entity/teacher');
  };

  render() {
    const { teacherEntity, centers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testreactApp.teacher.home.createOrEditLabel">
              <Translate contentKey="testreactApp.teacher.home.createOrEditLabel">Create or edit a Teacher</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : teacherEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="teacher-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="testreactApp.teacher.name">Name</Translate>
                  </Label>
                  <AvField id="teacher-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="contactNumberLabel" for="contactNumber">
                    <Translate contentKey="testreactApp.teacher.contactNumber">Contact Number</Translate>
                  </Label>
                  <AvField id="teacher-contactNumber" type="text" name="contactNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="genderLabel">
                    <Translate contentKey="testreactApp.teacher.gender">Gender</Translate>
                  </Label>
                  <AvInput
                    id="teacher-gender"
                    type="select"
                    className="form-control"
                    name="gender"
                    value={(!isNew && teacherEntity.gender) || 'MALE'}
                  >
                    <option value="MALE">
                      <Translate contentKey="testreactApp.Gender.MALE" />
                    </option>
                    <option value="FEMALE">
                      <Translate contentKey="testreactApp.Gender.FEMALE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="addressLabel" for="address">
                    <Translate contentKey="testreactApp.teacher.address">Address</Translate>
                  </Label>
                  <AvField id="teacher-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    <Translate contentKey="testreactApp.teacher.createdOn">Created On</Translate>
                  </Label>
                  <AvField id="teacher-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="joiningDateLabel" for="joiningDate">
                    <Translate contentKey="testreactApp.teacher.joiningDate">Joining Date</Translate>
                  </Label>
                  <AvField id="teacher-joiningDate" type="date" className="form-control" name="joiningDate" />
                </AvGroup>
                <AvGroup>
                  <Label for="center.id">
                    <Translate contentKey="testreactApp.teacher.center">Center</Translate>
                  </Label>
                  <AvInput id="teacher-center" type="select" className="form-control" name="center.id">
                    <option value="" key="0" />
                    {centers
                      ? centers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/teacher" replace color="info">
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
  centers: storeState.center.entities,
  teacherEntity: storeState.teacher.entity,
  loading: storeState.teacher.loading,
  updating: storeState.teacher.updating
});

const mapDispatchToProps = {
  getCenters,
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
)(TeacherUpdate);
