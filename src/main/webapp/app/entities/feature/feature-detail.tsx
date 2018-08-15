import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './feature.reducer';
import { IFeature } from 'app/shared/model/feature.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFeatureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class FeatureDetail extends React.Component<IFeatureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { featureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.feature.detail.title">Feature</Translate> [<b>{featureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="testreactApp.feature.name">Name</Translate>
              </span>
            </dt>
            <dd>{featureEntity.name}</dd>
            <dt>
              <span id="featureType">
                <Translate contentKey="testreactApp.feature.featureType">Feature Type</Translate>
              </span>
            </dt>
            <dd>{featureEntity.featureType}</dd>
            <dt>
              <Translate contentKey="testreactApp.feature.parent">Parent</Translate>
            </dt>
            <dd>{featureEntity.parent ? featureEntity.parent.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/feature" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/feature/${featureEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ feature }: IRootState) => ({
  featureEntity: feature.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureDetail);
