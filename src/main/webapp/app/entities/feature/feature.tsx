import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './feature.reducer';
import { IFeature } from 'app/shared/model/feature.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFeatureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Feature extends React.Component<IFeatureProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { featureList, match } = this.props;
    return (
      <div>
        <h2 id="feature-heading">
          <Translate contentKey="testreactApp.feature.home.title">Features</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="testreactApp.feature.home.createLabel">Create new Feature</Translate>
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
                  <Translate contentKey="testreactApp.feature.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.feature.featureType">Feature Type</Translate>
                </th>
                <th>
                  <Translate contentKey="testreactApp.feature.parent">Parent</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {featureList.map((feature, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${feature.id}`} color="link" size="sm">
                      {feature.id}
                    </Button>
                  </td>
                  <td>{feature.name}</td>
                  <td>
                    <Translate contentKey={`testreactApp.FeatureType.${feature.featureType}`} />
                  </td>
                  <td>{feature.parent ? <Link to={`parent/${feature.parent.id}`}>{feature.parent.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${feature.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${feature.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${feature.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ feature }: IRootState) => ({
  featureList: feature.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feature);
