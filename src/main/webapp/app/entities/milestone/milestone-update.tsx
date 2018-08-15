import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './milestone.reducer';
import { IMilestone } from 'app/shared/model/milestone.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMilestoneUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IMilestoneUpdateState {
  isNew: boolean;
}

export class MilestoneUpdate extends React.Component<IMilestoneUpdateProps, IMilestoneUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { milestoneEntity } = this.props;
      const entity = {
        ...milestoneEntity,
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
    this.props.history.push('/entity/milestone');
  };

  render() {
    const { milestoneEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testreactApp.milestone.home.createOrEditLabel">
              <Translate contentKey="testreactApp.milestone.home.createOrEditLabel">Create or edit a Milestone</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : milestoneEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="milestone-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="testreactApp.milestone.title">Title</Translate>
                  </Label>
                  <AvField id="milestone-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="testreactApp.milestone.description">Description</Translate>
                  </Label>
                  <AvField id="milestone-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="imageUrlLabel" for="imageUrl">
                    <Translate contentKey="testreactApp.milestone.imageUrl">Image Url</Translate>
                  </Label>
                  <AvField id="milestone-imageUrl" type="text" name="imageUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    <Translate contentKey="testreactApp.milestone.createdOn">Created On</Translate>
                  </Label>
                  <AvField id="milestone-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastModifiedOnLabel" for="lastModifiedOn">
                    <Translate contentKey="testreactApp.milestone.lastModifiedOn">Last Modified On</Translate>
                  </Label>
                  <AvField id="milestone-lastModifiedOn" type="date" className="form-control" name="lastModifiedOn" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/milestone" replace color="info">
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
  milestoneEntity: storeState.milestone.entity,
  loading: storeState.milestone.loading,
  updating: storeState.milestone.updating
});

const mapDispatchToProps = {
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
)(MilestoneUpdate);
