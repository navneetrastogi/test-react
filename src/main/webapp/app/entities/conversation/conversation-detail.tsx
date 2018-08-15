import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './conversation.reducer';
import { IConversation } from 'app/shared/model/conversation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConversationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ConversationDetail extends React.Component<IConversationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { conversationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.conversation.detail.title">Conversation</Translate> [<b>{conversationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="text">
                <Translate contentKey="testreactApp.conversation.text">Text</Translate>
              </span>
            </dt>
            <dd>{conversationEntity.text}</dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.conversation.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={conversationEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="sentOn">
                <Translate contentKey="testreactApp.conversation.sentOn">Sent On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={conversationEntity.sentOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="testreactApp.conversation.status">Status</Translate>
              </span>
            </dt>
            <dd>{conversationEntity.status}</dd>
            <dt>
              <span id="fileUrl">
                <Translate contentKey="testreactApp.conversation.fileUrl">File Url</Translate>
              </span>
            </dt>
            <dd>{conversationEntity.fileUrl}</dd>
            <dt>
              <span id="mediaType">
                <Translate contentKey="testreactApp.conversation.mediaType">Media Type</Translate>
              </span>
            </dt>
            <dd>{conversationEntity.mediaType}</dd>
            <dt>
              <Translate contentKey="testreactApp.conversation.teacher">Teacher</Translate>
            </dt>
            <dd>{conversationEntity.teacher ? conversationEntity.teacher.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.conversation.parent">Parent</Translate>
            </dt>
            <dd>{conversationEntity.parent ? conversationEntity.parent.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/conversation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/conversation/${conversationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ conversation }: IRootState) => ({
  conversationEntity: conversation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationDetail);
