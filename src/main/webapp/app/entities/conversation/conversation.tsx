import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './conversation.reducer';
import { IConversation } from 'app/shared/model/conversation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConversationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Conversation extends React.Component<IConversationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { conversationList, match } = this.props;
    return (
      <div>
        <h2 id="conversation-heading">
          <Translate contentKey="testreactApp.conversation.home.title">Conversations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.conversation.home.createLabel">Create new Conversation</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.conversation.text">Text</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.conversation.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.conversation.sentOn">Sent On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.conversation.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.conversation.fileUrl">File Url</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.conversation.mediaType">Media Type</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.conversation.teacher">Teacher</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.conversation.parent">Parent</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {conversationList.map((conversation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${conversation.id}`} color="link" size="sm">
                      {conversation.id}
                    </Button>
                  </td>
                  <td>{conversation.text}</td>
                  <td>
                    <TextFormat type="date" value={conversation.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={conversation.sentOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{conversation.status}</td>
                  <td>{conversation.fileUrl}</td>
                  <td>
                    <Translate contentKey={`testreactApp.MediaType.${conversation.mediaType}`} />
                  </td>
                  <td>{conversation.teacher ? <Link to={`teacher/${conversation.teacher.id}`}>{conversation.teacher.id}</Link> : ''}</td>
                  <td>{conversation.parent ? <Link to={`parent/${conversation.parent.id}`}>{conversation.parent.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${conversation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${conversation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${conversation.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ conversation }: IRootState) => ({
  conversationList: conversation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation);
