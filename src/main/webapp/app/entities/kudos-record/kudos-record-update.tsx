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
import { IKudos } from 'app/shared/model/kudos.model';
import { getEntities as getKudos } from 'app/entities/kudos/kudos.reducer';
import { getEntity, updateEntity, createEntity, reset } from './kudos-record.reducer';
import { IKudosRecord } from 'app/shared/model/kudos-record.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IKudosRecordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IKudosRecordUpdateState {
  isNew: boolean;
  studentProfileId: number;
  kudosId: number;
}

export class KudosRecordUpdate extends React.Component<IKudosRecordUpdateProps, IKudosRecordUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentProfileId: 0,
      kudosId: 0,
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
    this.props.getKudos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { kudosRecordEntity } = this.props;
      const entity = {
        ...kudosRecordEntity,
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
    this.props.history.push('/entity/kudos-record');
  };

  render() {
    const { kudosRecordEntity, studentProfiles, kudos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testreactApp.kudosRecord.home.createOrEditLabel">
              <Translate contentKey="testreactApp.kudosRecord.home.createOrEditLabel">Create or edit a KudosRecord</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : kudosRecordEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="kudos-record-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    <Translate contentKey="testreactApp.kudosRecord.createdOn">Created On</Translate>
                  </Label>
                  <AvField id="kudos-record-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="notes">
                    <Translate contentKey="testreactApp.kudosRecord.notes">Notes</Translate>
                  </Label>
                  <AvField id="kudos-record-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label for="studentProfile.id">
                    <Translate contentKey="testreactApp.kudosRecord.studentProfile">Student Profile</Translate>
                  </Label>
                  <AvInput id="kudos-record-studentProfile" type="select" className="form-control" name="studentProfile.id">
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
                <AvGroup>
                  <Label for="kudos.id">
                    <Translate contentKey="testreactApp.kudosRecord.kudos">Kudos</Translate>
                  </Label>
                  <AvInput id="kudos-record-kudos" type="select" className="form-control" name="kudos.id">
                    <option value="" key="0" />
                    {kudos
                      ? kudos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/kudos-record" replace color="info">
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
  kudos: storeState.kudos.entities,
  kudosRecordEntity: storeState.kudosRecord.entity,
  loading: storeState.kudosRecord.loading,
  updating: storeState.kudosRecord.updating
});

const mapDispatchToProps = {
  getStudentProfiles,
  getKudos,
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
)(KudosRecordUpdate);
