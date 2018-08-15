import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './kudos-record.reducer';
import { IKudosRecord } from 'app/shared/model/kudos-record.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKudosRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class KudosRecordDetail extends React.Component<IKudosRecordDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { kudosRecordEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="testreactApp.kudosRecord.detail.title">KudosRecord</Translate> [<b>{kudosRecordEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdOn">
                <Translate contentKey="testreactApp.kudosRecord.createdOn">Created On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={kudosRecordEntity.createdOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="notes">
                <Translate contentKey="testreactApp.kudosRecord.notes">Notes</Translate>
              </span>
            </dt>
            <dd>{kudosRecordEntity.notes}</dd>
            <dt>
              <Translate contentKey="testreactApp.kudosRecord.studentProfile">Student Profile</Translate>
            </dt>
            <dd>{kudosRecordEntity.studentProfile ? kudosRecordEntity.studentProfile.id : ''}</dd>
            <dt>
              <Translate contentKey="testreactApp.kudosRecord.kudos">Kudos</Translate>
            </dt>
            <dd>{kudosRecordEntity.kudos ? kudosRecordEntity.kudos.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/kudos-record" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/kudos-record/${kudosRecordEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ kudosRecord }: IRootState) => ({
  kudosRecordEntity: kudosRecord.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KudosRecordDetail);
