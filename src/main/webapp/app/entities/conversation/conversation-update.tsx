import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITeacher } from 'app/shared/model/teacher.model';
import { getEntities as getTeachers } from 'app/entities/teacher/teacher.reducer';
import { IParent } from 'app/shared/model/parent.model';
import { getEntities as getParents } from 'app/entities/parent/parent.reducer';
import { getEntity, updateEntity, createEntity, reset } from './conversation.reducer';
import { IConversation } from 'app/shared/model/conversation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IConversationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IConversationUpdateState {
  isNew: boolean;
  teacherId: number;
  parentId: number;
}

export class ConversationUpdate extends React.Component<IConversationUpdateProps, IConversationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: 0,
      parentId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTeachers();
    this.props.getParents();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { conversationEntity } = this.props;
      const entity = {
        ...conversationEntity,
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
    this.props.history.push('/entity/conversation');
  };

  render() {
    const { conversationEntity, teachers, parents, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testreactApp.conversation.home.createOrEditLabel">
              <Translate contentKey="testreactApp.conversation.home.createOrEditLabel">Create or edit a Conversation</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : conversationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="conversation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="textLabel" for="text">
                    <Translate contentKey="testreactApp.conversation.text">Text</Translate>
                  </Label>
                  <AvField id="conversation-text" type="text" name="text" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdOnLabel" for="createdOn">
                    <Translate contentKey="testreactApp.conversation.createdOn">Created On</Translate>
                  </Label>
                  <AvField id="conversation-createdOn" type="date" className="form-control" name="createdOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="sentOnLabel" for="sentOn">
                    <Translate contentKey="testreactApp.conversation.sentOn">Sent On</Translate>
                  </Label>
                  <AvField id="conversation-sentOn" type="date" className="form-control" name="sentOn" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    <Translate contentKey="testreactApp.conversation.status">Status</Translate>
                  </Label>
                  <AvField id="conversation-status" type="text" name="status" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileUrlLabel" for="fileUrl">
                    <Translate contentKey="testreactApp.conversation.fileUrl">File Url</Translate>
                  </Label>
                  <AvField id="conversation-fileUrl" type="text" name="fileUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="mediaTypeLabel">
                    <Translate contentKey="testreactApp.conversation.mediaType">Media Type</Translate>
                  </Label>
                  <AvInput
                    id="conversation-mediaType"
                    type="select"
                    className="form-control"
                    name="mediaType"
                    value={(!isNew && conversationEntity.mediaType) || 'PHOTO'}
                  >
                    <option value="PHOTO">
                      <Translate contentKey="testreactApp.MediaType.PHOTO" />
                    </option>
                    <option value="VIDEO">
                      <Translate contentKey="testreactApp.MediaType.VIDEO" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="teacher.id">
                    <Translate contentKey="testreactApp.conversation.teacher">Teacher</Translate>
                  </Label>
                  <AvInput id="conversation-teacher" type="select" className="form-control" name="teacher.id">
                    <option value="" key="0" />
                    {teachers
                      ? teachers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="parent.id">
                    <Translate contentKey="testreactApp.conversation.parent">Parent</Translate>
                  </Label>
                  <AvInput id="conversation-parent" type="select" className="form-control" name="parent.id">
                    <option value="" key="0" />
                    {parents
                      ? parents.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/conversation" replace color="info">
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
  teachers: storeState.teacher.entities,
  parents: storeState.parent.entities,
  conversationEntity: storeState.conversation.entity,
  loading: storeState.conversation.loading,
  updating: storeState.conversation.updating
});

const mapDispatchToProps = {
  getTeachers,
  getParents,
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
)(ConversationUpdate);
