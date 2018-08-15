package com.navneet.repository;

import com.navneet.domain.Milestone;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Milestone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MilestoneRepository extends JpaRepository<Milestone, Long> {

}
