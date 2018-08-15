import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './milestone.reducer';
import { IMilestone } from 'app/shared/model/milestone.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMilestoneProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Milestone extends React.Component<IMilestoneProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { milestoneList, match } = this.props;
    return (
      <div>
        <h2 id="milestone-heading">
          <Translate contentKey="testreactApp.milestone.home.title">Milestones</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.milestone.home.createLabel">Create new Milestone</Translate>
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
                  <Translate contentKey="testreactApp.milestone.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.milestone.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.milestone.imageUrl">Image Url</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.milestone.createdOn">Created On</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.milestone.lastModifiedOn">Last Modified On</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {milestoneList.map((milestone, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${milestone.id}`} color="link" size="sm">
                      {milestone.id}
                    </Button>
                  </td>
                  <td>{milestone.title}</td>
                  <td>{milestone.description}</td>
                  <td>{milestone.imageUrl}</td>
                  <td>
                    <TextFormat type="date" value={milestone.createdOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={milestone.lastModifiedOn} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${milestone.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${milestone.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${milestone.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ milestone }: IRootState) => ({
  milestoneList: milestone.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Milestone);
