import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/organization">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.organization" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/center">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.center" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/room">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.room" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/schedule">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.schedule" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/event">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.event" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/activity">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.activity" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/activity-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.activityType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/photo">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.photo" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/video">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.video" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.student" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/student-profile">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.studentProfile" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/teacher">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.teacher" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/holiday">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.holiday" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/kudos">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.kudos" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/kudos-record">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.kudosRecord" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/milestone">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.milestone" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/milestone-record">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.milestoneRecord" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/incident">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.incident" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/gallery">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.gallery" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/payment">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.payment" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/immunization-record">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.immunizationRecord" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/illness-record">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.illnessRecord" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/attendance">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.attendance" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/parent">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.parent" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/permission">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.permission" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/feature">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.feature" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/notification">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.notification" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/task">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.task" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/task-type">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.taskType" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/conversation">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.conversation" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/timeline">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.timeline" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
