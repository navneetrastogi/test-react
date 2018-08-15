import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudentProfile } from 'app/shared/model/student-profile.model';
import { getEntities as getStudentProfiles } from 'app/entities/student-profile/student-profile.reducer';
import { getEntity, updateEntity, createEntity, reset } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIncidentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IIncidentUpdateState {
  isNew: boolean;
  studentProfileId: number;
}

export class IncidentUpdate extends React.Component<IIncidentUpdateProps, IIncidentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentProfileId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getStudentProfiles();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { incidentEntity } = this.props;
      const entity = {
        ...incidentEntity,
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
    this.props.history.push('/entity/incident');
  };

  render() {
    const { incidentEntity, studentProfiles, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testreactApp.incident.home.createOrEditLabel">
              <Translate contentKey="testreactApp.incident.home.createOrEditLabel">Create or edit a Incident</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : incidentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="incident-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="natureOfIncidentLabel" for="natureOfIncident">
                    <Translate contentKey="testreactApp.incident.natureOfIncident">Nature Of Incident</Translate>
                  </Label>
                  <AvField id="incident-natureOfIncident" type="text" name="natureOfIncident" />
                </AvGroup>
                <AvGroup>
                  <Label id="firstAidProvidedLabel" check>
                    <AvInput id="incident-firstAidProvided" type="checkbox" className="form-control" name="firstAidProvided" />
                    <Translate contentKey="testreactApp.incident.firstAidProvided">First Aid Provided</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="firstAidNotesLabel" for="firstAidNotes">
                    <Translate contentKey="testreactApp.incident.firstAidNotes">First Aid Notes</Translate>
                  </Label>
                  <AvField id="incident-firstAidNotes" type="text" name="firstAidNotes" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="testreactApp.incident.date">Date</Translate>
                  </Label>
                  <AvField id="incident-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    <Translate contentKey="testreactApp.incident.createdOn">Created On</Translate>
                  </Label>
                  <AvField id="incident-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="isAdminOnlyLabel" check>
                    <AvInput id="incident-isAdminOnly" type="checkbox" className="form-control" name="isAdminOnly" />
                    <Translate contentKey="testreactApp.incident.isAdminOnly">Is Admin Only</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    <Translate contentKey="testreactApp.incident.notes">Notes</Translate>
                  </Label>
                  <AvField id="incident-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentProfile.id">
                    <Translate contentKey="testreactApp.incident.studentProfile">Student Profile</Translate>
                  </Label>
                  <AvInput id="incident-studentProfile" type="select" className="form-control" name="studentProfile.id">
                    <option value="" key="0" />
                    {studentProfiles
                      ? studentProfiles.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/incident" replace color="info">
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
  studentProfiles: storeState.studentProfile.entities,
  incidentEntity: storeState.incident.entity,
  loading: storeState.incident.loading,
  updating: storeState.incident.updating
});

const mapDispatchToProps = {
  getStudentProfiles,
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
)(IncidentUpdate);
