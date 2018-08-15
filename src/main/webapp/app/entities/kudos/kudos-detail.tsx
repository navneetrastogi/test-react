import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './kudos.reducer';
import { IKudos } from 'app/shared/model/kudos.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKudosDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class KudosDetail extends React.Component<IKudosDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { kudosEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.kudos.detail.title">Kudos</Translate> [<b>{kudosEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="testreactApp.kudos.title">Title</Translate>
              </span>
            </dt>
            <dd>{kudosEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="testreactApp.kudos.description">Description</Translate>
              </span>
            </dt>
            <dd>{kudosEntity.description}</dd>
            <dt>
              <span id="imageUrl">
                <Translate contentKey="testreactApp.kudos.imageUrl">Image Url</Translate>
              </span>
            </dt>
            <dd>{kudosEntity.imageUrl}</dd>
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.kudos.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={kudosEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="lastModifiedOn">
                <Translate contentKey="testreactApp.kudos.lastModifiedOn">Last Modified On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={kudosEntity.lastModifiedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/kudos" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/kudos/${kudosEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ kudos }: IRootState) => ({
  kudosEntity: kudos.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KudosDetail);
